<template>
  <div class="codex-page">
    <header class="sticky top-0 z-20 border-b border-line/80 bg-[#f8fbfd]/90 backdrop-blur-[18px]">
      <div class="flex items-center justify-between gap-5 max-w-[1180px] min-h-[72px] mx-auto px-6 max-[720px]:flex-col max-[720px]:items-start max-[720px]:py-3.5 max-[720px]:px-4">
        <router-link to="/" class="inline-flex items-center gap-3 text-[21px] font-black" aria-label="AigoKey">
          <img src="/assets/aigokey-logo.png" alt="AigoKey Logo" class="w-[42px] h-[42px] rounded-[10px] object-cover shadow-[0_10px_24px_rgba(36,104,242,0.16)]" />
          <span>AigoKey</span>
        </router-link>
        <div class="flex items-center gap-3 max-[720px]:w-full max-[720px]:grid max-[720px]:grid-cols-[repeat(auto-fit,minmax(76px,1fr))] max-[720px]:gap-2">
          <LanguageMenu />
          <a class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" :href="registerUrl" target="_top">{{ t.navButtons.register }}</a>
          <a class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" :href="loginUrl" target="_top">{{ t.navButtons.login }}</a>
          <router-link class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" to="/image-creation">{{ t.navButtons.imageCreation }}</router-link>
          <router-link class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" to="/codex-help">{{ t.navButtons.help }}</router-link>
          <router-link class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" to="/enterprise-service">{{ t.navButtons.enterprise }}</router-link>
          <button class="btn btn-primary max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" type="button" @click="showModal = true">{{ t.navButtons.trial }}</button>
        </div>
      </div>
    </header>

    <main id="top">
      <section class="hero">
        <p class="eyebrow">{{ t.codexHelp.hero.eyebrow }}</p>
        <h1>{{ t.codexHelp.hero.title }}</h1>
        <p class="hero-copy">
          {{ t.codexHelp.hero.copy }}
        </p>
        <div class="hero-actions">
          <a class="button" href="javascript:void(0)" @click="scrollTo('config-video')">{{ t.codexHelp.hero.buttons.video }}</a>
          <a class="button secondary" href="javascript:void(0)" @click="scrollTo('non-developer')">{{ t.codexHelp.hero.buttons.nonDeveloper }}</a>
          <a class="button secondary" href="javascript:void(0)" @click="scrollTo('developer')">{{ t.codexHelp.hero.buttons.developer }}</a>
        </div>
      </section>

      <section class="jumpbar" :aria-label="t.codexHelp.quickJump">
        <a v-for="item in t.codexHelp.toc" :key="item.id" href="javascript:void(0)" @click="scrollTo(item.id)">
          {{ item.label }}
        </a>
      </section>

      <div class="guide">
        <section id="prep" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">01</span>
            <h2>{{ t.codexHelp.prep.head }}</h2>
          </div>
          <p class="lead">
            {{ t.codexHelp.prep.lead }}
          </p>
          <ul class="link-list">
            <li>{{ t.codexHelp.prep.siteLabel }}<a href="https://www.aigokey.com/" target="_blank" rel="noopener">https://www.aigokey.com/</a></li>
            <li>{{ t.codexHelp.prep.homeBefore }}<router-link to="/">{{ t.codexHelp.prep.homeLink }}</router-link></li>
          </ul>
          <figure class="qr-figure">
            <img src="/assets/01_联系客服_微信二维码.png" :alt="t.codexHelp.prep.qrAlt" />
            <figcaption>{{ t.codexHelp.prep.qrCaption }}</figcaption>
          </figure>
        </section>

        <section id="config-video" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">02</span>
            <h2>{{ t.codexHelp.video.head }}</h2>
          </div>
          <p class="lead">{{ t.codexHelp.video.lead }}</p>
          <figure class="video-figure">
            <video
              src="https://aigokey-website.oss-cn-shenzhen.aliyuncs.com/video_compressed.mp4"
              poster="/assets/codex_config_tutorial_cover.jpg"
              controls
              preload="metadata"
            ></video>
            <figcaption>{{ t.codexHelp.video.caption }}</figcaption>
          </figure>
        </section>

        <section id="non-developer" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">03</span>
            <h2>{{ t.codexHelp.nonDeveloper.head }}</h2>
          </div>
          <p class="lead">
            {{ t.codexHelp.nonDeveloper.lead }}
          </p>

          <div id="windows-user" class="step-block">
            <h3>{{ t.codexHelp.nonDeveloper.windowsHead }}</h3>
            <ol class="steps">
              <li v-for="step in t.codexHelp.nonDeveloper.windowsSteps" :key="step">{{ step }}</li>
            </ol>
            <ul class="link-list">
              <li>{{ t.codexHelp.links.app }}<a href="https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&gl=GP" target="_blank" rel="noopener">Microsoft Store Codex</a></li>
              <li>{{ t.codexHelp.links.ccSwitch }}<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li>
            </ul>
            <div class="media-list">
              <figure v-for="shot in t.codexHelp.screenshots.windows" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <div id="mac-user" class="step-block">
            <h3>{{ t.codexHelp.nonDeveloper.macHead }}</h3>
            <ol class="steps">
              <li v-for="step in t.codexHelp.nonDeveloper.macSteps" :key="step">{{ step }}</li>
            </ol>
            <ul class="link-list">
              <li>{{ t.codexHelp.links.app }}<a href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener">OpenAI Codex</a></li>
              <li>{{ t.codexHelp.links.ccSwitch }}<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li>
            </ul>
            <div class="command">
              <span>{{ t.codexHelp.links.macCommand }}</span>
              <code>brew tap farion1231/ccswitch &amp;&amp; brew install --cask cc-switch</code>
              <button type="button" @click="copyText('brew tap farion1231/ccswitch && brew install --cask cc-switch', $event)">{{ t.codexHelp.copy.action }}</button>
            </div>
            <div class="media-list">
              <figure v-for="shot in t.codexHelp.screenshots.mac" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="developer" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">04</span>
            <h2>{{ t.codexHelp.developer.head }}</h2>
          </div>
          <p class="lead">
            {{ t.codexHelp.developer.lead }}
          </p>

          <div id="cli-install" class="step-block">
            <h3>{{ t.codexHelp.developer.cliHead }}</h3>
            <div class="command-group">
              <div class="command">
                <span>Windows</span>
                <code>npm install -g @openai/codex</code>
                <button type="button" @click="copyText('npm install -g @openai/codex', $event)">{{ t.codexHelp.copy.action }}</button>
              </div>
              <div class="command">
                <span>Mac</span>
                <code>brew install --cask codex</code>
                <button type="button" @click="copyText('brew install --cask codex', $event)">{{ t.codexHelp.copy.action }}</button>
              </div>
            </div>
          </div>

          <div id="cc-switch" class="step-block">
            <h3>{{ t.codexHelp.developer.ccHead }}</h3>
            <p>{{ t.codexHelp.developer.ccText }}</p>
            <ul class="link-list">
              <li>{{ t.codexHelp.links.project }}<a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch</a></li>
              <li>{{ t.codexHelp.links.download }}<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li>
            </ul>
            <div class="command">
              <span>{{ t.codexHelp.links.macCliCommand }}</span>
              <code>brew tap farion1231/ccswitch &amp;&amp; brew install --cask cc-switch</code>
              <button type="button" @click="copyText('brew tap farion1231/ccswitch && brew install --cask cc-switch', $event)">{{ t.codexHelp.copy.action }}</button>
            </div>
            <div class="media-list">
              <figure v-for="shot in t.codexHelp.screenshots.developerCc" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <div id="vscode-plugin" class="step-block">
            <h3>{{ t.codexHelp.developer.vscodeHead }}</h3>
            <p>{{ t.codexHelp.developer.vscodeText }}</p>
            <div class="media-list">
              <figure v-for="shot in t.codexHelp.screenshots.vscode" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <div id="codex-app" class="step-block">
            <h3>{{ t.codexHelp.developer.appHead }}</h3>
            <ul class="link-list">
              <li>{{ t.codexHelp.links.windowsDownload }}<a href="https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&gl=GP" target="_blank" rel="noopener">Microsoft Store Codex</a></li>
              <li>{{ t.codexHelp.links.macDownload }}<a href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener">OpenAI Codex</a></li>
            </ul>
            <div class="media-list">
              <figure v-for="shot in t.codexHelp.screenshots.codexApp" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="support" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">05</span>
            <h2>{{ t.codexHelp.support.head }}</h2>
          </div>
          <p>
            {{ t.codexHelp.support.siteBefore }}<a href="https://www.aigokey.com/" target="_blank" rel="noopener">https://www.aigokey.com/</a>{{ t.codexHelp.support.homeBefore }}<router-link to="/">{{ t.codexHelp.support.homeLink }}</router-link>{{ t.codexHelp.support.homeAfter }}
          </p>
          <p>{{ t.codexHelp.support.text }}</p>
          <figure class="qr-figure">
            <img src="/assets/12_联系客服_微信二维码.png" :alt="t.codexHelp.support.qrAlt" />
            <figcaption>{{ t.codexHelp.support.qrCaption }}</figcaption>
          </figure>
        </section>
      </div>
    </main>

    <footer class="py-8 px-6 text-[#667583] border-t border-line bg-white">
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-w-[1180px] mx-auto text-[14px] max-[720px]:grid-cols-1 max-[720px]:justify-items-center max-[720px]:text-center">
        <div class="inline-flex items-center gap-3 text-[21px] font-black text-[#111b24]">
          <img src="/assets/aigokey-logo.png" alt="AigoKey Logo" class="w-[42px] h-[42px] rounded-[10px] object-cover" />
          <span>AigoKey</span>
        </div>
        <div class="text-[#83909c] text-[13px]">{{ t.footer.copyright }}</div>
        <div class="justify-self-end max-[720px]:justify-self-center">{{ t.footer.text }}</div>
      </div>
    </footer>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(17,27,36,0.56)] backdrop-blur-[10px]" @click.self="showModal = false">
        <div class="w-full max-w-[420px] border border-line/90 rounded-lg bg-white shadow-[0_28px_80px_rgba(17,27,36,0.28)]">
          <div class="flex items-center justify-between gap-3.5 py-[18px] px-5 border-b border-line">
            <h2 class="text-[20px] leading-[1.3]">{{ t.modal.title }}</h2>
            <button class="grid w-9 h-9 place-items-center border border-line rounded-lg text-muted bg-white cursor-pointer text-[22px] leading-none" type="button" @click="showModal = false">×</button>
          </div>
          <div class="grid justify-items-center gap-3.5 px-6 pt-6 pb-7 text-center">
            <img class="w-full max-w-[280px] aspect-square border border-line rounded-lg object-contain bg-white" src="/assets/customer-service-qr.png" alt="QR" />
            <p class="text-muted text-[14px] leading-[1.65]">{{ t.modal.text }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import LanguageMenu from '@/components/LanguageMenu.vue'
import { useI18n } from '@/composables/useI18n'
import { useHostUrl } from '@/composables/useHostUrl'

const { t } = useI18n()
const { loginUrl, registerUrl } = useHostUrl()
const showModal = ref(false)

useHead(() => ({
  title: t.value.codexHelp.meta.title,
  meta: [
    { name: 'description', content: t.value.codexHelp.meta.description },
    { name: 'keywords', content: t.value.codexHelp.meta.keywords },
    { property: 'og:title', content: t.value.codexHelp.meta.title },
    { property: 'og:description', content: t.value.codexHelp.meta.ogDescription },
    { property: 'og:type', content: 'article' },
  ],
}))

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

async function copyText(text: string, event: Event) {
  const btn = event.currentTarget as HTMLButtonElement
  const original = btn.textContent
  try {
    await navigator.clipboard.writeText(text)
    btn.textContent = t.value.codexHelp.copy.success
  } catch {
    btn.textContent = t.value.codexHelp.copy.fail
  }
  setTimeout(() => { btn.textContent = original }, 1400)
}
</script>

<style scoped>
.codex-page {
  min-height: 100vh;
  color: #172027;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  line-height: 1.72;
  background: #f5f7fa;
}

a {
  color: #0d5c8f;
  overflow-wrap: anywhere;
  text-underline-offset: 4px;
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid #dce4eb;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
}

.topbar,
.hero,
.jumpbar,
.guide {
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
}

.topbar {
  min-height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #172027;
  font-size: 18px;
  font-weight: 900;
  text-decoration: none;
  white-space: nowrap;
}

.brand img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.nav {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav::-webkit-scrollbar {
  display: none;
}

.nav a,
.jumpbar a {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 8px;
  color: #3f4d58;
  text-decoration: none;
  white-space: nowrap;
}

.nav a:hover,
.jumpbar a:hover {
  background: #e8f2fb;
  color: #0d5c8f;
}

.hero {
  padding: 58px 0 26px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #a5481d;
  font-size: 14px;
  font-weight: 900;
}

h1 {
  max-width: 980px;
  margin: 0;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.1;
  letter-spacing: 0;
}

.hero-copy {
  max-width: 980px;
  margin: 18px 0 0;
  color: #4d5c67;
  font-size: 18px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid #0d5c8f;
  border-radius: 8px;
  color: #fff;
  background: #0d5c8f;
  font-weight: 800;
  text-decoration: none;
}

.button.secondary {
  color: #0d5c8f;
  background: #fff;
}

.jumpbar {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
  padding: 10px;
  overflow-x: auto;
  border: 1px solid #dce4eb;
  border-radius: 8px;
  background: #fff;
}

.guide {
  display: grid;
  gap: 22px;
  padding-bottom: 72px;
}

.guide-section {
  scroll-margin-top: 86px;
  padding: clamp(22px, 3vw, 36px);
  border: 1px solid #dce4eb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(23, 32, 39, 0.04);
}

.section-head {
  display: grid;
  gap: 6px;
  margin-bottom: 18px;
}

.section-kicker {
  color: #0d5c8f;
  font-size: 13px;
  font-weight: 900;
}

.section-head h2 {
  margin: 0;
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.18;
  letter-spacing: 0;
}

.lead {
  max-width: 960px;
  color: #52616d;
  font-size: 17px;
}

.step-block {
  scroll-margin-top: 86px;
  margin-top: 28px;
  padding-top: 26px;
  border-top: 1px solid #e2e8ef;
}

.step-block h3 {
  margin: 0 0 8px;
  font-size: 22px;
  line-height: 1.28;
}

.step-block p {
  margin: 0;
  color: #52616d;
}

.link-list,
.steps {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 22px;
}

.steps li::marker {
  color: #0d5c8f;
  font-weight: 900;
}

.command-group {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.command {
  display: grid;
  grid-template-columns: minmax(150px, 210px) minmax(0, 1fr) auto;
  align-items: stretch;
  margin-top: 12px;
  overflow: hidden;
  border: 1px solid #243746;
  border-radius: 8px;
  background: #152430;
}

.command span {
  display: flex;
  align-items: center;
  padding: 0 14px;
  color: #a9c5d8;
  border-right: 1px solid #2d4352;
  font-size: 13px;
  font-weight: 800;
}

.command code {
  padding: 14px;
  overflow-x: auto;
  color: #f4fbff;
  font-family: Consolas, "SFMono-Regular", Menlo, monospace;
  font-size: 14px;
  white-space: nowrap;
}

.command button {
  min-width: 76px;
  border: 0;
  border-left: 1px solid #2d4352;
  color: #fff;
  background: #223847;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.command button:hover {
  background: #0d5c8f;
}

.media-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-top: 20px;
}

.screenshot,
.video-figure,
.qr-figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid #cfd9e2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 14px 32px rgba(23, 32, 39, 0.08);
}

.screenshot img {
  width: 100%;
  max-height: none;
  object-fit: contain;
  background: #fff;
}

.video-figure video {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #101820;
}

figcaption {
  padding: 12px 14px;
  border-top: 1px solid #dce4eb;
  color: #4d5c67;
  background: #f8fafc;
  font-size: 14px;
}

.qr-figure {
  width: min(420px, 100%);
  margin: 20px auto 0;
}

.qr-figure img {
  width: 100%;
  padding: 16px;
}

.footer {
  padding: 24px 16px;
  border-top: 1px solid #dce4eb;
  color: #62717d;
  background: #fff;
  font-size: 14px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  max-width: 1280px;
  margin: 0 auto;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #111b24;
  font-size: 21px;
  font-weight: 900;
}

.footer-brand img {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: cover;
}

.footer-copy {
  color: #83909c;
  font-size: 13px;
  text-align: center;
  white-space: nowrap;
}

.footer-text {
  justify-self: end;
  text-align: right;
}

@media (max-width: 760px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
    padding: 12px 0;
  }

  .hero {
    padding-top: 36px;
  }

  .hero-copy,
  .lead {
    font-size: 16px;
  }

  .hero-actions {
    display: grid;
  }

  .button,
  .button.secondary {
    width: 100%;
  }

  .command {
    grid-template-columns: 1fr;
  }

  .command span,
  .command button {
    min-height: 40px;
    border-left: 0;
    border-right: 0;
    border-top: 1px solid #2d4352;
  }

  .command span {
    border-top: 0;
  }
}

@media (max-width: 520px) {
  .topbar,
  .hero,
  .jumpbar,
  .guide {
    width: min(100% - 24px, 1280px);
  }

  .guide-section {
    padding: 18px;
  }

  .footer-inner {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .footer-text {
    justify-self: center;
    text-align: center;
  }
}
</style>
