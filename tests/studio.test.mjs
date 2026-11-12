import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import ts from "typescript";
import { studioProxy, STUDIO_UPSTREAM } from "../scripts/studio-proxy.mjs";

const source = readFileSync(
  new URL("../src/lib/studio-api.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
  },
}).outputText;
const api = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const key = "sk-test-not-a-real-key";
const baseOptions = {
  model: api.describeModel("gpt-image-2"),
  prompt: "测试画面",
  size: "1024x1024",
  quality: "auto",
  count: 1,
  resolution: "720p",
  duration: 6,
  ratio: "16:9",
  stream: false,
};
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

test("model discovery filters unrelated models and deduplicates actual server IDs", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    json({
      data: [
        { id: "gpt-6" },
        { id: "gpt-image-2.6-sunburst" },
        { id: "gpt-image-2.6-sunburst" },
        { id: "grok-imagine-video" },
        { id: "doubao-seedance-2.0-mini" },
      ],
    }),
  );
  const models = await api.loadModels(key);
  assert.deepEqual(
    models.map((item) => item.protocol),
    ["image", "grok-video", "seedance"],
  );
});
test("model-list permission errors identify the attempted endpoint", async (t) => {
  t.mock.method(globalThis, "fetch", async (url) => {
    assert.equal(url, "/studio-api/v1/models");
    return json(
      { error: { message: "Image generation is not enabled for this group" } },
      403,
    );
  });
  await assert.rejects(api.loadModels(key), (error) => {
    assert.equal(error.route, "GET /v1/models");
    assert.match(error.message, /请求接口：GET \/v1\/models/);
    return true;
  });
});
test("URLs reject active content and embedded credentials", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html;base64,PHNjcmlwdD4=",
    "https://user:password@example.com/file",
    "file:///tmp/test",
    "//example.com/file",
  ])
    assert.equal(api.safeMediaUrl(url), undefined);
  assert.equal(
    api.safeMediaUrl("https://example.com/result.png"),
    "https://example.com/result.png",
  );
  assert.equal(
    api.safeMediaUrl("data:image/png;base64,YWJj"),
    "data:image/png;base64,YWJj",
  );
});
test("normalizes asynchronous image, Gemini and video results", () => {
  assert.deepEqual(
    api.mediaUrls({ result: { data: [{ b64_json: "YWJj" }] } }, "image"),
    ["data:image/png;base64,YWJj"],
  );
  assert.deepEqual(
    api.mediaUrls(
      {
        choices: [
          { message: { content: "![image](https://example.com/image.png)" } },
        ],
      },
      "image",
    ),
    ["https://example.com/image.png"],
  );
  for (const body of [
    { video: { url: "https://example.com/video.mp4" } },
    { content: { video_url: "https://example.com/video.mp4" } },
  ])
    assert.deepEqual(api.mediaUrls(body, "video"), [
      "https://example.com/video.mp4",
    ]);
  assert.throws(
    () => api.taskState({ status: "failed", error: { message: "审核未通过" } }),
    /审核未通过/,
  );
});
test("image submission sends one POST with parameters and returns a recoverable task", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "/studio-api/v1/images/generations/async");
    assert.equal(init.headers.Authorization, `Bearer ${key}`);
    assert.deepEqual(JSON.parse(init.body), {
      model: "gpt-image-2",
      prompt: "测试画面",
      n: 1,
      size: "1024x1024",
      quality: "auto",
    });
    return json({ task_id: "task-1", status: "processing" }, 202);
  });
  const result = await api.submitGeneration(
    baseOptions,
    key,
    new AbortController().signal,
    () => {},
  );
  assert.equal(api.taskId(result), "task-1");
  assert.equal(mock.mock.callCount(), 1);
});
test("editing uses multipart without overriding its boundary", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "/studio-api/v1/images/edits/async");
    assert.ok(init.body instanceof FormData);
    assert.equal(init.headers["Content-Type"], undefined);
    assert.equal(init.body.get("image").name, "reference.png");
    return json({ id: "edit-task" }, 202);
  });
  await api.submitGeneration(
    {
      ...baseOptions,
      reference: new File(["test"], "reference.png", { type: "image/png" }),
    },
    key,
    new AbortController().signal,
    () => {},
  );
});
test("video protocols use their own verified payload and query paths", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push([url, init.body && JSON.parse(init.body)]);
    if (String(url).endsWith("/v1/videos/generations"))
      return json({
        id: "video-object-id",
        task_id: "video-task-alias",
        request_id: "video-request-id",
        status: "queued",
      });
    return json({ id: "video-task", status: "queued" });
  });
  for (const name of ["grok-imagine-video", "doubao-seedance-2.0-mini"]) {
    const model = api.describeModel(name);
    const result = await api.submitGeneration(
      { ...baseOptions, model },
      key,
      new AbortController().signal,
      () => {},
    );
    const id = api.taskId(result, model.protocol);
    assert.equal(
      id,
      model.protocol === "grok-video" ? "video-request-id" : "video-task",
    );
    await api.pollTask(id, model.protocol, key, new AbortController().signal);
  }
  assert.equal(calls[0][0], "/studio-api/v1/videos/generations");
  assert.equal(calls[0][1].aspect_ratio, "16:9");
  assert.equal(calls[1][0], "/studio-api/v1/videos/video-request-id");
  assert.equal(calls[2][0], "/studio-api/api/v3/contents/generations/tasks");
  assert.equal(calls[2][1].content[0].text, "测试画面");
  assert.equal(
    calls[3][0],
    "/studio-api/api/v3/contents/generations/tasks/video-task",
  );
});
test("streaming preserves fragmented frames and only completes on final output", async (t) => {
  const frames =
    'data: {"type":"image_generation.partial_image","b64_json":"YWJj"}\r\n\r\ndata: {"type":"image_generation.completed","b64_json":"ZGVm"}\n\ndata: [DONE]\n\n';
  t.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            for (const byte of new TextEncoder().encode(frames))
              controller.enqueue(new Uint8Array([byte]));
            controller.close();
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      ),
  );
  const previews = [];
  const result = await api.submitGeneration(
    { ...baseOptions, stream: true },
    key,
    new AbortController().signal,
    (value) => previews.push(value),
  );
  assert.deepEqual(previews, ["data:image/png;base64,YWJj"]);
  assert.deepEqual(api.mediaUrls(result, "image"), [
    "data:image/png;base64,ZGVm",
  ]);
});
test("an ambiguous failed submission never retries POST", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("network disconnected");
  });
  await assert.rejects(
    api.submitGeneration(
      baseOptions,
      key,
      new AbortController().signal,
      () => {},
    ),
    /不要重复生成/,
  );
  assert.equal(mock.mock.callCount(), 1);
});
test("media downloads do not carry the API key", async (t) => {
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    assert.equal(init.headers, undefined);
    assert.equal(init.credentials, "omit");
    return new Response(new Blob(["test"], { type: "image/png" }));
  });
  assert.equal(
    (await api.cacheMedia("https://example.com/result.png")).type,
    "image/png",
  );
});
test("protected video content uses only the fixed gateway task path", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "/studio-api/v1/videos/task-123/content");
    assert.equal(init.headers.Authorization, `Bearer ${key}`);
    return new Response(new Blob(["video"], { type: "video/mp4" }));
  });
  assert.equal((await api.videoContent("task-123", key)).type, "video/mp4");
  assert.equal(
    api.safeMediaUrl("/v1/videos/task-123/content"),
    `${api.API_BASE}/videos/task-123/content`,
  );
  assert.equal(api.safeMediaUrl("/v1/videos/../../evil/content"), undefined);
});
test("video content normalizes gateway binary MIME for browser playback", async (t) => {
  t.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        new Blob(["mp4 bytes"], { type: "application/octet-stream" }),
      ),
  );
  const blob = await api.videoContent("task-binary", key);
  assert.equal(blob.type, "video/mp4");
});
test("relay enforces fixed host, path allowlist, same origin and bearer auth", async (t) => {
  const originalFetch = globalThis.fetch;
  let forwarded = 0;
  const server = createServer((req, res) => studioProxy(req, res));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    if (String(url).startsWith(origin)) return originalFetch(url, init);
    forwarded++;
    assert.equal(STUDIO_UPSTREAM, "https://llm.aigokey.com/v1");
    assert.equal(api.API_BASE, STUDIO_UPSTREAM);
    assert.equal(api.CONSOLE_ORIGIN, "https://llm.aigokey.com");
    assert.equal(url, `${STUDIO_UPSTREAM}/models`);
    assert.equal(init.headers.Authorization, `Bearer ${key}`);
    assert.equal(init.headers.Cookie, undefined);
    assert.equal(init.redirect, "error");
    return json({ data: [] });
  });
  const call = (path, options = {}) => fetch(origin + path, options);
  assert.equal((await call("/studio-api/v1/models")).status, 401);
  assert.equal(
    (
      await call("/studio-api/v1/models", {
        headers: {
          Authorization: `Bearer ${key}`,
          Origin: "https://attacker.example",
        },
      })
    ).status,
    403,
  );
  for (const path of [
    "/studio-api/admin",
    "/studio-api/https://attacker.example/",
    "/studio-api/v1/videos/foo%2fbar",
  ])
    assert.equal(
      (await call(path, { headers: { Authorization: `Bearer ${key}` } }))
        .status,
      404,
    );
  const response = await call("/studio-api/v1/models", {
    headers: {
      Authorization: `Bearer ${key}`,
      Origin: origin,
      Cookie: "private=never-forward",
    },
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(forwarded, 1);
});
