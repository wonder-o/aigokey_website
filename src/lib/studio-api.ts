export const API_BASE = "https://llm.aigokey.com/v1";
export const CONSOLE_ORIGIN = new URL(API_BASE).origin;
const API_PROXY = "/studio-api";
export type MediaKind = "image" | "video";
export type Protocol =
  | "image"
  | "gemini"
  | "grok-image"
  | "grok-video"
  | "seedance"
  | "muse-video";
export interface StudioModel {
  id: string;
  label: string;
  kind: MediaKind;
  protocol: Protocol;
}
export interface StudioModelCatalog {
  models: StudioModel[];
  unsupportedIds: string[];
  total: number;
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
  cameraMotion?: string;
  outputFormat?: string;
  frameCount?: number;
  frameDurationMs?: number;
  geminiOutput?: "image" | "url";
  reference?: File;
  audioReference?: File;
  sourceVideoUrl?: string;
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
  const modelName = id.split(/[/:]/).at(-1) || id;
  if (
    /^gpt-image-/i.test(modelName)
  )
    return {
      id,
      label: modelName.replace(/^gpt-image-/i, "GPT Image "),
      kind: "image",
      protocol: "image",
    };
  if (/^grok-imagine-image(?:$|[-_.:])/i.test(modelName))
    return {
      id,
      label: modelName
        .replace(/^grok-imagine-image/i, "Grok Image ")
        .replace(/^Grok Image[-_.]/, "Grok Image "),
      kind: "image",
      protocol: "grok-image",
    };
  if (/^gemini[-_.].*(?:image|banana)/i.test(modelName))
    return { id, label: modelName, kind: "image", protocol: "gemini" };
  if (/^grok-imagine-video(?:$|[-_.:])/i.test(modelName))
    return {
      id,
      label: modelName
        .replace(/^grok-imagine-video/i, "Grok Video")
        .replace(/^Grok Video[-_.]/, "Grok Video "),
      kind: "video",
      protocol: "grok-video",
    };
  if (/^(?:doubao[-_.])?seedance[-_.]/i.test(modelName))
    return {
      id,
      label: modelName.replace(/^(?:doubao[-_.])?seedance[-_.]/i, "Seedance "),
      kind: "video",
      protocol: "seedance",
    };
  if (/^seedance\d/i.test(modelName))
    return { id, label: modelName, kind: "video", protocol: "seedance" };
  if (/^muse-video(?:$|[-_.])/i.test(modelName))
    return {
      id,
      label: modelName.replace(/^muse-video/i, "Muse Video"),
      kind: "video",
      protocol: "muse-video",
    };
}

function errorMessage(body: Json, fallback: string) {
  return typeof body.error === "string"
    ? body.error
    : body.error?.message || body.message || fallback;
}

type AuthScheme = "bearer" | "google";

