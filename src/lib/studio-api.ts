export const API_BASE = "https://llm.aigokey.com/v1";
export const CONSOLE_ORIGIN = new URL(API_BASE).origin;
const API_PROXY = "/studio-api";
export type MediaKind = "image" | "video";
export type Protocol = "image" | "gemini" | "grok-video" | "seedance";
export interface StudioModel {
  id: string;
  label: string;
  kind: MediaKind;
  protocol: Protocol;
}
export interface GenerationOptions {
  model: StudioModel;
  prompt: string;
  size: string;
  quality: string;
  count: number;
  resolution: string;
  duration: number;
  ratio: string;
  stream: boolean;
  reference?: File;
}
type Json = Record<string, any>;

export class ApiError extends Error {
  constructor(
    message: string,
    public status = 0,
    public route?: string,
  ) {
    super(message);
  }
}

export function describeModel(id: string): StudioModel | undefined {
  if (/^gpt-image-|^grok-imagine-(image|edit)/i.test(id))
    return {
      id,
      label: id
        .replace(/^gpt-image-/i, "GPT Image ")
        .replace(/^grok-imagine-image/i, "Grok Image"),
      kind: "image",
      protocol: "image",
    };
  if (/^gemini-.*image/i.test(id))
    return { id, label: id, kind: "image", protocol: "gemini" };
  if (/^grok-imagine-video/i.test(id))
    return {
      id,
      label: id.replace("grok-imagine-video", "Grok Video"),
      kind: "video",
      protocol: "grok-video",
    };
  if (/^doubao-seedance-/i.test(id))
    return {
      id,
      label: id.replace("doubao-seedance-", "Seedance "),
      kind: "video",
      protocol: "seedance",
    };
}

function errorMessage(body: Json, fallback: string) {
  return typeof body.error === "string"
    ? body.error
    : body.error?.message || body.message || fallback;
}

async function request(path: string, key: string, init: RequestInit = {}) {
  let response: Response;
  try {
    response = await fetch(`${API_PROXY}${path}`, {
      ...init,
      cache: "no-store",
      credentials: "omit",
      headers: {
        Authorization: `Bearer ${key}`,
        ...(init.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...init.headers,
      },
    });
  } catch (error) {
    if (init.signal?.aborted) throw error;
    throw new ApiError(
      "网络连接中断。已提交的任务请从历史记录继续查询，不要重复生成。",
      0,
      `${init.method || "GET"} ${path}`,
    );
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const fallback =
      response.status === 401
        ? "API Key 无效或已过期，请重新连接。"
        : response.status === 403
          ? "此 Key 没有访问权限，请检查所属分组。"
          : response.status === 429
            ? "请求过于频繁或额度不足，请稍后再试。"
            : response.status === 404
              ? "接口未启用或任务已过期，请检查网关配置。"
              : `请求失败（HTTP ${response.status}）`;
    const route = `${init.method || "GET"} ${path}`;
    throw new ApiError(
      `${errorMessage(body, fallback)}\n请求接口：${route}`,
      response.status,
      route,
    );
  }
  return response;
}

async function jsonRequest(
  path: string,
  key: string,
  init?: RequestInit,
): Promise<Json> {
  const response = await request(path, key, init);
  if (!(response.headers.get("content-type") || "").includes("json"))
    throw new ApiError(
      "生成服务未启动。请使用 npm run dev 或 npm run studio 启动此页面。",
    );
  return response.json();
}

export async function loadModels(key: string, signal?: AbortSignal) {
  const body = await jsonRequest("/v1/models", key, { signal });
  if (!Array.isArray(body.data))
    throw new ApiError("模型列表格式不正确，请检查网关服务。");
  return [
    ...new Map(
      body.data
        .map((item: Json) =>
          typeof item.id === "string" ? describeModel(item.id) : undefined,
        )
        .filter((item: StudioModel | undefined): item is StudioModel => !!item)
        .map((item: StudioModel) => [item.id, item]),
    ).values(),
  ] as StudioModel[];
}

export async function keyFingerprint(key: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(key),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export function fileDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("无法读取参考图，请重新选择。"));
    reader.readAsDataURL(file);
  });
}

