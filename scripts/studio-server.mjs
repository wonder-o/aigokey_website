import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
import { studioProxy } from "./studio-proxy.mjs";

const root = resolve("dist");
if (!existsSync(resolve(root, "studio/index.html")))
  throw new Error("请先运行 npm run build。");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/json",
};
const port = Number(process.env.STUDIO_PORT || 4173);
createServer((req, res) =>
  studioProxy(req, res, () => {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      return res.end();
    }
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400);
      return res.end();
    }
    if (pathname === "/") {
      res.writeHead(302, { Location: "/studio/" });
      return res.end();
    }
    let file = resolve(root, "." + pathname);
    if (!file.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    if (existsSync(file) && statSync(file).isDirectory())
      file = resolve(file, "index.html");
    if (!existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    });
    if (req.method === "HEAD") return res.end();
    createReadStream(file).pipe(res);
  }),
).listen(port, "127.0.0.1", () =>
  console.log(`AIGOKEY Studio: http://127.0.0.1:${port}/studio/`),
);