async function request(
  path: string,
  key: string,
  init: RequestInit = {},
  authScheme: AuthScheme = "bearer",
) {
  let response: Response;
  try {
    response = await fetch(`${API_PROXY}${path}`, {
      ...init,
      cache: "no-store",
      credentials: "omit",
      headers: {
        ...(authScheme === "google"
          ? { "x-goog-api-key": key }
          : { Authorization: `Bearer ${key}` }),
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
  authScheme: AuthScheme = "bearer",
): Promise<Json> {
  const response = await request(path, key, init, authScheme);
  if (!(response.headers.get("content-type") || "").includes("json"))
    throw new ApiError(
      "生成服务未启动。请使用 npm run dev 或 npm run studio 启动此页面。",
    );
  return response.json();
}

export async function loadModelCatalog(
  key: string,
  signal?: AbortSignal,
): Promise<StudioModelCatalog> {
  const body = await jsonRequest("/v1/models", key, { signal });
  if (!Array.isArray(body.data))
    throw new ApiError("模型列表格式不正确，请检查网关服务。");
  const models: StudioModel[] = [];
  const unsupportedIds: string[] = [];
  for (const item of body.data) {
    if (typeof item?.id !== "string") continue;
    const model = describeModel(item.id);
    if (model) models.push(model);
    else unsupportedIds.push(item.id);
  }
  return {
    models: [...new Map(models.map((item) => [item.id, item])).values()],
    unsupportedIds: [...new Set(unsupportedIds)],
    total: body.data.length,
  };
}

export async function loadModels(key: string, signal?: AbortSignal) {
  return (await loadModelCatalog(key, signal)).models;
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

export async function fileDataUrl(file: Blob): Promise<string> {
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    const chunkSize = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunkSize)
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    const base64 = btoa(binary);
    return `data:${file.type || "application/octet-stream"};base64,${base64}`;
  } catch {
    throw new Error("无法读取参考图，请重新选择。");
  }
}

export function safeMediaUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return;
  if (/^\/v1\/videos\/[a-z\d_-]+\/content$/i.test(value))
    return CONSOLE_ORIGIN + value;
  if (
    /^data:(image\/(png|jpeg|webp|gif|svg\+xml)|application\/pdf|video\/mp4);base64,[a-z\d+/=\s]+$/i.test(value)
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

function mimeForFormat(format: string) {
  switch (format.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "pdf":
      return "application/pdf";
    default:
      return "image/png";
  }
}

export function mediaUrls(
  body: Json,
  kind: MediaKind,
  outputFormat = "png",
): string[] {
  const root = body.result || body;
  const urls: string[] = [];
  const add = (value: unknown) => {
    const url = safeMediaUrl(value);
    if (url) urls.push(url);
  };
  if (Array.isArray(root.data))
    for (const item of root.data) {
      if (item.b64_json)
        add(`data:${mimeForFormat(item.output_format || outputFormat)};base64,${item.b64_json}`);
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
    for (const candidate of root.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        const inline = part.inline_data || part.inlineData;
        if (inline?.data) {
          const mime = inline.mime_type || inline.mimeType || "image/png";
          add(`data:${mime};base64,${inline.data}`);
        }
        const file = part.file_data || part.fileData;
        add(file?.file_uri || file?.fileUri);
        if (typeof part.text === "string") {
          for (const match of part.text.matchAll(/https:\/\/[^\s"'<>]+/g))
            add(match[0]);
        }
      }
    }
    for (const choice of root.choices || []) {
      for (const item of choice.message?.images || [])
        add(item.image_url?.url || item.url);
      const content = choice.message?.content;
      if (typeof content === "string") {
        for (const match of content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g))
          add(match[1]);
        if (content.startsWith("data:image/")) add(content);
      } else if (Array.isArray(content))
        for (const item of content)
          add(item.image_url?.url || item.image_url || item.url);
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

async function uploadMedia(
  file: File,
  kind: "image" | "audio",
  key: string,
  signal: AbortSignal,
) {
  const form = new FormData();
  form.append("kind", kind);
  form.append("file", file);
  const response = await request("/v1/media/uploads", key, {
    method: "POST",
    body: form,
    signal,
  });
  if (!(response.headers.get("content-type") || "").includes("json"))
    throw new ApiError("参考图上传接口未返回 JSON，请检查服务配置。");
  const body = await response.json();
  const rawUrl = body.url || body.data?.url || body.file?.url;
  const url = typeof rawUrl === "string" && rawUrl.startsWith("/")
    ? new URL(rawUrl, CONSOLE_ORIGIN).href
    : rawUrl;
  const safeUrl = safeMediaUrl(url);
  if (!safeUrl || !safeUrl.startsWith("https://"))
    throw new ApiError("参考图上传成功，但服务未返回有效的 HTTPS 图片地址。");
  return safeUrl;
}

function modelLeaf(id: string) {
  const index = id.lastIndexOf("/");
  return { prefix: index < 0 ? "" : id.slice(0, index + 1), name: id.slice(index + 1) };
}

function grokImageModel(id: string, editing: boolean) {
  const { prefix, name } = modelLeaf(id);
  return `${prefix}${editing ? "grok-imagine-image-edit" : "grok-imagine-image-2.0"}`;
}

function imageAspectRatio(options: GenerationOptions) {
  if (options.ratio) return options.ratio;
  if (options.size === "1536x1024") return "3:2";
  if (options.size === "1024x1536") return "2:3";
  return "1:1";
}

function museDuration(model: StudioModel, requested: number) {
  const leaf = modelLeaf(model.id).name;
  const longModel = leaf.match(/-(20|30|40|50|60)s$/i);
  if (longModel) return Number(longModel[1]);
  return Math.min(10, Math.max(1, requested));
}

export async function submitGeneration(
  options: GenerationOptions,
  key: string,
  signal: AbortSignal,
  onPreview: (url: string) => void,
): Promise<Json> {
  const { model, prompt, reference } = options;
  if (model.protocol === "gemini") {
    const parts: Json[] = [{ text: prompt }];
    if (reference) {
      const dataUrl = await fileDataUrl(reference);
      parts.push({
        inline_data: {
          mime_type: reference.type || "image/png",
          data: dataUrl.slice(dataUrl.indexOf(",") + 1),
        },
      });
    }
    const body = {
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseModalities: [options.geminiOutput === "url" ? "TEXT" : "IMAGE"],
        imageConfig: {
          aspectRatio: imageAspectRatio(options),
          imageSize:
            options.size === "2K" || options.quality === "high" ? "2K" : "1K",
        },
      },
    };
    return jsonRequest(
      `/v1beta/models/${encodeURIComponent(model.id)}:generateContent`,
      key,
      { method: "POST", signal, body: JSON.stringify(body) },
      "google",
    );
  }

  if (model.kind === "video") {
    let body: Json;
    if (model.protocol === "grok-video") {
      const leaf = modelLeaf(model.id).name;
      const supportsImage = /video[-_.]1[._]5(?:$|[-_.])/i.test(leaf);
      if (reference && !supportsImage)
        throw new ApiError("图生视频请在模型列表中选择 Grok 视频 1.5。", 400);
      body = {
        model: model.id,
        prompt,
        duration: options.duration,
        ratio: options.ratio,
        size: options.resolution,
        ...(reference
          ? { images: [await uploadMedia(reference, "image", key, signal)] }
          : {}),
      };
    } else if (model.protocol === "seedance") {
      if (
        model.id.toLowerCase().includes("canopus") &&
        Array.from(prompt).length > 3500
      )
        throw new ApiError("Seedance Canopus 提示词最多 3500 个字符，请缩短后再提交。", 400);
      body = {
        model: model.id,
        prompt,
        seconds: options.duration,
        resolution: "720p",
        ratio: options.ratio,
        ...(reference
          ? { image_urls: [await uploadMedia(reference, "image", key, signal)] }
          : {}),
        ...(model.id.toLowerCase().includes("coke") && options.audioReference
          ? {
              audio_urls: [
                await uploadMedia(options.audioReference, "audio", key, signal),
              ],
            }
          : {}),
      };
    } else if (model.protocol === "muse-video") {
      let sourceVideoUrl: string | undefined;
      if (options.sourceVideoUrl?.trim()) {
        try {
          const parsed = new URL(options.sourceVideoUrl.trim());
          if (parsed.protocol !== "https:" || parsed.username || parsed.password)
            throw new Error();
          sourceVideoUrl = parsed.href;
        } catch {
          throw new ApiError("Muse 续写源视频必须使用可公网访问的 HTTPS MP4 地址。", 400);
        }
      }
      body = {
        model: model.id,
        prompt,
        seconds: String(museDuration(model, options.duration)),
        aspect_ratio: options.ratio,
        ...(options.cameraMotion ? { camera_motion: options.cameraMotion } : {}),
        ...(reference ? { first_frame: await fileDataUrl(reference) } : {}),
        ...(sourceVideoUrl ? { video_url: sourceVideoUrl } : {}),
      };
    } else {
      throw new ApiError("暂不支持此视频模型协议。");
    }
    return jsonRequest("/v1/videos", key, {
      method: "POST",
      signal,
      body: JSON.stringify(body),
    });
  }

  const stream =
    options.stream &&
    model.protocol === "image" &&
    (options.outputFormat || "png") === "png" &&
    !reference;
  const fields: Json = {
    model: model.id,
    prompt,
    n: options.count,
    response_format: "url",
  };
  if (model.protocol === "image") {
    fields.size = options.size;
    fields.quality = options.quality;
    fields.background = "auto";
    fields.output_format = options.outputFormat || "png";
    if (fields.output_format === "gif") {
      if (options.frameCount) fields.frame_count = options.frameCount;
      if (options.frameDurationMs) fields.frame_duration_ms = options.frameDurationMs;
    }
    if (stream) {
      fields.stream = true;
      fields.partial_images = 2;
    }
  }

  if (model.protocol === "grok-image") {
    fields.model = grokImageModel(model.id, !!reference);
    if (reference) {
      const imageUrl = await uploadMedia(reference, "image", key, signal);
      fields.images = [{ url: imageUrl, image_url: imageUrl }];
    }
  } else if (reference) {
    const dataUrl = await fileDataUrl(reference);
    fields.images = [{ image_url: dataUrl }];
  }

  const response = await request(
    `/v1/images/${reference ? "edits" : "generations"}`,
    key,
    { method: "POST", body: JSON.stringify(fields), signal },
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
    protocol === "grok-video" ||
    protocol === "seedance" ||
    protocol === "muse-video"
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
    if (
      !blob.type.startsWith("image/") &&
      !blob.type.startsWith("video/") &&
      blob.type !== "application/pdf"
    )
      return;
    return blob;
  } catch {
    return;
  }
}
