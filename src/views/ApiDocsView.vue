<template>
  <div class="reference-app">
    <header class="topbar">
      <router-link to="/" class="brand" aria-label="AIGOKEY 首页">
        <img src="/assets/aigokey-logo.png" alt="AIGOKEY" />
        <span>API 文档</span>
      </router-link>
      <div class="topbar-search"><Search :size="16" /><span>{{ activeModel.category }} API 接口</span><kbd>⌘ K</kbd></div>
      <a class="topbar-link" href="https://llm.aigokey.com" target="_blank" rel="noopener noreferrer">AIGOKEY 控制台 <ArrowUpRight :size="15" /></a>
    </header>

    <div class="documentation-layout">
      <aside class="model-sidebar" aria-label="API 模型目录">
        <div v-for="group in modelGroups" :key="group.label" class="sidebar-group">
          <p class="sidebar-heading">{{ group.label }}</p>
          <nav>
            <button v-for="model in group.models" :key="model.key" type="button" :class="{ selected: selected === model.key }" :aria-current="selected === model.key ? 'page' : undefined" @click="selectModel(model.key)">
              <span>{{ model.label }}</span><ChevronRight v-if="selected === model.key" :size="15" />
            </button>
          </nav>
        </div>
        <div class="sidebar-meta"><span class="status-dot"></span><span>AIGOKEY API</span><small>图片 · 视频协议</small></div>
      </aside>

      <main class="reference-main" id="main-content">
        <div class="breadcrumb"><BookOpen :size="14" /><span>{{ activeModel.category }}</span><ChevronRight :size="13" /><strong>{{ activeModel.label }}</strong></div>
        <p class="eyebrow">API REFERENCE</p>
        <h1>{{ activeModel.title }}</h1>
        <p class="intro">{{ activeModel.intro }}</p>

        <div class="endpoint-banner"><span class="method">POST</span><code>{{ activeModel.endpoint }}</code><button type="button" title="复制接口地址" aria-label="复制接口地址" @click="copy(activeModel.endpoint, 'endpoint')"><Check v-if="copied === 'endpoint'" :size="16" /><Copy v-else :size="16" /></button></div>
        <div class="notice"><Info :size="16" /><p><strong>本站接入：</strong>使用 AIGOKEY 控制台创建的 API Key，通过 <code>{{ activeModel.authHeader }}</code> 鉴权。示例中的接口域名已切换为 <code>llm.aigokey.com</code>。</p></div>

        <section v-for="section in activeModel.sections" :id="section.id" :key="section.id" class="reference-section">
          <h2>{{ section.title }}</h2>
          <p v-if="section.description" class="section-description">{{ section.description }}</p>
          <div v-if="section.models" class="variant-list">
            <article v-for="variant in section.models" :key="variant.name" class="variant-row">
              <code>{{ variant.name }}</code><span>{{ variant.description }}</span><strong>{{ variant.duration }}</strong>
            </article>
          </div>
          <div v-if="section.parameters" class="parameter-table">
            <div class="parameter-row parameter-head"><span>字段</span><span>必填 / 类型</span><span>说明</span></div>
            <div v-for="param in section.parameters" :key="param.name" class="parameter-row">
              <code>{{ param.name }}</code><span>{{ param.type }}</span><span>{{ param.description }}</span>
            </div>
          </div>
          <div v-for="example in section.examples" :key="example.title" class="example-block">
            <div class="example-title"><h3>{{ example.title }}</h3><button type="button" :aria-label="`复制${example.title}`" title="复制示例" @click="copy(example.code, example.title)"><Check v-if="copied === example.title" :size="15" /><Copy v-else :size="15" /></button></div>
            <pre><code>{{ example.code }}</code></pre>
            <p v-if="example.note" class="example-note">{{ example.note }}</p>
          </div>
          <p v-if="section.note" class="section-note"><Info :size="15" /><span>{{ section.note }}</span></p>
        </section>
        <footer class="doc-footer">API 地址已切换至 <code>https://llm.aigokey.com</code> <span>·</span> 模型权限与实际返回以 AIGOKEY 控制台和接口为准。</footer>
      </main>

      <aside class="page-toc" aria-label="本页内容">
        <p>本页内容</p>
        <a v-for="section in activeModel.sections" :key="section.id" :href="`#${section.id}`">{{ section.title }}</a>
        <div class="toc-meta"><span>视频 API</span><small>协议参考</small></div>
      </aside>
    </div>
    <p class="copy-toast" role="status" aria-live="polite">{{ copyStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowUpRight, BookOpen, Check, ChevronRight, Copy, Info, Search } from '@lucide/vue'

type Example = { title: string; code: string; note?: string }
type Parameter = { name: string; type: string; description: string }
type Section = { id: string; title: string; description?: string; parameters?: Parameter[]; models?: Array<{ name: string; description: string; duration: string }>; examples?: Example[]; note?: string }

const sharedQuery = `TASK_ID='替换为创建返回的任务ID'
curl --fail-with-body -sS --connect-timeout 15 --max-time 90 \\
  "https://llm.aigokey.com/v1/videos/${'${TASK_ID}'}" \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}"`
const sharedDownload = `curl --fail-with-body -L -sS --connect-timeout 15 --max-time 600 \\
  "https://llm.aigokey.com/v1/videos/${'${TASK_ID}'}/content" \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -o video.mp4`

type ApiModel = { key: string; category: string; label: string; title: string; intro: string; endpoint: string; authHeader: string; sections: Section[] }

const models: ApiModel[] = [
  {
    key: 'gpt-image', category: '图片模型', label: 'GPT Image 2/2.5/2.6', title: 'GPT Image 2/2.5/2.6',
    intro: '使用 Images 请求格式进行文生图与图生图。所选分组支持时，也可请求 GIF 动图及 SVG / PDF 矢量文件。',
    endpoint: 'https://llm.aigokey.com/v1/images/generations', authHeader: 'Authorization: Bearer ...',
    sections: [
      { id: 'gpt-models', title: '适用模型', models: [
        { name: 'gpt-image-2', description: '文生图 / 图生图。', duration: '标准' },
        { name: 'gpt-image-2.5', description: '文生图 / 图生图。', duration: '标准' },
        { name: 'gpt-image-2.5-flare', description: '文生图 / 图生图。', duration: '型号' },
        { name: 'gpt-image-2.6', description: '文生图 / 图生图；支持格式视分组而定。', duration: '扩展' },
      ], note: '调用时填写控制台开放的完整模型名。GIF 与 SVG/PDF 需要所选分组接入对应格式支持。' },
      { id: 'gpt-text-params', title: '文生图参数', description: 'POST /v1/images/generations · JSON，同步返回图片结果。', parameters: [
        { name: 'model', type: '是 · string', description: '完整模型名，例如 gpt-image-2、gpt-image-2.5 或 gpt-image-2.6。' },
        { name: 'prompt', type: '是 · string', description: '图片描述。' },
        { name: 'n', type: '否 · integer', description: '输出数量；示例使用 1，可用范围以模型为准。' },
        { name: 'size', type: '否 · string', description: '生成尺寸，例如 1024x1024。' },
        { name: 'quality / background', type: '否 · string', description: '质量与背景选项；示例均为 auto。' },
        { name: 'response_format', type: '否 · string', description: 'url 返回下载链接；b64_json 返回原文件 Base64。' },
        { name: 'output_format', type: '否 · string', description: '文件格式，例如 png；支持格式以分组能力为准。' },
      ], examples: [
        { title: '文生图 · PNG URL', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/generations' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "gpt-image-2",
  "prompt": "一只坐在窗边的橘猫，电影光影，高清细节",
  "n": 1,
  "size": "1024x1024",
  "quality": "auto",
  "background": "auto",
  "response_format": "url",
  "output_format": "png"
}'` },
        { title: '生成 GIF 动图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/generations' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "gpt-image-2.6",
  "prompt": "一只小猫挥手，主体稳定，动作连贯，循环播放",
  "output_format": "gif",
  "frame_count": 10,
  "frame_duration_ms": 180,
  "response_format": "url",
  "size": "1024x1024",
  "quality": "high",
  "n": 1
}'`, note: 'GIF 参数需分组支持。frame_count 为 2–16 的整数；frame_duration_ms 为至少 20 的整数，单位毫秒。' },
        { title: '生成 SVG 矢量文件', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/generations' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "gpt-image-2.6",
  "prompt": "设计一个绿色茶叶品牌标志，简洁几何图形，无文字，保留可编辑矢量路径",
  "output_format": "svg",
  "response_format": "url",
  "size": "1024x1024",
  "quality": "high",
  "background": "transparent",
  "n": 1
}'` },
      ], note: 'PDF 与 SVG 使用相同生成接口，将 output_format 设为 pdf 或 svg。response_format 控制 URL / Base64 交付方式，两者彼此独立。' },
      { id: 'gpt-edit', title: '图生图 · Images edits', description: 'POST /v1/images/edits · 提供至少一张参考图，并用 prompt 描述编辑要求。支持 multipart 本地文件和 JSON URL / Data URL 输入。', parameters: [
        { name: 'model', type: '是 · string', description: '控制台开放的完整模型名。' },
        { name: 'prompt', type: '是 · string', description: '生成或编辑要求。' },
        { name: 'image / image[]', type: 'multipart · file', description: '至少一个本地参考图文件；重复字段可上传多张。' },
        { name: 'images', type: 'JSON · object[]', description: '每项包含 image_url，值为 HTTP(S) URL 或完整 Data URL。' },
        { name: 'n / size', type: '否 · integer / string', description: '输出数量及尺寸；示例为 1 与 1024x1024。' },
        { name: 'response_format', type: '否 · string', description: 'url 返回文件链接；b64_json 返回原文件 Base64。' },
      ], examples: [
        { title: '本地参考图 · multipart', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/edits' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -F 'model=gpt-image-2' \\
  -F 'prompt=保留参考图主体与构图，将背景改成温暖咖啡馆' \\
  -F 'image=@./reference.png' \\
  -F 'n=1' \\
  -F 'size=1024x1024' \\
  -F 'response_format=url'`, note: '多张文件可重复传 image[]。使用 -F 时不要手动设置 Content-Type，交由 cURL 生成 boundary。' },
        { title: '图片 URL · JSON', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/edits' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "gpt-image-2",
  "prompt": "保留参考图主体，将画面改成水彩插画风格",
  "images": [{"image_url": "https://example.com/reference.png"}],
  "n": 1,
  "size": "1024x1024",
  "response_format": "url"
}'` },
      ], note: 'JSON 的 images[].image_url 可使用公网 URL 或完整 Data URL；multipart 使用 image / image[] 文件字段。两种输入格式不要混用。' },
      { id: 'gpt-response', title: '返回结果', examples: [{ title: 'URL 响应结构', code: `{
  "created": 1793100000,
  "data": [{"url": "https://example.com/generated/image-1.png"}]
}` }, { title: 'Base64 响应结构', code: `{
  "created": 1793100000,
  "data": [{"b64_json": "完整的Base64图片内容"}]
}` }], note: 'URL 模式读取 data[].url；Base64 模式读取 data[].b64_json 并解码为原文件字节。GIF / SVG / PDF 原文件不会转换成其他格式。' },
    ],
  },
  {
    key: 'banana', category: '图片模型', label: '香蕉模型 · 统一协议', title: '香蕉模型 · 统一协议',
    intro: '六个 Gemini 图片模型共用同一调用协议，可选择 Gemini 官方、OpenAI Images 或 OpenAI Chat 兼容格式。',
    endpoint: 'https://llm.aigokey.com/v1beta/models/{model}:generateContent', authHeader: 'x-goog-api-key: ...',
    sections: [
      { id: 'banana-models', title: '适用模型 · 六个名称共用协议', models: [
        { name: 'gemini-nano-banana-2.1', description: '文生图 / 图生图。', duration: '模型' },
        { name: 'gemini-3-pro-image', description: '文生图 / 图生图。', duration: '模型' },
        { name: 'gemini-3-pro-image-preview', description: '文生图 / 图生图。', duration: '示例' },
        { name: 'gemini-3.1-flash-image', description: '文生图 / 图生图。', duration: '模型' },
        { name: 'gemini-3.1-flash-image-preview', description: '文生图 / 图生图。', duration: '模型' },
        { name: 'gemini-2.5-flash-image', description: '文生图 / 图生图。', duration: '模型' },
      ], note: 'Gemini 路径协议在 URL 中替换模型名；Images 与 Chat 协议在请求体中替换 model。模型可用性与 1K / 2K 等规格以账号分组为准。' },
      { id: 'banana-gemini', title: '协议一 · Gemini 官方协议', description: 'POST /v1beta/models/{model}:generateContent · 使用 x-goog-api-key 鉴权。响应可返回图片 Base64；AIGOKEY 同时支持文档中的 URL 输出扩展。', parameters: [
        { name: 'contents[].parts[].text', type: '是 · string', description: '图片生成或编辑要求。' },
        { name: 'generationConfig.imageConfig.aspectRatio', type: '否 · string', description: '画幅比例，例如 1:1 或 16:9。' },
        { name: 'generationConfig.imageConfig.imageSize', type: '否 · string', description: '图片规格，例如 1K 或 2K。' },
        { name: 'contents[].parts[].inline_data', type: '参考图 · object', description: 'mime_type 为 MIME；data 为纯 Base64，不带 Data URL 前缀。' },
        { name: 'contents[].parts[].fileData', type: '参考图 · object', description: 'mimeType 为 MIME；fileUri 为服务端可访问的图片 URL。' },
        { name: 'generationConfig.responseModalities', type: '否 · string[]', description: 'IMAGE 返回图片内容；AIGOKEY URL 扩展使用 TEXT。' },
      ], examples: [
        { title: 'Gemini · 文生图 Base64', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1beta/models/gemini-3-pro-image-preview:generateContent' \\
  -H "x-goog-api-key: ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "contents": [{"role": "user", "parts": [{"text": "一只可爱的橘猫，柔和光线"}]}],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {"aspectRatio": "1:1", "imageSize": "1K"}
  }
}'` },
        { title: 'Gemini · URL 参考图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1beta/models/gemini-3-pro-image-preview:generateContent' \\
  -H "x-goog-api-key: ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "contents": [{"role": "user", "parts": [
    {"text": "结合参考图重绘为插画风格"},
    {"fileData": {"mimeType": "image/png", "fileUri": "https://example.com/reference.png"}}
  ]}],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {"aspectRatio": "16:9", "imageSize": "2K"}
  }
}'` },
        { title: 'AIGOKEY 扩展 · 返回图片 URL', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1beta/models/gemini-3-pro-image-preview:generateContent' \\
  -H "x-goog-api-key: ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "contents": [{"parts": [{"text": "画一只戴帽子的猫"}]}],
  "generationConfig": {"responseModalities": ["TEXT"]}
}'`, note: 'TEXT 返回 URL 是 AIGOKEY 兼容接口扩展，不是 Google 原生 API 的通用规则。遍历 candidates[].content.parts[]，读取 text 链接或 file_data.file_uri。' },
      ], note: 'Gemini 图片 Base64 位于 candidates[].content.parts[] 中的 inline_data.data；MIME 类型以响应为准。' },
      { id: 'banana-images', title: '协议二 · OpenAI Images 兼容协议', description: '文生图 POST /v1/images/generations；图生图 POST /v1/images/edits。使用 Authorization: Bearer 鉴权。', parameters: [
        { name: 'model', type: '是 · string', description: '使用上方六个完整模型名之一。' },
        { name: 'prompt', type: '是 · string', description: '生成描述或编辑要求。' },
        { name: 'size', type: '否 · string', description: '生成尺寸，例如 1024x1024；图片编辑示例也支持 2K。' },
        { name: 'response_format', type: '否 · string', description: 'AIGOKEY Images 示例使用 url。' },
        { name: 'image', type: '图生图 · file', description: 'multipart 文件字段；重复 image 字段可传多张参考图。' },
      ], examples: [
        { title: 'Images · 文生图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/generations' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "gemini-3-pro-image-preview",
  "prompt": "一只戴着巫师帽的橘猫，插画风格",
  "size": "1024x1024",
  "response_format": "url"
}'` },
        { title: 'Images · 本地图生图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/edits' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -F 'model=gemini-3-pro-image-preview' \\
  -F 'prompt=结合参考图生成夜景风格图片' \\
  -F 'image=@./reference.png' \\
  -F 'size=2K' \\
  -F 'response_format=url'`, note: '使用 -F 时由 cURL 自动生成 multipart 请求头，不要手动设置 JSON Content-Type。' },
      ], note: '成功响应使用标准 Images data 数组，例如 data[].url。' },
      { id: 'banana-chat', title: '协议三 · OpenAI Chat 兼容协议', description: 'POST /v1/chat/completions · 用户消息 content 使用内容块数组；图片参考以 Data URL 传入。', parameters: [
        { name: 'model', type: '是 · string', description: '使用上方六个完整模型名之一。' },
        { name: 'messages', type: '是 · array', description: '用户消息 content 使用 text 与 image_url 内容块。' },
        { name: 'aspect_ratio / image_size', type: '否 · string', description: '图片比例和规格，例如 3:4、2K。' },
        { name: 'stream', type: '否 · boolean', description: '示例使用 false。' },
      ], examples: [
        { title: 'Chat · 文生图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/chat/completions' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "gemini-3-pro-image-preview",
  "aspect_ratio": "3:4",
  "image_size": "2K",
  "messages": [{"role": "user", "content": [
    {"type": "text", "text": "一只可爱的甜甜圈猫咪，柔和光线"}
  ]}],
  "stream": false
}'` },
        { title: 'Chat · Base64 图生图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/chat/completions' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "gemini-3-pro-image-preview",
  "messages": [{"role": "user", "content": [
    {"type": "text", "text": "把参考图改成插画风格"},
    {"type": "image_url", "image_url": {"url": "data:image/png;base64,替换为图片Base64"}}
  ]}],
  "stream": false
}'` },
      ], note: 'Chat 响应先检查 choices[].message；具体图片输出字段按实际响应解析。需要固定 data[].url 时可使用 OpenAI Images 协议。' },
    ],
  },
  {
    key: 'grok-image', category: '图片模型', label: 'Grok 文生图', title: 'Grok 文生图',
    intro: '使用 JSON 请求同步生成图片。文生图和图生图使用不同端点与模型名。',
    endpoint: 'https://llm.aigokey.com/v1/images/generations', authHeader: 'Authorization: Bearer ...',
    sections: [
      { id: 'grok-image-params', title: '请求参数', description: 'POST /v1/images/generations', parameters: [
        { name: 'model', type: '是 · string', description: '固定填写 grok-imagine-image-2.0。' },
        { name: 'prompt', type: '是 · string', description: '图片生成描述。' },
        { name: 'n', type: '否 · integer', description: '输出图片数量；示例为 1。' },
        { name: 'response_format', type: '否 · string', description: '示例使用 url。' },
      ], examples: [{ title: 'Grok · 文生图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/generations' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "grok-imagine-image-2.0",
  "prompt": "生成一张黑色连衣裙的电商商品图",
  "n": 1,
  "response_format": "url"
}'` }] },
      { id: 'grok-image-response', title: '返回结果', examples: [{ title: '成功响应结构', code: `{
  "created": 1793100000,
  "data": [{"url": "https://example.com/generated/image-1.png"}]
}` }] },
      { id: 'grok-image-routing', title: '参考图路由', models: [
        { name: '无参考图', description: '/v1/images/generations · grok-imagine-image-2.0', duration: '文生图' },
        { name: '有参考图', description: '/v1/images/edits · grok-imagine-image-edit', duration: '图生图' },
      ], note: '传参考图时需要同时切换端点和 model；Grok 图生图使用 JSON 格式。' },
    ],
  },
  {
    key: 'grok-edit', category: '图片模型', label: 'Grok 图生图', title: 'Grok 图生图',
    intro: '使用 JSON 请求同步编辑参考图片。图生图接口与 Grok 文生图使用不同端点及模型名。',
    endpoint: 'https://llm.aigokey.com/v1/images/edits', authHeader: 'Authorization: Bearer ...',
    sections: [
      { id: 'grok-edit-params', title: '请求参数', description: 'POST /v1/images/edits', parameters: [
        { name: 'model', type: '是 · string', description: '固定填写 grok-imagine-image-edit。' },
        { name: 'prompt', type: '是 · string', description: '生成描述或编辑要求。' },
        { name: 'images', type: '是 · object[]', description: '至少一张参考图。对象需同时包含 url 与 image_url，示例使用相同 URL。' },
        { name: 'n', type: '否 · integer', description: '输出图片数量；示例为 1。' },
        { name: 'response_format', type: '否 · string', description: '示例使用 url。' },
      ], examples: [{ title: 'Grok · URL 图生图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/images/edits' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "grok-imagine-image-edit",
  "prompt": "修改衣服颜色，保持其他内容不变",
  "images": [{
    "url": "https://example.com/reference.png",
    "image_url": "https://example.com/reference.png"
  }],
  "n": 1,
  "response_format": "url"
}'` }] },
      { id: 'grok-edit-response', title: '返回结果', examples: [{ title: '成功响应结构', code: `{
  "created": 1793100000,
  "data": [{"url": "https://example.com/generated/image-1.png"}]
}` }] },
      { id: 'grok-edit-routing', title: '参考图路由', models: [
        { name: '无参考图', description: '/v1/images/generations · grok-imagine-image-2.0', duration: '文生图' },
        { name: '有参考图', description: '/v1/images/edits · grok-imagine-image-edit', duration: '图生图' },
      ], note: '参考图地址需要可供服务端读取。图生图示例为 JSON，与香蕉模型的 multipart 文件上传示例不同。' },
    ],
  },
  {
    key: 'grok', category: '视频模型', label: 'Grok 视频', title: 'Grok 视频',
    intro: '文生视频 · 模型名 grok-imagine-video，通过任务 ID 获取最终结果。',
    endpoint: 'https://llm.aigokey.com/v1/videos', authHeader: 'Authorization: Bearer ...',
    sections: [
      { id: 'grok-params', title: '请求参数', description: '异步任务：创建 → 保存任务 ID → 查询 → 完成后下载。创建成功不代表视频已经生成。', parameters: [
        { name: 'model', type: '是 · string', description: '固定填写 grok-imagine-video。' },
        { name: 'prompt', type: '是 · string', description: '视频提示词。' },
        { name: 'duration', type: '是 · integer', description: '1–15 秒；也可用 seconds。' },
        { name: 'ratio', type: '否 · string', description: '16:9、9:16、1:1、4:3、3:4、2:3、3:2；别名 aspect_ratio。' },
        { name: 'size', type: '否 · string', description: '480p、720p、1080p；别名 resolution。' },
      ], note: '参数原名和别名选一种填写，避免发送冲突值。' },
      { id: 'grok-create', title: '文生视频', examples: [{ title: 'Grok · 创建任务', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "grok-imagine-video",
  "prompt": "黄昏的海边，海浪缓慢拍打沙滩，电影感，镜头平稳推进。",
  "duration": 3,
  "ratio": "16:9",
  "size": "720p"
}'` }] },
      { id: 'grok-task', title: '任务创建响应与查询', examples: [
        { title: '创建响应结构', code: `{
  "id": "task_xxx",
  "task_id": "task_xxx",
  "status": "queued",
  "progress": 0,
  "video_url": "",
  "url": ""
}` },
        { title: '查询任务', code: sharedQuery },
        { title: '完成响应结构', code: `{
  "id": "task_xxx",
  "task_id": "task_xxx",
  "status": "completed",
  "progress": 100,
  "video_url": "https://example.com/generated/video.mp4",
  "url": "https://example.com/generated/video.mp4"
}` },
      ], note: '状态 queued / in_progress 表示任务仍在等待或生成；completed 后读取视频地址或下载。failed / cancelled 后停止轮询并检查错误。建议从每 5 秒查询一次开始。' },
      { id: 'grok-download', title: '下载视频', examples: [{ title: '下载任务文件', code: sharedDownload }], note: '仅在 completed 后下载。也可读取完成响应中的 video_url 或 url。' },
    ],
  },
  {
    key: 'grok15', category: '视频模型', label: 'Grok 视频 1.5', title: 'Grok 视频 1.5',
    intro: '图生视频与文生视频 · 模型名 grok-imagine-video-1.5，通过任务 ID 获取最终结果。',
    endpoint: 'https://llm.aigokey.com/v1/videos', authHeader: 'Authorization: Bearer ...',
    sections: [
      { id: 'grok15-params', title: '请求参数', parameters: [
        { name: 'model', type: '是 · string', description: '固定填写 grok-imagine-video-1.5。' },
        { name: 'prompt', type: '是 · string', description: '视频提示词。' },
        { name: 'duration', type: '是 · integer', description: '1–15 秒；也可用 seconds。' },
        { name: 'ratio', type: '否 · string', description: '16:9、9:16、1:1、4:3、3:4、2:3、3:2；别名 aspect_ratio。' },
        { name: 'size', type: '否 · string', description: '480p、720p、1080p；别名 resolution。' },
        { name: 'images', type: '图生视频使用 · string[]', description: '参考图 URL，最多 7 张；省略时按文生视频请求。' },
      ], note: '参数原名和别名选一种填写，避免发送冲突值。参考图 URL 必须可访问。' },
      { id: 'grok15-create', title: '文生视频', examples: [{ title: 'Grok 视频 1.5 · 文生视频', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "grok-imagine-video-1.5",
  "prompt": "黄昏的海边，海浪缓慢拍打沙滩，电影感，镜头平稳推进。",
  "duration": 3,
  "ratio": "16:9",
  "size": "720p"
}'` }] },
      { id: 'grok15-reference', title: '图生视频', examples: [{ title: 'Grok 视频 1.5 · 参考图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 600 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "grok-imagine-video-1.5",
  "prompt": "保持人物和背景不变，人物自然转身并向镜头走来。",
  "duration": 5,
  "ratio": "9:16",
  "size": "720p",
  "images": ["https://example.com/reference.png"]
}'` }], note: '多张参考图在 images 字符串数组中继续追加，最多 7 张。' },
      { id: 'grok15-task', title: '任务创建响应与查询', examples: [
        { title: '创建响应结构', code: `{
  "id": "task_xxx",
  "task_id": "task_xxx",
  "status": "queued",
  "progress": 0,
  "video_url": "",
  "url": ""
}` },
        { title: '查询任务', code: sharedQuery },
      ], note: '保存实际返回的 task_id（或 id），使用同一 API Key 查询。queued → in_progress → completed；失败或取消后停止轮询。' },
      { id: 'grok15-download', title: '下载视频', examples: [{ title: '下载任务文件', code: sharedDownload }], note: '仅在 completed 后下载。建议从每 5 秒查询一次开始；客户端超时不代表服务端失败，保留任务 ID 继续查询，不要重复创建任务。' },
    ],
  },
  {
    key: 'seedance', category: '视频模型', label: 'Seedance 2.0 / 2.5', title: 'Seedance 2.0 / 2.5',
    intro: '按型号创建视频任务。Seedance 型号使用 POST /v1/videos，与其他视频模型共用任务查询和下载接口。',
    endpoint: 'https://llm.aigokey.com/v1/videos', authHeader: 'Authorization: Bearer ...',
    sections: [
      { id: 'seedance-models', title: '型号与能力', models: [
        { name: 'seedance2.0 coke', description: '720p 级有声 MP4；文生视频、最多 9 张参考图、最多 3 段参考音频，不支持参考视频。', duration: '4–15 秒' },
        { name: 'seedance-2.0-canopus', description: '标准版，720p 有声视频；文生视频及最多 9 张参考图，不支持参考音频或参考视频。', duration: '4–15 秒' },
      ], note: '按控制台与 API Key 所属分组选择可用模型。两个型号参数略有区别，请分别使用对应字段。' },
      { id: 'seedance-coke-params', title: 'seedance2.0 coke 参数', description: 'JSON 请求。本型号使用 ratio、image_urls、audio_urls，不使用其他模型的首尾帧或参考视频字段。', parameters: [
        { name: 'model', type: '是 · string', description: '固定填写 seedance2.0 coke，保留中间空格。' },
        { name: 'prompt', type: '是 · string', description: '描述主体、动作、镜头、光线和声音；素材与提示词应一致。' },
        { name: 'seconds', type: '否 · integer', description: '4–15 的整数，默认 15。请传 JSON 数字，不能传字符串。' },
        { name: 'resolution', type: '否 · string', description: '仅支持 720p。' },
        { name: 'ratio', type: '否 · string', description: '16:9、9:16、1:1、4:3、3:4、21:9。' },
        { name: 'image_urls', type: '否 · string[]', description: '最多 9 张公网可下载的 HTTP(S) 参考图。' },
        { name: 'audio_urls', type: '否 · string[]', description: '最多 3 段公网可下载的 HTTP(S) 参考音频。' },
      ] },
      { id: 'seedance-coke-create', title: 'seedance2.0 coke 请求示例', examples: [
        { title: '15 秒文生视频', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 180 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "seedance2.0 coke",
  "prompt": "夕阳下，一艘红色玩具帆船在平静水面上缓慢漂动，镜头平稳跟随。",
  "seconds": 15,
  "resolution": "720p",
  "ratio": "16:9"
}'` },
        { title: '图片与音频参考', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 180 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "seedance2.0 coke",
  "prompt": "参考图片确定主体外观，参考音频确定声音与节奏，镜头平稳推进。",
  "seconds": 15,
  "resolution": "720p",
  "ratio": "16:9",
  "image_urls": ["https://example.com/reference.jpg"],
  "audio_urls": ["https://example.com/reference.mp3"]
}'`, note: '参考素材需公网可直接下载；本接口不接受 Data URL / Base64。' },
      ] },
      { id: 'seedance-canopus-params', title: 'seedance-2.0-canopus 参数', description: '标准版字段与 coke 型号不同，不支持 21:9、音频参考或视频参考。', parameters: [
        { name: 'model', type: '是 · string', description: '固定填写 seedance-2.0-canopus。' },
        { name: 'prompt', type: '是 · string', description: '最多 3500 字。多图时可用 @图片1、@图片2 对应参考图顺序。' },
        { name: 'seconds', type: '否 · integer', description: '4–15 的整数，默认 15。传数字，不使用字符串。' },
        { name: 'resolution', type: '否 · string', description: '固定 720p。' },
        { name: 'ratio', type: '否 · string', description: '16:9、9:16、1:1、4:3、3:4；默认 16:9。' },
        { name: 'image_urls', type: '否 · string[]', description: '最多 9 张公网可下载的 HTTP(S) 参考图。' },
      ], note: '不要向 Canopus 请求发送 audio_urls、video_urls 或其他音视频参考字段。' },
      { id: 'seedance-canopus-create', title: 'seedance-2.0-canopus 请求示例', examples: [{ title: 'Canopus · 多参考图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 180 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "seedance-2.0-canopus",
  "prompt": "保持@图片1中人物外观，场景参考@图片2，人物自然走入场景。",
  "seconds": 15,
  "resolution": "720p",
  "ratio": "16:9",
  "image_urls": ["https://example.com/person.jpg", "https://example.com/scene.jpg"]
}'` }] },
      { id: 'seedance-upload', title: '上传本地参考素材', description: '本地文件先通过素材接口上传，取得 URL 后再传入创建请求。单文件不超过 50 MiB。', examples: [{ title: '上传参考图', code: `curl --fail-with-body -sS --connect-timeout 15 \\
  -X POST 'https://llm.aigokey.com/v1/media/uploads' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -F 'kind=image' \\
  -F 'file=@./reference.jpg'` }, { title: '上传参考音频', code: `curl --fail-with-body -sS --connect-timeout 15 \\
  -X POST 'https://llm.aigokey.com/v1/media/uploads' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -F 'kind=audio' \\
  -F 'file=@./reference.mp3'` }], note: '图片 kind=image，音频 kind=audio。把返回的 url 放入 image_urls 或 audio_urls。不要把本地路径直接放进参考素材数组。' },
      { id: 'seedance-task', title: '查询与下载', examples: [
        { title: '查询已有任务', code: sharedQuery },
        { title: '下载成片', code: sharedDownload },
      ], note: '创建响应包含 id 与 status。状态为 queued → in_progress → completed / failed；失败原因查看 error.message。仅在 completed 后下载，支持 Range 断点读取。' },
    ],
  },
  {
    key: 'muse', category: '视频模型', label: 'Muse 视频', title: 'Muse 视频',
    intro: '通过异步视频任务接口生成视频，支持文生视频、首尾帧、多参考图和长视频型号。',
    endpoint: 'https://llm.aigokey.com/v1/videos', authHeader: 'Authorization: Bearer ...',
    sections: [
      { id: 'muse-models', title: '模型与时长', models: [
        { name: 'muse-video', description: '文生视频、首尾帧、多参考图。', duration: '1–10 秒' },
        { name: 'muse-video-20s', description: '长视频 / 源视频续写 +10 秒。', duration: '最长 20 秒' },
        { name: 'muse-video-30s', description: '长视频 / 源视频续写 +20 秒。', duration: '最长 30 秒' },
        { name: 'muse-video-40s', description: '40 秒长视频。', duration: '最长 40 秒' },
        { name: 'muse-video-50s', description: '50 秒长视频。', duration: '最长 50 秒' },
        { name: 'muse-video-60s', description: '60 秒长视频。', duration: '最长 60 秒' },
      ], note: '实际可用模型以 AIGOKEY API Key 所属分组开放的模型为准。' },
      { id: 'muse-params', title: '请求参数', description: 'JSON 请求使用 Content-Type: application/json。别名参数选一种填写，避免冲突。', parameters: [
        { name: 'model', type: '是 · string', description: 'muse-video、muse-video-20s、muse-video-30s、muse-video-40s、muse-video-50s、muse-video-60s。' },
        { name: 'prompt', type: '是 · string', description: '描述画面、动作、光线与声音。' },
        { name: 'seconds', type: '否 · string', description: '时长使用字符串，例如 "10"；长视频型号填写对应时长字符串。' },
        { name: 'aspect_ratio', type: '否 · string', description: '16:9、9:16、1:1、4:3、3:4；别名 ratio / size。size 在此是画幅别名。' },
        { name: 'camera_motion', type: '否 · string', description: '例如 zoom_in、pan_left、orbit、tracking_shot、static；别名 motion。' },
        { name: 'first_frame / last_frame', type: '否 · string', description: '首帧和尾帧图片 URL 或 Data URL；别名 image / input_reference、last_frame_url。' },
        { name: 'images', type: '否 · array', description: '最多 4 张参考图，元素为 URL 或 Base64；别名 reference_images。' },
        { name: 'video_url', type: '否 · string', description: '续写源视频的公网 MP4 URL。' },
      ], note: '固定原生 720p 级、24fps。Muse 的 seconds 是字符串；不要把 Grok 的 720p 等规格值填入 size。' },
      { id: 'muse-create', title: '文生视频', examples: [{ title: 'Muse · 10 秒文生视频', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 120 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "muse-video",
  "prompt": "金色夕阳下，海浪轻柔地拍打礁石，镜头缓慢推进，保留自然海浪声。",
  "aspect_ratio": "16:9",
  "seconds": "10",
  "camera_motion": "zoom_in"
}'` }] },
      { id: 'muse-reference', title: '首尾帧与多参考图', examples: [
        { title: '首尾帧图生视频', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 120 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "muse-video",
  "prompt": "保持参考主体与场景，让海浪自然运动，镜头缓慢推进。",
  "aspect_ratio": "16:9",
  "seconds": "10",
  "first_frame": "https://example.com/first-frame.png",
  "last_frame": "https://example.com/last-frame.png"
}'` },
        { title: '多参考图', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 120 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "muse-video",
  "prompt": "参考图片中的主体和场景生成自然连贯的视频。",
  "aspect_ratio": "16:9",
  "seconds": "10",
  "images": ["https://example.com/reference-1.png", "https://example.com/reference-2.png"]
}'`, note: '仅需要首帧时可省略 last_frame。图片也可以使用 Data URL。' },
      ] },
      { id: 'muse-long', title: '长视频与源视频续写', examples: [{ title: 'Muse · 30 秒源视频续写', code: `curl --fail-with-body -sS --connect-timeout 15 --max-time 120 \\
  -X POST 'https://llm.aigokey.com/v1/videos' \\
  -H "Authorization: Bearer ${'${AIGOKEY_API_KEY}'}" \\
  -H 'Content-Type: application/json' \\
  --data-raw '{
  "model": "muse-video-30s",
  "prompt": "沿着源视频的动作继续，镜头稳定推进，维持相同风格。",
  "aspect_ratio": "16:9",
  "seconds": "30",
  "video_url": "https://example.com/source-video.mp4"
}'` }], note: '按目标时长选择 muse-video-20s / 30s / 40s / 50s / 60s，并将 seconds 填为对应字符串。20s / 30s 型号的续写增量分别为 10 / 20 秒。' },
      { id: 'muse-task', title: '查询任务', examples: [
        { title: '创建响应示意', code: `{
  "id": "task_xxx",
  "task_id": "task_xxx",
  "object": "video",
  "model": "muse-video",
  "status": "in_progress",
  "progress": 10
}` },
        { title: '查询任务', code: sharedQuery },
        { title: '完成响应示意', code: `{
  "id": "task_xxx",
  "task_id": "task_xxx",
  "model": "muse-video",
  "status": "completed",
  "progress": 100,
  "video_url": "/v1/videos/task_xxx/content",
  "url": "/v1/videos/task_xxx/content"
}` },
      ], note: '通常每 5 秒查询一次。进度可能长时间不变，以 status 为准。客户端停止等待或超时后保留任务 ID，继续查询原任务，避免重复创建。' },
      { id: 'muse-download', title: '下载与预览', examples: [{ title: '下载 MP4', code: sharedDownload }], note: '仅在 completed 后下载。video_url / url 若为 /v1/ 开头的相对路径，使用 AIGOKEY 域名补全并携带 Bearer Key。' },
    ],
  },
]

const modelGroups = computed(() => [
  { label: '图片与接口', models: models.filter((model) => model.category === '图片模型') },
  { label: '视频与接口', models: models.filter((model) => model.category === '视频模型') },
])
const selected = ref('gpt-image')
const activeModel = computed(() => models.find((model) => model.key === selected.value) || models[0])
const copied = ref('')
const copyStatus = ref('')
let copyTimer: ReturnType<typeof setTimeout> | undefined

function selectModel(key: string) {
  selected.value = key
  window.scrollTo({ top: 0, behavior: 'instant' })
  copied.value = ''
}

async function copy(value: string, key: string) {
  clearTimeout(copyTimer)
  try {
    await navigator.clipboard.writeText(value)
    copied.value = key
    copyStatus.value = '已复制到剪贴板'
  } catch {
    copied.value = ''
    copyStatus.value = '复制失败，请选中文字手动复制'
  }
  copyTimer = setTimeout(() => { copied.value = ''; copyStatus.value = '' }, 2400)
}

useHead({
  title: 'AIGOKEY API 文档：Grok、Seedance、Muse 视频生成',
  meta: [
    { name: 'description', content: 'AIGOKEY 视频生成 API 文档，包含 Grok、Seedance 2.0/2.5、Muse 的接口地址、鉴权、请求示例与任务查询。' },
    { property: 'og:title', content: 'AIGOKEY API 文档：视频生成接口' },
    { property: 'og:description', content: 'Grok、Seedance、Muse 视频生成 API 接入说明。' },
  ],
})
</script>

<style scoped>
.reference-app { min-height: 100vh; color: #26352f; background: #fff; --leaf: #315e47; --leaf-soft: #eaf2e7; --border: #e4e8e1; --muted: #77827b; }
.topbar { position: sticky; top: 0; z-index: 20; display: grid; grid-template-columns: 1fr minmax(220px, 340px) 1fr; align-items: center; height: 66px; padding: 0 28px; border-bottom: 1px solid var(--border); background: rgba(255,255,255,.96); }
.brand { display: inline-flex; align-items: center; gap: 12px; min-width: 0; width: fit-content; }
.brand img { width: 130px; height: auto; object-fit: contain; }.brand span { padding-left: 12px; border-left: 1px solid var(--border); color: #718078; font-size: 12px; font-weight: 650; white-space: nowrap; }
.topbar-search { display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 11px; border: 1px solid #e7ebe5; border-radius: 5px; color: #8b958d; background: #fafbf9; font-size: 12px; }
.topbar-search kbd { margin-left: auto; padding: 2px 5px; border: 1px solid #e2e6df; border-radius: 3px; color: #939c95; background: #fff; font: 10px/1.4 Consolas, monospace; }
.topbar-link { justify-self: end; display: inline-flex; align-items: center; gap: 5px; color: #55685c; font-size: 12px; font-weight: 650; }.topbar-link:hover { color: var(--leaf); }
.documentation-layout { display: grid; grid-template-columns: 244px minmax(480px, 1fr) 220px; gap: 0; align-items: start; max-width: 1800px; margin: 0 auto; }
.model-sidebar { position: sticky; top: 66px; height: calc(100vh - 66px); min-height: 520px; display: flex; flex-direction: column; padding: 24px 16px 18px; border-right: 1px solid var(--border); background: #fbfcfa; overflow-y: auto; }
.sidebar-heading { margin: 0 0 12px; padding: 0 12px; color: #7b877f; font-size: 11px; font-weight: 750; letter-spacing: .04em; }
.model-sidebar nav { display: grid; gap: 3px; }
.model-sidebar nav button { display: flex; align-items: center; justify-content: space-between; width: 100%; min-height: 39px; padding: 0 12px; border: 0; border-radius: 5px; color: #5f6c63; background: transparent; text-align: left; font: inherit; font-size: 13px; cursor: pointer; }
.model-sidebar nav button:hover { color: #385c45; background: #f1f5ef; }.model-sidebar nav button.selected { color: #345c43; background: #e8f0e4; font-weight: 760; }.model-sidebar nav button svg { color: #587c62; }
.sidebar-meta { display: grid; grid-template-columns: 9px auto; align-items: center; gap: 6px 8px; margin-top: auto; padding: 16px 10px 0; border-top: 1px solid var(--border); color: #718078; font-size: 11px; font-weight: 700; }.status-dot { width: 7px; height: 7px; border-radius: 50%; background: #74a47b; }.sidebar-meta small { grid-column: 2; color: #a0a9a1; font-size: 10px; font-weight: 500; }
.reference-main { width: 100%; max-width: 920px; min-width: 0; justify-self: center; padding: 38px 48px 72px; }
.breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 34px; color: #8a958e; font-size: 11px; }.breadcrumb strong { color: #526259; font-weight: 650; }.breadcrumb svg:first-child { color: #87958b; }
.eyebrow { margin: 0 0 13px; color: #698a70; font: 750 10px/1.4 Consolas, monospace; letter-spacing: .12em; }
h1 { margin: 0; color: #253b2f; font-size: 32px; line-height: 1.24; font-weight: 800; }
.intro { margin: 16px 0 24px; color: #65736a; font-size: 13px; line-height: 1.8; }
.endpoint-banner { display: grid; grid-template-columns: auto minmax(0, 1fr) 32px; align-items: center; gap: 13px; min-height: 54px; padding: 8px 13px; border: 1px solid #dce9d8; border-radius: 6px; background: #f0f6ed; }.endpoint-banner .method { color: #456a4d; font: 800 10px/1 Consolas, monospace; letter-spacing: .06em; }.endpoint-banner code { color: #394b3f; font: 600 12px/1.5 Consolas, monospace; overflow-wrap: anywhere; }.endpoint-banner button,.example-title button { display: grid; width: 29px; height: 29px; place-items: center; border: 1px solid #e1e7dd; border-radius: 4px; color: #6d7c70; background: #fff; cursor: pointer; }.endpoint-banner button:hover,.example-title button:hover { border-color: #9bb49a; color: #365f47; }
.notice { display: flex; gap: 10px; align-items: flex-start; margin: 16px 0 40px; padding: 13px 15px; border: 1px solid #e4ebdd; border-radius: 6px; color: #647167; background: #f7f9f4; }.notice > svg { flex: 0 0 16px; margin-top: 2px; color: #708c65; }.notice p { margin: 0; font-size: 11px; line-height: 1.8; }.notice strong { color: #536a52; }.notice code { color: #50684e; }
.reference-section { scroll-margin-top: 84px; padding: 0 0 35px; margin: 0 0 34px; border-bottom: 1px solid var(--border); }.reference-section h2 { margin: 0 0 17px; color: #35483a; font-size: 19px; line-height: 1.4; font-weight: 760; }.section-description { margin: -5px 0 17px; color: #718077; font-size: 12px; line-height: 1.75; }
.parameter-table { border: 1px solid #e3e8e1; border-radius: 6px; overflow: hidden; }.parameter-row { display: grid; grid-template-columns: minmax(105px, .85fr) minmax(122px, .9fr) minmax(0, 2.5fr); gap: 14px; padding: 11px 13px; border-top: 1px solid #e8ece6; color: #69766d; font-size: 11px; line-height: 1.65; }.parameter-row:first-child { border-top: 0; }.parameter-head { color: #77847a; background: #f2f6ef; font-size: 10px; font-weight: 750; }.parameter-row code { color: #526c51; font: 650 11px/1.65 Consolas, monospace; overflow-wrap: anywhere; }
.variant-list { border: 1px solid #e3e8e1; border-radius: 6px; overflow: hidden; }.variant-row { display: grid; grid-template-columns: minmax(150px, .9fr) minmax(0, 2fr) minmax(85px, .55fr); gap: 14px; align-items: start; padding: 12px 14px; border-top: 1px solid #e8ece6; color: #69766d; font-size: 11px; line-height: 1.65; }.variant-row:first-child { border-top: 0; }.variant-row code { width: fit-content; padding: 1px 4px; border-radius: 3px; color: #47654a; background: #f0f5ec; font: 650 10px/1.6 Consolas, monospace; }.variant-row strong { color: #68786a; font-size: 10px; font-weight: 650; }
.example-block { margin-top: 16px; border: 1px solid #e2e8e0; border-radius: 6px; overflow: hidden; background: #fafbf9; }.example-title { display: flex; align-items: center; justify-content: space-between; min-height: 42px; padding: 5px 10px 5px 14px; border-bottom: 1px solid #e5eae3; }.example-title h3 { margin: 0; color: #667469; font-size: 10px; line-height: 1.5; font-weight: 740; }.example-title button { width: 27px; height: 27px; }.example-block pre { margin: 0; padding: 14px 15px; overflow-x: auto; color: #394840; background: #fbfcfa; font: 11px/1.75 Consolas, "Cascadia Code", monospace; tab-size: 2; }.example-block pre code { white-space: pre; }.example-note { margin: 0; padding: 10px 14px; border-top: 1px solid #e8ece6; color: #768177; font-size: 10px; line-height: 1.7; }.section-note { display: flex; gap: 8px; align-items: flex-start; margin: 14px 0 0; color: #738075; font-size: 10px; line-height: 1.75; }.section-note svg { flex: 0 0 15px; margin-top: 1px; color: #849a79; }
.doc-footer { color: #89938c; font-size: 10px; line-height: 1.8; }.doc-footer code { color: #587056; }.doc-footer span { padding: 0 5px; }
.page-toc { position: sticky; top: 66px; display: grid; align-content: start; gap: 3px; max-height: calc(100vh - 66px); padding: 39px 17px 20px; border-left: 1px solid var(--border); overflow-y: auto; }.page-toc > p { margin: 0 0 9px; color: #758179; font-size: 10px; font-weight: 760; }.page-toc a { padding: 7px 0; color: #89938b; font-size: 10px; line-height: 1.5; }.page-toc a:hover { color: #42694a; }.toc-meta { display: grid; gap: 5px; margin-top: 15px; padding-top: 14px; border-top: 1px solid var(--border); color: #879187; font-size: 9px; }.toc-meta small { color: #a0a9a0; font-size: 9px; }
.copy-toast { position: fixed; right: 22px; bottom: 18px; z-index: 40; margin: 0; color: #fff; font-size: 11px; pointer-events: none; }.copy-toast:not(:empty) { padding: 9px 13px; border-radius: 4px; background: #476a4e; box-shadow: 0 5px 16px #253c2b2e; }
@media (max-width: 1180px) { .documentation-layout { grid-template-columns: 220px minmax(0, 1fr); }.page-toc { display: none; }.reference-main { max-width: 850px; } }
@media (max-width: 720px) { .topbar { grid-template-columns: minmax(0, 1fr) auto; height: 58px; padding: 0 15px; }.brand img { width: 112px; }.brand span { padding-left: 9px; }.topbar-search { display: none; }.topbar-link { font-size: 10px; }.documentation-layout { display: block; }.model-sidebar { position: sticky; top: 58px; z-index: 15; height: auto; min-height: 0; padding: 0; border-right: 0; border-bottom: 1px solid var(--border); background: #fff; overflow: visible; }.sidebar-heading,.sidebar-meta { display: none; }.model-sidebar nav { display: flex; gap: 0; padding: 0 12px; overflow-x: auto; scrollbar-width: none; }.model-sidebar nav::-webkit-scrollbar { display: none; }.model-sidebar nav button { flex: 0 0 auto; width: auto; min-height: 43px; padding: 0 12px; border-radius: 0; border-bottom: 2px solid transparent; white-space: nowrap; font-size: 11px; }.model-sidebar nav button.selected { border-bottom-color: #66875e; background: transparent; }.model-sidebar nav button svg { display: none; }.reference-main { padding: 26px 18px 54px; }.breadcrumb { margin-bottom: 25px; }.reference-section { scroll-margin-top: 116px; } }
@media (max-width: 480px) { .topbar { padding-inline: 12px; }.brand { gap: 8px; }.brand img { width: 102px; }.brand span { font-size: 10px; }.topbar-link { gap: 3px; font-size: 0; }.topbar-link svg { width: 18px; height: 18px; }.reference-main { padding-inline: 14px; }h1 { font-size: 27px; }.endpoint-banner { grid-template-columns: auto minmax(0, 1fr) 29px; gap: 9px; padding-inline: 10px; }.endpoint-banner code { font-size: 10px; }.parameter-row { grid-template-columns: minmax(78px, .65fr) minmax(94px, .75fr) minmax(160px, 1.8fr); gap: 9px; min-width: 430px; }.parameter-table { overflow-x: auto; }.variant-row { grid-template-columns: minmax(110px, .9fr) minmax(145px, 1.6fr) minmax(65px, .55fr); gap: 9px; min-width: 390px; }.variant-list { overflow-x: auto; }.example-block pre { font-size: 10px; } }
</style>