export function safeMediaUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return;
  if (/^\/v1\/videos\/[a-z\d_-]+\/content$/i.test(value))
    return CONSOLE_ORIGIN + value;
  if (
    /^data:(image\/(png|jpeg|webp)|video\/mp4);base64,[a-z\d+/=\s]+$/i.test(
      value,
    )
  )
    return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password)
      return url.href;
  } catch {
    /* not a public URL */
  }
}

export function mediaUrls(body: Json, kind: MediaKind): string[] {
  const root = body.result || body;
  const urls: string[] = [];
  const add = (value: unknown) => {
    const url = safeMediaUrl(value);
    if (url) urls.push(url);
  };
  if (Array.isArray(root.data))
    for (const item of root.data) {
      if (item.b64_json)
        add(
          `data:image/${item.output_format === "jpeg" ? "jpeg" : "png"};base64,${item.b64_json}`,
        );
      else
        add(
          item.url || item.image_url?.url || item.image_url || item.video_url,
        );
    }
  if (kind === "video") {
    add(root.video?.url);
    add(root.video_url);
    add(root.content?.video_url);
    add(root.url);
  } else {
    add(root.image_url);
    for (const choice of root.choices || []) {
      for (const item of choice.message?.images || [])
        add(item.image_url?.url || item.url);
      const content = choice.message?.content;
      if (typeof content === "string") {
        for (const match of content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g))
          add(match[1]);
        if (content.startsWith("data:image/")) add(content);
      } else if (Array.isArray(content))
        for (const item of content) add(item.image_url?.url);
    }
  }
  return [...new Set(urls)];
}

export function taskId(body: Json, protocol?: Protocol): string | undefined {
  const fields =
    protocol === "grok-video"
      ? [
          body.request_id,
          body.id,
          body.data?.request_id,
          body.data?.id,
          body.video?.request_id,
          body.video?.id,
          body.task_id,
          body.data?.task_id,
          body.video?.task_id,
        ]
      : [
          body.task_id,
          body.request_id,
          body.id,
          body.data?.task_id,
          body.data?.request_id,
          body.data?.id,
        ];
  const id = fields.find((field) => typeof field === "string" && field);
  return typeof id === "string" && id ? id : undefined;
}
export function taskState(body: Json) {
  if (
    ["failed", "error", "cancelled", "canceled", "expired"].includes(
      body.status,
    )
  )
    throw new ApiError(errorMessage(body, `任务未完成：${body.status}`));
  return ["completed", "succeeded", "done", "ready"].includes(body.status);
}

// SSE frames can be split across arbitrary network chunks, including inside UTF-8 text.
async function readImageStream(
  response: Response,
  onPreview: (url: string) => void,
): Promise<Json> {
  const reader = response.body?.getReader();
  if (!reader) throw new ApiError("未收到图片数据。");
  const decoder = new TextDecoder();
  let buffer = "",
    result: Json = {};
  const consume = (frame: string) => {
    const data = frame
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data || data === "[DONE]") return;
    const event = JSON.parse(data);
    if (event.error || event.type === "error")
      throw new ApiError(errorMessage(event, "图片生成失败。"));
    if (String(event.type || "").includes("partial_image") && event.b64_json)
      onPreview(`data:image/png;base64,${event.b64_json}`);
    else if (event.b64_json)
      result = {
        data: [
          { b64_json: event.b64_json, output_format: event.output_format },
        ],
      };
    else if (event.data || event.result) result = event;
  };
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done }).replace(/\r/g, "");
      let end: number;
      while ((end = buffer.indexOf("\n\n")) >= 0) {
        consume(buffer.slice(0, end));
        buffer = buffer.slice(end + 2);
      }
      if (done) {
        if (buffer.trim()) consume(buffer);
        break;
      }
    }
  } finally {
    reader.releaseLock();
  }
  if (!mediaUrls(result, "image").length)
    throw new ApiError(
      "连接结束，但未收到最终图片。请先在控制台确认本次请求状态。",
    );
  return result;
}

