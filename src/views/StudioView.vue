<script setup lang="ts">
import { useHead } from "@unhead/vue";
import {
  Image,
  Video,
  Sparkles,
  ArrowUpRight,
  KeyRound,
  X,
  Eye,
  EyeOff,
  Upload,
  Download,
  RotateCcw,
  Trash2,
  Clock3,
  LoaderCircle,
  Check,
  CircleAlert,
  ArrowRight,
  ShieldCheck,
  Pause,
} from "@lucide/vue";
import { useStudio } from "@/composables/useStudio";

useHead({
  title: "AIGOKEY Studio · 生图与生视频",
  meta: [
    {
      name: "description",
      content:
        "用一句话创作图片与视频。连接你的 AIGOKEY API Key，自由选择模型、上传参考图，保存每一次灵感。",
    },
  ],
});
const {
  API_BASE,
  CONSOLE_ORIGIN,
  mode,
  form,
  models,
  model,
  connected,
  isGpt,
  isGemini,
  examples,
  keyDialog,
  clearDialog,
  keyMode,
  keyConnected,
  keyInput,
  showKey,
  rememberKey,
  connecting,
  connectionError,
  error,
  notice,
  storageWarning,
  preview,
  history,
  selected,
  historyFilter,
  filteredHistory,
  submitting,
  polling,
  hydrating,
  playbackErrors,
  sessions,
  mediaSource,
  openKeyDialog,
  closeKeyDialog,
  selectKeyTab,
  connect,
  disconnect,
  setExample,
  removeReference,
  pickFile,
  dropFile,
  generate,
  resume,
  pause,
  selectRecord,
  ensureVideoPlayable,
  mediaKey,
  reuse,
  download,
  clearWorks,
  stateLabel,
  formatDate,
} = useStudio();
</script>

