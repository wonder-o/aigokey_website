# AIGOKEY Studio

独立页面：`/studio/`。使用现有 Vue 3 / Vite 工程，不加载官网导航和页脚。

## 运行

需要 Node.js 22 或更新版本。

```sh
npm install
npm run dev
# 打开 http://localhost:5173/studio/
```

使用生产构建独立启动：

```sh
npm run build
npm run studio
# 打开 http://127.0.0.1:4173/studio/
```

`STUDIO_PORT` 可以修改独立服务端口。默认绑定本机 `127.0.0.1`；对外部署时在该服务前配置 HTTPS 反向代理。

## 网关与部署

Base URL 固定为 `https://llm.aigokey.com/v1`，用户只需在页面中填写 Key。浏览器访问同源 `/studio-api/*`；Node 服务将授权头与请求体转发到固定网关，确保 `/v1` 只拼接一次。Gemini 官方兼容调用使用 `/v1beta/models/{model}:generateContent` 和 `x-goog-api-key`；其他协议使用 Bearer Key。转发层只允许 Studio 所需的固定接口，不记录或保存 Key，也不转发浏览器 Cookie。生成请求不自动重试、不自动回退为另一个 POST。

本次检查发现网关对 `www.aigokey.com` 及 localhost 的跨域预检返回 403。因此 **单独上传静态 `dist` 到 GitHub Pages 不能完成生成**。生产环境需要运行上述 Node 服务，或将 `/studio-api/` 配置为等价的固定上游反向代理；静态页面和代理应处于同一 HTTPS 域名。现有官网其余页面仍可正常静态部署。

## 支持的接口

模型 ID 来自当前 Key 的 `GET /v1/models`，并按模型名前缀识别协议。Studio 支持以下图片模型族：

| 模型族                 | 文生图                                      | 图生图                                         |
| ---------------------- | ------------------------------------------- | ---------------------------------------------- |
| GPT Image 2/2.5/2.6    | `POST /v1/images/generations`               | `POST /v1/images/edits`，JSON Data URL 输入     |
| Grok Imagine Image     | `POST /v1/images/generations`               | `POST /v1/images/edits`，先上传参考图再传 URL   |
| Gemini / Nano Banana   | Gemini `generateContent`，图片 Base64 输出 | Gemini `generateContent`，inline image 输入    |

视频模型族均使用 PandaTK 文档对应的统一视频任务协议：

| 模型族                  | 创建             | 查询                      | 结果下载                            |
| ----------------------- | ---------------- | ------------------------- | ----------------------------------- |
| Grok Video / 1.5       | `POST /v1/videos` | `GET /v1/videos/{id}`     | `GET /v1/videos/{id}/content`       |
| Seedance 2.0 / 2.5     | `POST /v1/videos` | `GET /v1/videos/{id}`     | `GET /v1/videos/{id}/content`       |
| Muse Video 1–60s       | `POST /v1/videos` | `GET /v1/videos/{id}`     | `GET /v1/videos/{id}/content`       |

GPT Image 支持 URL / Base64 结果解析，以及按模型选项提交 PNG、JPEG、WebP、GIF、SVG 或 PDF；GIF 帧参数只在选择 GIF 时发送。Seedance 的本地参考图及 coke 型号音频先经 `/v1/media/uploads` 上传，再将 URL 放入 `image_urls` / `audio_urls`；Canopus 不发送音频参考。Muse 使用字符串 `seconds`、`aspect_ratio`、可选 `camera_motion`、首帧 URL/Data URL 和源视频 URL；Grok Video 1.5 的参考图作为 `images` URL 数组上传。支持参数和模型权限以当前 Key 所属分组为准。Studio 不自动重试生成请求；费用按实际计费。

API 参考来源为 AIGOKEY API 文档内的 GPT Image、香蕉模型、Grok 图片与视频、Seedance、Muse 协议说明。

## 密钥与历史

- 密钥窗口提供“图片 Key”和“视频 Key”两个独立标签页，输入草稿、连接状态、错误提示和记住选项各自保留。连接成功后自动切换到对应创作模式，错误提示同时显示实际请求接口。断开只影响当前密钥标签。默认只存在页面内存；用户勾选“记住”才写入各自的 localStorage 项，断开时只移除对应项。
- 任务记录、提示词、参数、密钥 SHA-256 指纹及可下载的媒体 Blob 存入 IndexedDB。历史记录不含 Key。
- 重新连接同一 Key 会恢复未完成任务的 GET 查询。网络故障、暂停查询和关闭页面不会取消服务端任务，也不会重新提交生成。
- 流式 GPT Image 和 Gemini 官方同步生成无法在关闭页面后恢复连接；丢失回执会标记“状态待确认”，提示用户先到控制台确认。
- 外部媒体下载不携带 Key。完成的视频通过固定网关的 `/v1/videos/{id}/content` 鉴权下载，缓存为本地 Blob。图片、GIF 与矢量文件按响应 MIME 缓存；PDF 使用内嵌文档预览。外部素材限制跨域下载时保留远程链接并提醒及时下载。
- “清空”需确认，并在提交/查询期间禁用。清空只影响当前浏览器。

## 验证

```sh
npm run test:studio
npm run build
```

自动检查协议请求、SSE 分片、模型过滤、错误处理、不重复提交和转发边界；浏览器检查覆盖连接、无可用模型、参考图、生成与下载、视频任务恢复和手机布局。模拟接口不产生实际生成费用；未使用真实用户 Key 进行计费生成。