export async function submitGeneration(
  options: GenerationOptions,
  key: string,
  signal: AbortSignal,
  onPreview: (url: string) => void,
): Promise<Json> {
  const { model, prompt, reference } = options;
  if (model.protocol === "gemini") {
    const content: Json[] = [{ type: "text", text: prompt }];
    if (reference)
      content.push({
        type: "image_url",
        image_url: { url: await fileDataUrl(reference) },
      });
    return jsonRequest("/v1/chat/completions", key, {
      method: "POST",
      signal,
      body: JSON.stringify({
        model: model.id,
        stream: false,
        messages: [{ role: "user", content }],
        extra_body: {
          google: {
            image_config: {
              aspect_ratio:
                options.size === "1536x1024"
                  ? "3:2"
                  : options.size === "1024x1536"
                    ? "2:3"
                    : "1:1",
              image_size: options.quality === "high" ? "2K" : "1K",
            },
          },
        },
      }),
    });
  }
  if (model.kind === "video") {
    const image = reference ? await fileDataUrl(reference) : undefined;
    const body =
      model.protocol === "seedance"
        ? {
            model: model.id,
            content: [
              { type: "text", text: prompt },
              ...(image
                ? [
                    {
                      type: "image_url",
                      image_url: { url: image },
                      role: "first_frame",
                    },
                  ]
                : []),
            ],
            resolution: options.resolution,
            duration: options.duration,
            ratio: options.ratio,
          }
        : {
            model: model.id,
            prompt,
            resolution: options.resolution,
            duration: options.duration,
            aspect_ratio: options.ratio,
            ...(image ? { image: { url: image } } : {}),
          };
    return jsonRequest(
      model.protocol === "seedance"
        ? "/api/v3/contents/generations/tasks"
        : "/v1/videos/generations",
      key,
      { method: "POST", signal, body: JSON.stringify(body) },
    );
  }
  const stream = options.stream && model.id.startsWith("gpt-image-");
  const fields: Json = {
    model: model.id,
    prompt,
    n: options.count,
    size: options.size,
  };
  if (model.id.startsWith("gpt-image-")) fields.quality = options.quality;
  if (stream) {
    fields.stream = true;
    fields.partial_images = 2;
  }
  let body: BodyInit;
  if (reference) {
    const form = new FormData();
    for (const [key, value] of Object.entries(fields))
      form.append(key, String(value));
    form.append("image", reference);
    body = form;
  } else body = JSON.stringify(fields);
  const response = await request(
    `/v1/images/${reference ? "edits" : "generations"}${stream ? "" : "/async"}`,
    key,
    { method: "POST", body, signal },
  );
  if (response.headers.get("content-type")?.includes("text/event-stream"))
    return readImageStream(response, onPreview);
  if (!response.headers.get("content-type")?.includes("json"))
    throw new ApiError("生成接口未返回 JSON，请检查服务配置。");
  return response.json();
}

export function pollTask(
  id: string,
  protocol: Protocol,
  key: string,
  signal: AbortSignal,
) {
  const prefix =
    protocol === "seedance"
      ? "/api/v3/contents/generations/tasks/"
      : protocol === "grok-video"
        ? "/v1/videos/"
        : "/v1/images/tasks/";
  return jsonRequest(prefix + encodeURIComponent(id), key, { signal });
}

export async function videoContent(
  id: string,
  key: string,
): Promise<Blob | undefined> {
  try {
    const response = await request(
      `/v1/videos/${encodeURIComponent(id)}/content`,
      key,
      { signal: AbortSignal.timeout(30000) },
    );
    const blob = await response.blob();
    if (blob.type.startsWith("video/")) return blob;
    if (!blob.type || blob.type === "application/octet-stream")
      return new Blob([blob], { type: "video/mp4" });
    return;
  } catch {
    return;
  }
}

// Never forward credentials to a media URL returned by the provider.
export async function cacheMedia(
  url: string,
  signal?: AbortSignal,
): Promise<Blob | undefined> {
  try {
    const response = await fetch(url, {
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: signal || AbortSignal.timeout(30000),
    });
    if (!response.ok) return;
    const blob = await response.blob();
    if (!blob.type.startsWith("image/") && !blob.type.startsWith("video/"))
      return;
    return blob;
  } catch {
    return;
  }
}
