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

Base URL 固定为 `https://llm.aigokey.com/v1`，用户只需在页面中填写 Key。浏览器访问同源 `/studio-api/*`；Node 服务将授权头与请求体转发到固定网关，确保 `/v1` 只拼接一次。Seedance 使用同域的 `/api/v3` 路径，控制台链接使用域名根路径。转发层仅允许生成和查询接口，不记录或保存 Key，也不转发浏览器 Cookie。生成请求不自动重试、不自动回退为另一个 POST。

本次检查发现网关对 `www.aigokey.com` 及 localhost 的跨域预检返回 403。因此 **单独上传静态 `dist` 到 GitHub Pages 不能完成生成**。生产环境需要运行上述 Node 服务，或将 `/studio-api/` 配置为等价的固定上游反向代理；静态页面和代理应处于同一 HTTPS 域名。现有官网其余页面仍可正常静态部署。

## 支持的接口

模型 ID 来自当前 Key 的 `GET /v1/models`，只显示已有适配器支持的模型：

| 模型族                | 生成                                                                | 查询                    |
| --------------------- | ------------------------------------------------------------------- | ----------------------- |
| GPT Image、Grok Image | `/v1/images/generations/async`；参考图使用 `/v1/images/edits/async` | `/v1/images/tasks/{id}` |
| GPT Image 流式预览    | `/v1/images/generations` 或 `/v1/images/edits`，SSE，单张           | 同一连接                |
| Gemini Image          | `/v1/chat/completions`，单张                                        | 同一连接                |
| Grok Video            | `/v1/videos/generations`                                            | `/v1/videos/{id}`       |
| Seedance              | `/api/v3/contents/generations/tasks`                                | 同一路径追加任务 ID     |

异步图片需要网关启用对象存储；未启用会显示接口错误，不自动发送同步请求。支持的尺寸、时长与分辨率最终由所选模型及上游决定。费用未接入可信的分组报价接口，因此明确显示以实际计费为准，不使用截图中的示意单价。

接口参考：[Sub2API 异步图片说明](https://github.com/Wei-Shaw/sub2api/blob/main/docs/ASYNC_IMAGE_TASKS.md)、[网关路由](https://github.com/Wei-Shaw/sub2api/blob/main/backend/internal/server/routes/gateway.go)，以及本机 agk2img / agk2video API 约定。

## 密钥与历史

- 密钥窗口提供“图片 Key”和“视频 Key”两个独立标签页，输入草稿、连接状态、错误提示和记住选项各自保留。连接成功后自动切换到对应创作模式，错误提示同时显示实际请求接口。断开只影响当前密钥标签。默认只存在页面内存；用户勾选“记住”才写入各自的 localStorage 项，断开时只移除对应项。
- 任务记录、提示词、参数、密钥 SHA-256 指纹及可下载的媒体 Blob 存入 IndexedDB。历史记录不含 Key。
- 重新连接同一 Key 会恢复未完成任务的 GET 查询。网络故障、暂停查询和关闭页面不会取消服务端任务，也不会重新提交生成。
- 流式图片和 Gemini 同步生成无法在关闭页面后恢复连接；丢失回执会标记“状态待确认”，提示用户先到控制台确认。
- 外部媒体下载不携带 Key。Grok 的受保护视频通过固定网关的 `/v1/videos/{id}/content` 鉴权下载，缓存为本地 Blob。外部素材限制跨域下载时保留远程链接并明确提醒及时保存，不能保证远程 URL 永久可用。
- “清空”需确认，并在提交/查询期间禁用。清空只影响当前浏览器。

## 验证

```sh
npm run test:studio
npm run build
```

自动检查协议请求、SSE 分片、模型过滤、错误处理、不重复提交和转发边界；浏览器检查覆盖连接、无可用模型、参考图、生成与下载、视频任务恢复和手机布局。模拟接口不产生实际生成费用；未使用真实用户 Key 进行计费生成。
