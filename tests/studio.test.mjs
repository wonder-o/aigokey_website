import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

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
        { id: "grok-imagine-image-2.0" },
        { id: "grok-imagine-image-edit" },
        { id: "gemini-nano-banana-2.1" },
        { id: "gemini-3-pro-image-preview" },
        { id: "grok-imagine-video" },
        { id: "xai/grok-imagine-video-1.5" },
        { id: "doubao-seedance-2.0-mini" },
        { id: "seedance2.0 coke" },
        { id: "seedance-2.0-canopus" },
        { id: "volcengine/seedance-2.5" },
        { id: "muse-video-30s" },
      ],
    }),
  );
  const models = await api.loadModels(key);
  assert.deepEqual(
    models.map((item) => item.protocol),
    [
      "image",
      "grok-image",
      "grok-image",
      "gemini",
      "gemini",
      "grok-video",
      "grok-video",
      "seedance",
      "seedance",
      "seedance",
      "seedance",
      "muse-video",
    ],
  );
});
test("model catalog reports unrecognized IDs without returning credential data", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    json({
      data: [
        { id: "provider/special-video-v7" },
        { id: "xai/grok-imagine-video-1.5" },
      ],
      api_key: "must-not-be-returned",
    }),
  );
  const catalog = await api.loadModelCatalog(key);
  assert.equal(catalog.total, 2);
  assert.deepEqual(
    catalog.models.map((item) => item.id),
    ["xai/grok-imagine-video-1.5"],
  );
  assert.deepEqual(catalog.unsupportedIds, ["provider/special-video-v7"]);
  assert.equal(JSON.stringify(catalog).includes("must-not-be-returned"), false);
});
test("model-list permission errors identify the attempted endpoint", async (t) => {
  t.mock.method(globalThis, "fetch", async (url) => {
    assert.equal(url, "https://llm.aigokey.com/v1/models");
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
test("GPT Image submission uses the documented synchronous Images endpoint", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://llm.aigokey.com/v1/images/generations");
    assert.equal(init.headers.Authorization, `Bearer ${key}`);
    assert.equal(init.headers.Cookie, undefined);
    assert.equal(init.credentials, "omit");
    assert.deepEqual(JSON.parse(init.body), {
      model: "gpt-image-2",
      prompt: "测试画面",
      n: 1,
      response_format: "url",
      size: "1024x1024",
      quality: "auto",
      background: "auto",
      output_format: "png",
    });
    return json({ data: [{ url: "https://example.com/image.png" }] });
  });
  const result = await api.submitGeneration(
    baseOptions,
    key,
    new AbortController().signal,
    () => {},
  );
  assert.deepEqual(api.mediaUrls(result, "image"), ["https://example.com/image.png"]);
  assert.equal(mock.mock.callCount(), 1);
});
test("GPT Image GIF and vector formats preserve output MIME and GIF frame fields", async (t) => {
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    const body = JSON.parse(init.body);
    assert.equal(body.output_format, "gif");
    assert.equal(body.frame_count, 10);
    assert.equal(body.frame_duration_ms, 180);
    return json({ data: [{ b64_json: "R0lGODlh", output_format: "gif" }] });
  });
  const result = await api.submitGeneration(
    { ...baseOptions, outputFormat: "gif", frameCount: 10, frameDurationMs: 180 },
    key,
    new AbortController().signal,
    () => {},
  );
  assert.deepEqual(api.mediaUrls(result, "image", "gif"), ["data:image/gif;base64,R0lGODlh"]);
  assert.equal(api.safeMediaUrl("data:application/pdf;base64,JVBERi0="), "data:application/pdf;base64,JVBERi0=");
});
test("GPT Image edits use the documented JSON images input", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://llm.aigokey.com/v1/images/edits");
    assert.equal(init.headers["Content-Type"], "application/json");
    const body = JSON.parse(init.body);
    assert.equal(body.model, "gpt-image-2");
    assert.equal(body.images[0].image_url, "data:image/png;base64,dGVzdA==");
    assert.equal(body.response_format, "url");
    return json({ data: [{ url: "https://example.com/edited.png" }] });
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
test("Grok image edit switches endpoint model and supplies both reference URL fields", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push([url, init]);
    if (String(url).endsWith("/v1/media/uploads"))
      return json({ url: "/v1/media/uploads/expiry/reference.png" });
    return json({ data: [{ url: "https://example.com/edited.png" }] });
  });
  const model = api.describeModel("grok-imagine-image-2.0");
  const result = await api.submitGeneration(
    {
      ...baseOptions,
      model,
      reference: new File(["png"], "reference.png", { type: "image/png" }),
    },
    key,
    new AbortController().signal,
    () => {},
  );
  assert.equal(calls[0][0], "https://llm.aigokey.com/v1/media/uploads");
  assert.equal(calls[0][1].body.get("kind"), "image");
  assert.equal(calls[1][0], "https://llm.aigokey.com/v1/images/edits");
  const body = JSON.parse(calls[1][1].body);
  assert.equal(body.model, "grok-imagine-image-edit");
  assert.equal(body.images[0].url, "https://llm.aigokey.com/v1/media/uploads/expiry/reference.png");
  assert.equal(body.images[0].image_url, body.images[0].url);
  assert.deepEqual(api.mediaUrls(result, "image"), ["https://example.com/edited.png"]);
});
test("Gemini Banana uses generateContent and Bearer auth", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://llm.aigokey.com/v1beta/models/gemini-3-pro-image-preview:generateContent");
    assert.equal(init.headers.Authorization, `Bearer ${key}`);
    assert.equal(init.headers["x-goog-api-key"], undefined);
    const body = JSON.parse(init.body);
    assert.deepEqual(body.generationConfig.responseModalities, ["IMAGE"]);
    assert.equal(body.generationConfig.imageConfig.aspectRatio, "16:9");
    assert.equal(body.generationConfig.imageConfig.imageSize, "1K");
    return json({
      candidates: [{ content: { parts: [{ inline_data: { mime_type: "image/png", data: "YWJj" } }] } }],
    });
  });
  const model = api.describeModel("gemini-3-pro-image-preview");
  const result = await api.submitGeneration(
    { ...baseOptions, model },
    key,
    new AbortController().signal,
    () => {},
  );
  assert.deepEqual(api.mediaUrls(result, "image"), ["data:image/png;base64,YWJj"]);
});
test("Seedance uploads image and audio references before creating one task", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push([url, init]);
    if (String(url).endsWith("/v1/media/uploads"))
      return json({ url: `/v1/media/uploads/expiry/${init.body.get("kind")}` });
    return json({ id: "seedance-task", status: "queued" });
  });
  const model = api.describeModel("seedance2.0 coke");
  await api.submitGeneration(
    {
      ...baseOptions,
      model,
      reference: new File(["image"], "reference.png", { type: "image/png" }),
      audioReference: new File(["audio"], "reference.mp3", { type: "audio/mpeg" }),
    },
    key,
    new AbortController().signal,
    () => {},
  );
  assert.equal(calls.length, 3);
  assert.equal(calls[0][1].body.get("kind"), "image");
  assert.equal(calls[1][1].body.get("kind"), "audio");
  assert.equal(calls[2][0], "https://llm.aigokey.com/v1/videos");
  const body = JSON.parse(calls[2][1].body);
  assert.equal(body.model, "seedance2.0 coke");
  assert.equal(body.seconds, 6);
  assert.deepEqual(body.image_urls, ["https://llm.aigokey.com/v1/media/uploads/expiry/image"]);
  assert.deepEqual(body.audio_urls, ["https://llm.aigokey.com/v1/media/uploads/expiry/audio"]);
});
test("Muse sends its model-specific string duration, camera motion, and continuation URL", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "https://llm.aigokey.com/v1/videos");
    const body = JSON.parse(init.body);
    assert.equal(body.model, "muse-video-30s");
    assert.equal(body.seconds, "30");
    assert.equal(body.aspect_ratio, "16:9");
    assert.equal(body.camera_motion, "zoom_in");
    assert.equal(body.video_url, "https://example.com/source.mp4");
    return json({ id: "muse-task", status: "in_progress" });
  });
  const model = api.describeModel("muse-video-30s");
  await api.submitGeneration(
    { ...baseOptions, model, duration: 6, cameraMotion: "zoom_in", sourceVideoUrl: "https://example.com/source.mp4" },
    key,
    new AbortController().signal,
    () => {},
  );
});
test("video protocols use their own verified payload and query paths", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    const { Authorization, ...clientHeaders } = init.headers;
    assert.equal(Authorization, `Bearer ${key}`);
    assert.equal(clientHeaders["x-goog-api-key"], undefined);
    calls.push([url, init.body && JSON.parse(init.body)]);
    if (String(url).endsWith("/v1/videos"))
      return json({ id: "video-task", task_id: "video-task", status: "queued" });
    return json({ id: "video-task", status: "in_progress" });
  });
  for (const name of ["grok-imagine-video", "seedance2.0 coke", "muse-video-30s"]) {
    const model = api.describeModel(name);
    const result = await api.submitGeneration(
      { ...baseOptions, model },
      key,
      new AbortController().signal,
      () => {},
    );
    const id = api.taskId(result, model.protocol);
    assert.equal(id, "video-task");
    await api.pollTask(id, model.protocol, key, new AbortController().signal);
  }
  assert.deepEqual(calls.map(([url]) => url), [
    "https://llm.aigokey.com/v1/videos",
    "https://llm.aigokey.com/v1/videos/video-task",
    "https://llm.aigokey.com/v1/videos",
    "https://llm.aigokey.com/v1/videos/video-task",
    "https://llm.aigokey.com/v1/videos",
    "https://llm.aigokey.com/v1/videos/video-task",
  ]);
  assert.equal(calls[0][1].duration, 6);
  assert.equal(calls[0][1].size, "720p");
  assert.equal(calls[2][1].model, "seedance2.0 coke");
  assert.equal(calls[2][1].seconds, 6);
  assert.equal(calls[2][1].resolution, "720p");
  assert.equal(calls[4][1].model, "muse-video-30s");
  assert.equal(calls[4][1].seconds, "30");
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
    assert.equal(url, "https://llm.aigokey.com/v1/videos/task-123/content");
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