<template>
  <div class="studio-page">
    <header class="studio-header">
      <a class="studio-brand" href="/studio/" aria-label="AIGOKEY Studio 首页">
        <span class="studio-mark" aria-hidden="true"><span /></span>
        <span class="studio-wordmark">AIGOKEY <span>STUDIO</span></span>
      </a>
      <span class="studio-header-divider" />
      <h1>生图 · 生视频</h1>
      <div class="studio-header-actions">
        <a
          :href="`${CONSOLE_ORIGIN}/keys`"
          target="_blank"
          rel="noopener noreferrer"
          class="studio-console"
          >控制台 <ArrowUpRight :size="14"
        /></a>
        <button
          class="studio-key-button"
          :class="{ connected }"
          :disabled="!!submitting"
          @click="openKeyDialog"
        >
          <span v-if="connected" class="studio-status-dot" /><KeyRound
            v-else
            :size="14"
          />
          {{ connected ? "已连接 · 管理 Key" : "连接 API Key" }}
        </button>
      </div>
    </header>

    <main class="studio-main">
      <div class="studio-toolbar">
        <div class="studio-tabs" role="tablist" aria-label="创作类型">
          <button
            id="image-tab"
            role="tab"
            :aria-selected="mode === 'image'"
            aria-controls="generator-panel"
            :class="{ active: mode === 'image' }"
            @click="mode = 'image'"
          >
            <Image :size="15" /> 图片
          </button>
          <button
            id="video-tab"
            role="tab"
            :aria-selected="mode === 'video'"
            aria-controls="generator-panel"
            :class="{ active: mode === 'video' }"
            @click="mode = 'video'"
          >
            <Video :size="15" /> 视频
          </button>
        </div>
        <span class="studio-toolbar-note"
          ><ShieldCheck :size="14" /> 图片与视频可使用不同的
          Key，按所属分组计费</span
        >
      </div>

      <div v-if="storageWarning" class="studio-banner" role="status">
        <CircleAlert :size="16" /> {{ storageWarning }}
      </div>
      <div v-if="notice" class="studio-banner info" role="status">
        <Check :size="16" /> {{ notice
        }}<button aria-label="关闭提示" @click="notice = ''">
          <X :size="14" />
        </button>
      </div>

      <div class="studio-workspace">
        <section
          id="generator-panel"
          class="studio-controls"
          role="tabpanel"
          :aria-labelledby="`${mode}-tab`"
        >
          <form @submit.prevent="generate">
            <div class="studio-panel-heading">
              <h2>创作设置</h2>
              <span>{{ mode === "image" ? "IMAGE" : "VIDEO" }}</span>
            </div>
            <label class="studio-field"
              ><span
                >模型
                <span v-if="connected" class="studio-field-hint"
                  >{{ models.length }} 个可用</span
                ></span
              >
              <select
                v-model="form.model"
                :disabled="!models.length || !!submitting"
                aria-label="模型"
              >
                <option v-if="!models.length" value="">
                  {{
                    connected
                      ? "当前 Key 没有可用模型"
                      : "连接 API Key 后选择模型"
                  }}
                </option>
                <option v-for="item in models" :key="item.id" :value="item.id">
                  {{ item.label }}
                </option>
              </select>
            </label>
            <label class="studio-field studio-prompt"
              ><span
                >提示词
                <span class="studio-field-hint">把想象写下来</span></span
              >
              <textarea
                v-model="form.prompt"
                :placeholder="
                  mode === 'image'
                    ? '描述你想要的画面，试试加入主体、风格和光线…'
                    : '描述画面、动作和镜头，让你的灵感动起来…'
                "
                maxlength="12000"
                :disabled="!!submitting"
                @keydown.ctrl.enter.prevent="generate"
                @keydown.meta.enter.prevent="generate"
              />
              <span class="studio-prompt-count"
                >{{ form.prompt.length }} / 12000</span
              >
            </label>

            <template v-if="!connected || models.length">
              <template v-if="mode === 'image'">
                <label class="studio-field"
                  ><span>尺寸</span
                  ><select
                    v-model="form.size"
                    aria-label="尺寸"
                    :disabled="!!submitting"
                  >
                    <option value="1024x1024">1:1 · 1024 × 1024</option>
                    <option value="1536x1024">3:2 · 1536 × 1024</option>
                    <option value="1024x1536">2:3 · 1024 × 1536</option>
                    <option v-if="!isGemini" value="auto">自动尺寸</option>
                  </select></label
                >
                <div class="studio-field-row">
                  <label class="studio-field"
                    ><span>质量</span
                    ><select
                      v-model="form.quality"
                      aria-label="质量"
                      :disabled="
                        !!submitting || (connected && !isGpt && !isGemini)
                      "
                    >
                      <option value="auto">自动</option>
                      <option value="low">低</option>
                      <option value="medium">中</option>
                      <option value="high">高</option>
                    </select></label
                  >
                  <label class="studio-field"
                    ><span>数量</span
                    ><select
                      v-model="form.count"
                      aria-label="数量"
                      :disabled="!!submitting || isGemini || form.stream"
                    >
                      <option :value="1">1 张</option>
                      <option :value="2">2 张</option>
                      <option :value="3">3 张</option>
                      <option :value="4">4 张</option>
                    </select></label
                  >
                </div>
              </template>
              <template v-else>
                <div class="studio-field-row">
                  <label class="studio-field"
                    ><span>分辨率</span
                    ><select
                      v-model="form.resolution"
                      aria-label="分辨率"
                      :disabled="!!submitting"
                    >
                      <option value="480p">480p</option>
                      <option value="720p">720p</option>
                      <option
                        v-if="model?.protocol === 'seedance'"
                        value="1080p"
                      >
                        1080p
                      </option>
                    </select></label
                  >
                  <label class="studio-field"
                    ><span>时长</span
                    ><select
                      v-model="form.duration"
                      aria-label="时长"
                      :disabled="!!submitting"
                    >
                      <option :value="5">5 秒</option>
                      <option :value="6">6 秒</option>
                      <option :value="10">10 秒</option>
                      <option :value="15">15 秒</option>
                    </select></label
                  >
                </div>
                <label class="studio-field"
                  ><span>画面比例</span
                  ><select
                    v-model="form.ratio"
                    aria-label="画面比例"
                    :disabled="!!submitting"
                  >
                    <option value="16:9">16:9 · 横屏</option>
                    <option value="9:16">9:16 · 竖屏</option>
                    <option value="1:1">1:1 · 方形</option>
                  </select></label
                >
              </template>

              <div class="studio-field">
                <span
                  >{{ mode === "image" ? "参考图" : "首帧图" }}
                  <span class="studio-optional"
                    >可选 ·
                    {{ mode === "image" ? "图生图 / 编辑" : "图生视频" }}</span
                  ></span
                >
                <label
                  v-if="!form.reference"
                  class="studio-upload"
                  @dragover.prevent
                  @drop.prevent="dropFile"
                  ><Upload :size="17" /><span
                    >点击上传或拖入图片<small
                      >JPG、PNG、WebP · 最大 20 MB</small
                    ></span
                  ><input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    :disabled="!!submitting"
                    aria-label="上传参考图"
                    @change="pickFile"
                /></label>
                <div v-else class="studio-reference">
                  <img :src="form.referenceUrl" alt="参考图预览" /><span
                    >{{ form.reference.name
                    }}<small
                      >{{
                        (form.reference.size / 1024 / 1024).toFixed(1)
                      }}
                      MB</small
                    ></span
                  ><button
                    type="button"
                    aria-label="移除参考图"
                    :disabled="!!submitting"
                    @click="removeReference"
                  >
                    <X :size="15" />
                  </button>
                </div>
              </div>
              <label
                v-if="mode === 'image' && (!connected || isGpt)"
                class="studio-checkbox"
                ><input
                  v-model="form.stream"
                  type="checkbox"
                  :disabled="!!submitting"
                /><span
                  >流式预览 <small>先出预览，再出成品 · 单张</small></span
                ></label
              >
              <p v-if="mode === 'video'" class="studio-microcopy">
                提交后可离开页面，重新连接同一 Key 后继续查询。
              </p>
            </template>

            <div class="studio-cost">
              <span>预计消耗</span
              ><span
                >以实际计费为准 <span class="studio-cost-dash">—</span></span
              >
            </div>
            <div v-if="error" class="studio-error" role="alert">
              <CircleAlert :size="15" /><span>{{ error }}</span>
            </div>
            <button
              class="studio-generate"
              type="submit"
              :disabled="!!submitting || (connected && !models.length)"
            >
              <LoaderCircle
                v-if="submitting"
                class="studio-spin"
                :size="17"
              /><Sparkles v-else :size="17" />
              {{
                submitting
                  ? "正在提交创作…"
                  : !connected
                    ? "连接 Key，开始创作"
                    : mode === "image"
                      ? "生成图片"
                      : "生成视频"
              }}
              <ArrowRight v-if="!submitting" :size="17" />
            </button>
            <p v-if="connected && !models.length" class="studio-form-note">
              当前 Key 所在分组没有可用的{{
                mode === "image" ? "图片" : "视频"
              }}模型。<a
                :href="`${CONSOLE_ORIGIN}/keys`"
                target="_blank"
                rel="noopener noreferrer"
                >前往控制台 <ArrowUpRight :size="12" /></a
              >创建对应分组的 Key。
            </p>
            <p v-else class="studio-form-note">
              {{
                connected
                  ? "费用由 Key 所属分组决定，最终以账单为准。"
                  : "使用你的 AIGOKEY API Key 即可开始。"
              }}
            </p>
          </form>
        </section>

        <section
          class="studio-canvas"
          aria-label="作品预览"
          :aria-busy="
            selected?.state === 'submitting' ||
            (selected && polling.has(selected.id))
          "
        >
          <div class="studio-canvas-heading">
            <span>{{ selected ? "作品预览" : "灵感画布" }}</span
            ><span
              ><span class="studio-tiny-dot" />
              {{
                mode === "image" ? "IMAGE GENERATION" : "VIDEO GENERATION"
              }}</span
            >
          </div>
          <div v-if="!selected" class="studio-empty">
            <div class="studio-empty-icon" aria-hidden="true">
              <span /><Sparkles :size="26" :stroke-width="1.3" />
            </div>
            <h2>让灵感，变成{{ mode === "image" ? "画面" : "动态" }}</h2>
            <p>写一句提示词，或从下面的灵感开始。</p>
            <div class="studio-examples">
              <button
                v-for="example in examples"
                :key="example.label"
                :disabled="!!submitting"
                @click="setExample(example)"
              >
                {{ example.label }}<ArrowUpRight :size="12" />
              </button>
            </div>
          </div>
          <template v-else>
            <div
              v-if="selected.media.length"
              class="studio-results"
              :class="{ multiple: selected.media.length > 1 }"
            >
              <div
                v-for="(item, index) in selected.media"
                :key="index"
                class="studio-result"
              >
                <img
                  v-if="selected.kind === 'image'"
                  :src="mediaSource(item)"
                  :alt="selected.prompt"
                  referrerpolicy="no-referrer"
                />
                <video
                  v-else
                  :key="mediaSource(item)"
                  :src="mediaSource(item)"
                  controls
                  playsinline
                  preload="metadata"
                />
                <div class="studio-result-actions">
                  <a
                    :href="mediaSource(item)"
                    target="_blank"
                    rel="noopener noreferrer"
                    >打开原文件 <ArrowUpRight :size="13" /></a
                  ><button @click="download(selected, index)">
                    <Download :size="14" /> 下载{{
                      selected.kind === "image" ? "图片" : "视频"
                    }}
                  </button>
                </div>
                <div
                  v-if="selected.kind === 'video' && !item.blob"
                  class="studio-video-playback-status"
                >
                  <span
                    :class="{
                      error: playbackErrors.has(mediaKey(selected, index)),
                    }"
                  >
                    {{
                      hydrating.has(mediaKey(selected, index))
                        ? "正在加载可播放视频…"
                        : playbackErrors.get(mediaKey(selected, index)) ||
                          "正在准备本地播放文件。"
                    }}
                  </span>
                  <button
                    v-if="!hydrating.has(mediaKey(selected, index))"
                    type="button"
                    @click="ensureVideoPlayable(selected, index)"
                  >
                    <RotateCcw :size="12" />重试播放
                  </button>
                </div>
                <p v-else-if="!item.blob" class="studio-cache-note">
                  图片暂未缓存到本机，远程地址可能过期，请及时下载。
                </p>
              </div>
            </div>
            <div v-else class="studio-empty studio-task-state">
              <img
                v-if="preview && submitting === mode"
                :src="preview"
                class="studio-stream-preview"
                alt="正在生成的预览，非最终成品"
              />
              <div v-else class="studio-empty-icon" aria-hidden="true">
                <LoaderCircle
                  v-if="
                    selected.state === 'submitting' || polling.has(selected.id)
                  "
                  class="studio-spin"
                  :size="25"
                /><CircleAlert v-else :size="25" />
              </div>
              <h2>{{ stateLabel(selected) }}</h2>
              <p v-if="selected.error" class="studio-task-error">
                {{ selected.error }}
              </p>
              <p v-else>
                {{
                  preview
                    ? "预览已就绪，正在细化最终画面…"
                    : "好作品值得等待，你的灵感正在成形。"
                }}
              </p>
              <code v-if="selected.taskId" class="studio-task-id">{{
                selected.taskId
              }}</code>
              <button
                v-if="selected.taskId && selected.state !== 'failed'"
                class="studio-secondary"
                @click="
                  polling.has(selected.id) ? pause(selected) : resume(selected)
                "
              >
                <Pause v-if="polling.has(selected.id)" :size="14" /><RotateCcw
                  v-else
                  :size="14"
                />{{ polling.has(selected.id) ? "暂停查询" : "继续查询" }}
              </button>
              <a
                v-if="selected.state === 'uncertain'"
                :href="`${CONSOLE_ORIGIN}/usage`"
                target="_blank"
                rel="noopener noreferrer"
                class="studio-secondary"
                >前往控制台确认 <ArrowUpRight :size="14"
              /></a>
            </div>
            <div class="studio-work-caption">
              <div>
                <span
                  >{{ selected.model }} ·
                  {{ formatDate(selected.createdAt) }}</span
                >
                <p>{{ selected.prompt }}</p>
              </div>
              <button
                title="复用提示词和参数"
                aria-label="复用提示词和参数"
                :disabled="!!submitting"
                @click="reuse(selected)"
              >
                <RotateCcw :size="16" />
              </button>
            </div>
          </template>
          <div v-if="!selected" class="studio-canvas-footer">
            <span /> 你的下一件作品，从一个想法开始 <span />
          </div>
        </section>
      </div>

      <section class="studio-history" aria-label="创作历史">
        <div class="studio-history-heading">
          <div class="studio-history-title">
            <Clock3 :size="16" />
            <h2>创作历史</h2>
            <span class="studio-history-count">{{ history.length }}</span>
            <p>仅保存在此浏览器</p>
          </div>
          <button
            class="studio-clear"
            :disabled="!history.length || !!submitting || !!polling.size"
            @click="clearDialog?.showModal()"
          >
            <Trash2 :size="13" /> 清空
          </button>
        </div>
        <div
          v-if="history.length"
          class="studio-history-filters"
          aria-label="历史筛选"
        >
          <button
            v-for="filter in ['all', 'image', 'video'] as const"
            :key="filter"
            :class="{ active: historyFilter === filter }"
            @click="historyFilter = filter"
          >
            {{
              filter === "all" ? "全部" : filter === "image" ? "图片" : "视频"
            }}
          </button>
        </div>
        <div v-if="!filteredHistory.length" class="studio-history-empty">
          <span class="studio-history-empty-icon"
            ><Image :size="18" :stroke-width="1.4"
          /></span>
          <p>
            {{
              history.length
                ? "此分类还没有作品"
                : "还没有作品，第一份灵感正在路上。"
            }}<span>生成的图片与视频会出现在这里</span>
          </p>
        </div>
        <div v-else class="studio-history-grid">
          <article
            v-for="item in filteredHistory"
            :key="item.id"
            class="studio-history-card"
            :class="{ selected: selected?.id === item.id }"
          >
            <button
              class="studio-history-preview"
              :aria-label="`查看作品：${item.prompt}`"
              @click="selectRecord(item)"
            >
              <img
                v-if="item.kind === 'image' && item.media[0]"
                :src="mediaSource(item.media[0])"
                alt=""
                loading="lazy"
                referrerpolicy="no-referrer"
              /><Video
                v-else-if="item.kind === 'video'"
                :size="28"
                :stroke-width="1.3"
              /><Image v-else :size="28" :stroke-width="1.3" /><span
                class="studio-history-badge"
                :class="item.state"
                >{{ stateLabel(item) }}</span
              >
            </button>
            <div class="studio-history-card-body">
              <p>{{ item.prompt }}</p>
              <div>
                <span>{{ formatDate(item.createdAt) }}</span
                ><button
                  title="复用提示词"
                  aria-label="复用提示词"
                  :disabled="!!submitting"
                  @click="reuse(item)"
                >
                  <RotateCcw :size="14" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
      <footer class="studio-footer">
        <span>AIGOKEY <span>STUDIO</span></span
        ><span>给想象，一个看得见的形状。</span>
      </footer>
    </main>

    <dialog
      ref="keyDialog"
      class="studio-dialog"
      @cancel="connecting && $event.preventDefault()"
      @click="!connecting && $event.target === keyDialog && closeKeyDialog()"
    >
      <form @submit.prevent="connect">
        <div class="studio-dialog-top">
          <span class="studio-dialog-icon"><KeyRound :size="20" /></span
          ><button
            type="button"
            aria-label="关闭连接窗口"
            :disabled="connecting"
            @click="closeKeyDialog"
          >
            <X :size="19" />
          </button>
        </div>
        <h2>连接你的创作空间</h2>
        <p class="studio-dialog-intro">
          图片与视频分别配置 Key；连接成功后自动切换到对应创作模式。
        </p>
        <div class="studio-key-tabs" role="tablist" aria-label="密钥类型">
          <button
            v-for="kind in ['image', 'video'] as const"
            :id="`${kind}-key-tab`"
            :key="kind"
            type="button"
            role="tab"
            :aria-selected="keyMode === kind"
            :tabindex="keyMode === kind ? 0 : -1"
            aria-controls="key-settings-panel"
            :class="{ active: keyMode === kind }"
            :disabled="connecting"
            @click="selectKeyTab(kind)"
            @keydown.right.prevent="
              selectKeyTab(kind === 'image' ? 'video' : 'image', true)
            "
            @keydown.left.prevent="
              selectKeyTab(kind === 'image' ? 'video' : 'image', true)
            "
            @keydown.home.prevent="selectKeyTab('image', true)"
            @keydown.end.prevent="selectKeyTab('video', true)"
          >
            <Image v-if="kind === 'image'" :size="15" /><Video
              v-else
              :size="15"
            />
            {{ kind === "image" ? "图片 Key" : "视频 Key" }}
            <span
              v-if="sessions[kind].key"
              class="studio-status-dot"
              aria-label="已连接"
            />
          </button>
        </div>
        <div
          id="key-settings-panel"
          role="tabpanel"
          :aria-labelledby="`${keyMode}-key-tab`"
          :aria-busy="connecting"
        >
          <label class="studio-field"
            ><span>服务地址 <span class="studio-field-hint">已内置</span></span
            ><input
              :value="API_BASE"
              readonly
              aria-label="服务地址"
              class="studio-base-input"
          /></label>
          <label class="studio-field"
            ><span
              >{{ keyMode === "image" ? "图片 API Key" : "视频 API Key" }}
              <a
                :href="`${CONSOLE_ORIGIN}/keys`"
                target="_blank"
                rel="noopener noreferrer"
                >获取 Key <ArrowUpRight :size="12" /></a></span
            ><span class="studio-key-input"
              ><input
                v-model="keyInput"
                :type="showKey ? 'text' : 'password'"
                :placeholder="
                  keyMode === 'image'
                    ? '输入图片分组的 Key（sk-…）'
                    : '输入视频分组的 Key（sk-…）'
                "
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                :aria-label="
                  keyMode === 'image' ? '图片 API Key' : '视频 API Key'
                "
                :disabled="connecting"
                autofocus /><button
                type="button"
                :aria-label="showKey ? '隐藏密钥' : '显示密钥'"
                @click="showKey = !showKey"
              >
                <EyeOff v-if="showKey" :size="16" /><Eye
                  v-else
                  :size="16"
                /></button></span
          ></label>
          <label class="studio-checkbox"
            ><input
              v-model="rememberKey"
              type="checkbox"
              :disabled="connecting"
            /><span
              >记住{{ keyMode === "image" ? "图片" : "视频" }} Key
              <small>仅限个人设备</small></span
            ></label
          >
          <p class="studio-key-privacy">
            默认仅在当前页面保留。勾选后会保存在此浏览器，点击“断开连接”可移除。
          </p>
          <div v-if="connectionError" class="studio-error" role="alert">
            <CircleAlert :size="15" /><span>{{ connectionError }}</span>
          </div>
          <div
            v-else-if="keyConnected"
            class="studio-key-success"
            role="status"
          >
            <Check :size="15" />{{ keyMode === "image" ? "图片" : "视频" }} Key
            已连接，主页面已切换到{{
              keyMode === "image" ? "图片" : "视频"
            }}创作。
          </div>
          <button
            type="submit"
            class="studio-generate"
            :disabled="connecting || !keyInput.trim()"
          >
            <LoaderCircle v-if="connecting" :size="17" class="studio-spin" />{{
              connecting
                ? "正在验证 Key…"
                : keyMode === "image"
                  ? "连接图片 Key"
                  : "连接视频 Key"
            }}<ArrowRight v-if="!connecting" :size="17" />
          </button>
          <button
            v-if="keyConnected"
            type="button"
            class="studio-disconnect"
            :disabled="connecting"
            @click="disconnect"
          >
            断开{{ keyMode === "image" ? "图片" : "视频" }} Key 并移除保存
          </button>
        </div>
        <button
          type="button"
          class="studio-secondary studio-key-done"
          :disabled="connecting"
          @click="closeKeyDialog"
        >
          完成
        </button>
      </form>
    </dialog>
    <dialog ref="clearDialog" class="studio-dialog studio-confirm">
      <h2>清空创作历史？</h2>
      <p>将移除此浏览器中的全部作品记录和缓存。已下载的文件仍会保留。</p>
      <div>
        <button class="studio-secondary" @click="clearDialog?.close()">
          保留历史</button
        ><button class="studio-danger" @click="clearWorks">确认清空</button>
      </div>
    </dialog>
  </div>
</template>

<style src="../styles/studio.css"></style>
