import { Readable } from "node:stream";

export const STUDIO_UPSTREAM = "https://llm.aigokey.com/v1";
const allowed = {
  GET: [
    /^\/v1\/models$/,
    /^\/v1\/images\/tasks\/[^/]+$/,
    /^\/v1\/videos\/[^/]+(\/content)?$/,
    /^\/api\/v3\/contents\/generations\/tasks\/[^/]+$/,
  ],
  POST: [
    /^\/v1\/images\/(generations|edits)(\/async)?$/,
    /^\/v1\/chat\/completions$/,
    /^\/v1\/videos\/generations$/,
    /^\/api\/v3\/contents\/generations\/tasks$/,
  ],
};

// This is a fixed-origin relay, not a general-purpose URL proxy. Keys are never stored or logged.
export async function studioProxy(
  req,
  res,
  next = () => {
    res.statusCode = 404;
    res.end();
  },
) {
  if (!req.url?.startsWith("/studio-api/")) return next();
  const path = req.url.slice("/studio-api".length);
  const fail = (status, message) => {
    if (res.headersSent) return res.destroy();
    res.writeHead(status, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify({ error: { message } }));
  };
  if (
    !allowed[req.method]?.some((pattern) => pattern.test(path)) ||
    /%2f|%5c|\.\./i.test(path)
  )
    return fail(404, "Unsupported studio endpoint");
  if (req.headers.origin) {
    try {
      if (new URL(req.headers.origin).host !== req.headers.host)
        return fail(403, "Cross-origin relay requests are not allowed");
    } catch {
      return fail(403, "Invalid origin");
    }
  }
  if (!/^Bearer \S+$/.test(req.headers.authorization || ""))
    return fail(401, "请填写有效的 API Key。");
  if (Number(req.headers["content-length"]) > 30 * 1024 * 1024)
    return fail(413, "参考图过大，请使用 20 MB 以内的图片。");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10 * 60 * 1000);
  res.on("close", () => controller.abort());
  try {
    const headers = {
      Authorization: req.headers.authorization,
      Accept: "application/json, text/event-stream",
    };
    if (req.headers["content-type"])
      headers["Content-Type"] = req.headers["content-type"];
    // Gateway paths already include /v1; Seedance uses its own /api/v3 namespace.
    const target = path.startsWith("/v1/")
      ? STUDIO_UPSTREAM + path.slice("/v1".length)
      : new URL(path, STUDIO_UPSTREAM).href;
    const upstream = await fetch(target, {
      method: req.method,
      headers,
      redirect: "error",
      signal: controller.signal,
      ...(req.method === "POST" ? { body: req, duplex: "half" } : {}),
    });
    res.writeHead(upstream.status, {
      "Content-Type":
        upstream.headers.get("content-type") || "application/json",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    });
    if (!upstream.body) return res.end();
    await new Promise((resolve, reject) => {
      const stream = Readable.fromWeb(upstream.body);
      stream.on("error", reject);
      res.on("finish", resolve);
      res.on("close", resolve);
      stream.pipe(res);
    });
  } catch {
    if (!res.destroyed)
      fail(
        502,
        "无法连接 Aigokey 网关。若任务已提交，请查询原任务，避免重复扣费。",
      );
  } finally {
    clearTimeout(timer);
  }
}
