<template>
  <header class="site-header">
    <div class="header-shell">
      <router-link to="/" class="brand" aria-label="AIGOKEY">
        <img src="/assets/aigokey-logo.png" alt="AIGOKEY" />
      </router-link>

      <nav class="primary-nav" :class="{ 'has-open-popover': imageMenuOpen || docsMenuOpen || enterpriseMenuOpen || aboutMenuOpen || downloadMenuOpen || modelMenuOpen }" aria-label="Primary navigation">
        <div class="image-menu" @mouseenter="imageMenuOpen = true" @mouseleave="imageMenuOpen = false" @focusout="closeImageMenu" @keydown.esc="imageMenuOpen = false">
          <button class="nav-image-trigger" :class="{ 'is-active': imageMenuOpen || isImageSectionActive }" type="button" :aria-expanded="imageMenuOpen" aria-haspopup="menu" aria-controls="image-menu" @click="imageMenuOpen = !imageMenuOpen">
            {{ t.navButtons.imageCreation }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="image-panel">
            <div v-show="imageMenuOpen" id="image-menu" class="image-popover" role="menu">
              <router-link class="download-option image-option image-option--creation" to="/image-generation-config/" role="menuitem" @click="imageMenuOpen = false">
                <span class="download-option-icon"><Images :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.imageConfig }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option image-option--skill" to="/image-creation/" role="menuitem" @click="imageMenuOpen = false">
                <span class="download-option-icon"><WandSparkles :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.imageSkill }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option image-option--video" to="/agk-video/" role="menuitem" @click="imageMenuOpen = false">
                <span class="download-option-icon"><Clapperboard :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.agkVideo }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option image-option--prompts" to="/image-prompts/" role="menuitem" @click="imageMenuOpen = false">
                <span class="download-option-icon"><BookOpen :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.promptLibrary }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
            </div>
          </Transition>
        </div>
        <div class="image-menu docs-menu" @mouseenter="docsMenuOpen = true" @mouseleave="docsMenuOpen = false" @focusout="closeDocsMenu" @keydown.esc="docsMenuOpen = false">
          <button class="nav-image-trigger" :class="{ 'is-active': docsMenuOpen || isDocsSectionActive }" type="button" :aria-expanded="docsMenuOpen" aria-haspopup="menu" aria-controls="docs-menu" @click="docsMenuOpen = !docsMenuOpen">
            {{ t.navButtons.help }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="image-panel">
            <div v-show="docsMenuOpen" id="docs-menu" class="image-popover docs-popover" role="menu">
              <router-link class="download-option image-option docs-option--guide" to="/codex-help/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><img src="/assets/brand-logos/openai.svg" alt="" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.codexGuide }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option docs-option--claude" to="/claude-code-config/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><img src="/assets/brand-logos/claude-code.png" alt="" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.claudeCodeConfig || 'Claude Code配置' }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option docs-option--harness" to="/deepseek-harness/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><img src="/assets/brand-logos/deepseek.svg" alt="" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.deepseekHarness }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option docs-option--pi" to="/pi-config/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><img src="/assets/brand-logos/pi.svg" alt="" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.piConfig || 'Pi配置' }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option docs-option--workbuddy" to="/workbuddy-config/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><img src="/assets/brand-logos/workbuddy.svg" alt="" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.workBuddyConfig }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option docs-option--trae" to="/trae-config/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><img src="/assets/brand-logos/trae.png" alt="" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.traeConfig }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option workflow-option--workflows" to="/workflows/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><Workflow :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.workflowCases }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option workflow-option--skills" to="/skills/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><Layers3 :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.skillsRadar }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option docs-option--api" to="/api-docs/" role="menuitem" @click="docsMenuOpen = false">
                <span class="download-option-icon"><BookOpen :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>AIGOKEY API 文档</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
            </div>
          </Transition>
        </div>
        <div class="image-menu model-menu" @mouseenter="modelMenuOpen = true" @mouseleave="modelMenuOpen = false" @focusout="closeModelMenu" @keydown.esc="modelMenuOpen = false">
          <button class="nav-image-trigger" :class="{ 'is-active': modelMenuOpen || isModelSectionActive }" type="button" :aria-expanded="modelMenuOpen" aria-haspopup="menu" aria-controls="model-menu" @click="modelMenuOpen = !modelMenuOpen">
            {{ t.navButtons.modelServices }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="image-panel">
            <div v-show="modelMenuOpen" id="model-menu" class="image-popover model-popover" role="menu">
              <router-link v-for="item in modelItems" :key="item.slug" class="download-option image-option" :class="`model-option--${item.slug}`" :to="`/models/${item.slug}/`" role="menuitem" @click="modelMenuOpen = false">
                <span class="download-option-icon"><img :src="item.logo" :alt="`${item.label} logo`" /></span>
                <span class="download-option-copy"><strong>{{ item.label }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
            </div>
          </Transition>
        </div>
        <div class="download-menu" @mouseenter="downloadMenuOpen = true" @mouseleave="downloadMenuOpen = false" @focusin="downloadMenuOpen = true" @focusout="closeDownloadMenu" @keydown.esc="downloadMenuOpen = false">
          <button class="nav-download-trigger" type="button" :aria-expanded="downloadMenuOpen" aria-controls="download-menu" @click="downloadMenuOpen = !downloadMenuOpen">
            {{ t.navButtons.download }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="download-panel">
            <div v-show="downloadMenuOpen" id="download-menu" class="download-popover" role="menu">
              <div class="download-popover-head">
                <span>{{ t.navButtons.downloadPanel }}</span>
                <i aria-hidden="true"></i>
              </div>
              <a class="download-option download-option--codex" href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon"><img src="/assets/brand-logos/openai.svg" alt="" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadCodex }}</strong>
                  <small>{{ t.navButtons.downloadCodexMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
              <a class="download-option download-option--harness" href="https://www.deepseek.com/harness/" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon"><img src="/assets/brand-logos/deepseek.svg" alt="" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadHarness }}</strong>
                  <small>{{ t.navButtons.downloadHarnessMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
              <a class="download-option download-option--workbuddy" href="https://www.workbuddy.cn/" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon"><img src="/assets/brand-logos/workbuddy.svg" alt="" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadWorkBuddy }}</strong>
                  <small>{{ t.navButtons.downloadWorkBuddyMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
              <a class="download-option download-option--switch" href="https://ccswitch.io/" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon"><img src="/assets/brand-logos/ccswitch.png" alt="" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadCcSwitch }}</strong>
                  <small>{{ t.navButtons.downloadCcSwitchMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
              <a class="download-option download-option--trae" href="https://www.trae.cn/" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon download-option-icon--trae"><img src="/assets/brand-logos/trae.png" alt="" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadTrae }}</strong>
                  <small>{{ t.navButtons.downloadTraeMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
              <a class="download-option download-option--claude-code" href="https://claude.com/product/claude-code" target="_blank" rel="noopener" role="menuitem">
                <span class="download-option-icon download-option-icon--claude-code"><img src="/assets/brand-logos/claude-code.png" alt="" /></span>
                <span class="download-option-copy">
                  <strong>{{ t.navButtons.downloadClaudeCode }}</strong>
                  <small>{{ t.navButtons.downloadClaudeCodeMeta }}</small>
                </span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </a>
            </div>
          </Transition>
        </div>
        <div class="image-menu enterprise-menu" @mouseenter="enterpriseMenuOpen = true" @mouseleave="enterpriseMenuOpen = false" @focusout="closeEnterpriseMenu" @keydown.esc="enterpriseMenuOpen = false">
          <button class="nav-image-trigger" :class="{ 'is-active': enterpriseMenuOpen || isEnterpriseSectionActive }" type="button" :aria-expanded="enterpriseMenuOpen" aria-haspopup="menu" aria-controls="enterprise-menu" @click="enterpriseMenuOpen = !enterpriseMenuOpen">
            {{ t.navButtons.enterpriseGroup }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="image-panel">
            <div v-show="enterpriseMenuOpen" id="enterprise-menu" class="image-popover" role="menu">
              <router-link class="download-option image-option enterprise-option--fde" to="/enterprise-service/" role="menuitem" @click="enterpriseMenuOpen = false">
                <span class="download-option-icon"><Building2 :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.enterprise }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
              <router-link class="download-option image-option enterprise-option--volcengine" to="/volcengine-partner/" role="menuitem" @click="enterpriseMenuOpen = false">
                <span class="download-option-icon"><Cloud :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.volcengine }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
            </div>
          </Transition>
        </div>
        <div class="image-menu about-menu" @mouseenter="aboutMenuOpen = true" @mouseleave="aboutMenuOpen = false" @focusout="closeAboutMenu" @keydown.esc="aboutMenuOpen = false">
          <button class="nav-image-trigger" :class="{ 'is-active': aboutMenuOpen || isAboutSectionActive }" type="button" :aria-expanded="aboutMenuOpen" aria-haspopup="menu" aria-controls="about-menu" @click="aboutMenuOpen = !aboutMenuOpen">
            {{ t.navButtons.aboutGroup }}
            <ChevronDown :size="14" aria-hidden="true" />
          </button>
          <Transition name="image-panel">
            <div v-show="aboutMenuOpen" id="about-menu" class="image-popover about-popover" role="menu">
              <router-link class="download-option image-option about-option--blog" to="/incentive-plans/" role="menuitem" @click="aboutMenuOpen = false">
                <span class="download-option-icon"><BookOpen :size="19" aria-hidden="true" /></span>
                <span class="download-option-copy"><strong>{{ t.navButtons.studentSupport }}</strong></span>
                <span class="download-option-arrow"><ArrowUpRight :size="15" aria-hidden="true" /></span>
              </router-link>
            </div>
          </Transition>
        </div>
      </nav>

      <div class="header-actions">
        <LanguageMenu />
        <a class="auth-link register-link" :href="registerUrl" target="_top">{{ t.navButtons.register }}</a>
        <a class="auth-link" :href="loginUrl" target="_top">{{ t.navButtons.login }}</a>
        <button class="trial-link" type="button" @click="$emit('trial')">
          <span>{{ t.navButtons.trial }}</span>
          <ArrowUpRight :size="15" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
  <div class="header-spacer" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { ArrowUpRight, BookOpen, Building2, ChevronDown, Clapperboard, Cloud, Images, Layers3, WandSparkles, Workflow, Info } from '@lucide/vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import LanguageMenu from '@/components/LanguageMenu.vue'
import { useI18n } from '@/composables/useI18n'
import { useHostUrl } from '@/composables/useHostUrl'

defineEmits<{ trial: [] }>()
const { t } = useI18n()
const { loginUrl, registerUrl } = useHostUrl()
const route = useRoute()
const imageMenuOpen = ref(false)
const docsMenuOpen = ref(false)
const enterpriseMenuOpen = ref(false)
const aboutMenuOpen = ref(false)
const downloadMenuOpen = ref(false)
const modelMenuOpen = ref(false)

const modelItems = [
  { slug: 'gpt', label: 'GPT', logo: '/assets/brand-logos/openai.svg' },
  { slug: 'image', label: 'Image', logo: '/assets/brand-logos/openai.svg' },
  { slug: 'deepseek', label: 'DeepSeek', logo: '/assets/brand-logos/deepseek.svg' },
  { slug: 'glm', label: 'GLM', logo: '/assets/brand-logos/zai.svg' },
  { slug: 'kimi', label: 'Kimi', logo: '/assets/brand-logos/kimi.svg' },
  { slug: 'claude', label: 'Claude', logo: '/assets/brand-logos/anthropic.svg' },
  { slug: 'seedance', label: 'Seedance', logo: '/assets/brand-logos/bytedance.svg' },
]

const isImageSectionActive = computed(() => route.path === '/image-prompts' || route.path.startsWith('/image-creation') || route.path.startsWith('/image-generation-config') || route.path.startsWith('/agk-video'))
const isDocsSectionActive = computed(() => route.path.startsWith('/codex-help') || route.path.startsWith('/deepseek-harness') || route.path.startsWith('/pi-config') || route.path.startsWith('/workbuddy-config') || route.path.startsWith('/claude-code-config') || route.path.startsWith('/trae-config') || route.path.startsWith('/workflows') || route.path.startsWith('/skills'))
const isEnterpriseSectionActive = computed(() => route.path.startsWith('/enterprise-service') || route.path.startsWith('/volcengine-partner'))
const isAboutSectionActive = computed(() => route.path.startsWith('/incentive-plans'))
const isModelSectionActive = computed(() => route.path.startsWith('/models/'))

function closeImageMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    imageMenuOpen.value = false
  }
}

function closeDocsMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    docsMenuOpen.value = false
  }
}

function closeEnterpriseMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    enterpriseMenuOpen.value = false
  }
}

function closeAboutMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    aboutMenuOpen.value = false
  }
}

function closeDownloadMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    downloadMenuOpen.value = false
  }
}

function closeModelMenu(event: FocusEvent) {
  const menu = event.currentTarget as HTMLElement
  if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) {
    modelMenuOpen.value = false
  }
}
</script>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  min-height: 76px;
  overflow: visible;
  border-bottom: 1px solid rgba(74, 132, 191, 0.2);
  color: #1b3448;
  background: #ffffff;
  box-shadow: 0 10px 32px rgba(38, 83, 122, 0.1);
}

.header-shell {
  position: relative;
  width: min(1240px, calc(100% - 48px));
  min-height: 76px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 30px;
}

.brand { display: inline-flex; align-items: center; white-space: nowrap; }
.brand img { display: block; width: 154px; height: auto; object-fit: contain; }

.primary-nav { display: flex; justify-content: center; gap: clamp(15px, 2vw, 28px); height: 76px; }
.primary-nav > .image-menu, .primary-nav > .download-menu { flex: 0 0 auto; }
.primary-nav a, .nav-download-trigger, .nav-image-trigger { position: relative; display: inline-flex; align-items: center; color: #5d7385; font: inherit; font-size: 14px; font-weight: 760; transition: color 0.2s ease; }
.primary-nav a::after, .nav-download-trigger::after, .nav-image-trigger::after { position: absolute; right: 0; bottom: 0; left: 0; height: 2px; background: #47b9ff; box-shadow: 0 0 12px rgba(71,185,255,.85); content: ''; transform: scaleX(0); transition: transform 0.2s ease; }
.primary-nav a:hover, .primary-nav a.router-link-active, .nav-download-trigger:hover, .download-menu:focus-within .nav-download-trigger, .nav-image-trigger:hover, .nav-image-trigger.is-active, .image-menu:focus-within .nav-image-trigger { color: #142a3c; }.primary-nav a:hover::after, .primary-nav a.router-link-active::after, .nav-download-trigger:hover::after, .download-menu:focus-within .nav-download-trigger::after, .nav-image-trigger:hover::after, .nav-image-trigger.is-active::after, .image-menu:focus-within .nav-image-trigger::after { transform: scaleX(1); }
.image-menu { position: relative; display: flex; align-items: stretch; }.nav-image-trigger { gap: 4px; padding: 0; border: 0; background: transparent; cursor: pointer; }.nav-image-trigger svg { transition: transform .24s ease; }.image-menu:hover .nav-image-trigger svg, .image-menu:focus-within .nav-image-trigger svg { transform: rotate(180deg); }
.image-popover { position: absolute; top: calc(100% + 10px); left: 50%; z-index: 90; display: grid; width: 248px; gap: 5px; padding: 8px; border: 1px solid rgba(71,132,196,.28); border-radius: 8px; background: linear-gradient(145deg, #ffffff 0%, #f1f8fe 100%); box-shadow: 0 24px 52px rgba(32,77,119,.22), 0 2px 8px rgba(32,77,119,.08); transform: translateX(-50%); }.image-popover::before { position: absolute; top: -6px; left: calc(50% - 6px); width: 11px; height: 11px; border-top: 1px solid rgba(71,132,196,.28); border-left: 1px solid rgba(71,132,196,.28); background: #ffffff; content: ''; transform: rotate(45deg); }.image-option--creation::before, .workflow-option--workflows::before { background: #1b84d7; }.image-option--skill::before, .workflow-option--skills::before { background: #16866e; }.image-option--skill .download-option-icon, .workflow-option--skills .download-option-icon { border-color: rgba(22,134,110,.22); background: #e8f7f2; color: #14745f; }.image-option--prompts::before { background: #8e63d9; }.image-option--prompts .download-option-icon { border-color: rgba(142,99,217,.22); background: #f3edff; color: #7650c3; }.enterprise-option--fde::before { background: #8e63d9; }.enterprise-option--fde .download-option-icon { border-color: rgba(142,99,217,.22); background: #f3edff; color: #7650c3; }.enterprise-option--volcengine::before { background: #ef6b31; }.enterprise-option--volcengine .download-option-icon { border-color: rgba(239,107,49,.22); background: #fff1e9; color: #d65a22; }
.docs-option--workbuddy::before { background: #17aa88; }
.image-option--video::before { background: #db6248; }
.image-option--video .download-option-icon { border-color: rgba(219,98,72,.22); background: #fff0eb; color: #bd4f31; }
.docs-option--workbuddy .download-option-icon { border-color: rgba(23,170,136,.22); background: #eaf8f4; }
.docs-option--workbuddy .download-option-icon img { width: 25px; height: 25px; }
.docs-option--trae::before { background: #5b5ce2; }
.docs-option--trae .download-option-icon { border-color: rgba(91,92,226,.22); background: #eef0ff; }
.docs-option--trae .download-option-icon img { width: 26px; height: 26px; }
.docs-option--claude::before { background: #d97757; }
.docs-option--claude .download-option-icon { border-color: rgba(217,119,87,.24); background: #fff1eb; }
.docs-option--claude .download-option-icon img { width: 25px; height: 25px; }
.docs-option--pi::before { background: #7a5ac7; }
.docs-option--pi .download-option-icon { border-color: rgba(122,90,199,.24); background: #f3efff; }
.docs-option--pi .download-option-icon img { width: 25px; height: 25px; }
.docs-option--harness .download-option-icon img { width: 25px; height: 25px; }
.download-menu { position: relative; display: flex; align-items: stretch; }.nav-download-trigger { gap: 4px; padding: 0; border: 0; background: transparent; cursor: pointer; }.nav-download-trigger svg { transition: transform .24s ease; }.download-menu:hover .nav-download-trigger svg, .download-menu:focus-within .nav-download-trigger svg { transform: rotate(180deg); }.download-option--harness::before { background:#2386d8; }.download-option--harness .download-option-icon { border-color:rgba(35,134,216,.22); background:#eaf4ff; color:#1c73ba; }.download-option--workbuddy::before { background:#6d62c7; }.download-option--workbuddy .download-option-icon { border-color:rgba(109,98,199,.22); background:#f0efff; color:#5d52b9; }.download-option--trae::before { background:#5b5ce2; }.download-option--trae .download-option-icon--trae { border-color:rgba(91,92,226,.22); background:#eef0ff; }.download-option--trae .download-option-icon--trae img { width: 26px; height: 26px; }.download-option--claude-code::before { background:#d97757; }.download-option--claude-code .download-option-icon--claude-code { border-color:rgba(217,119,87,.24); background:#fff1eb; }.download-option--claude-code .download-option-icon--claude-code img { width: 25px; height: 25px; }
.model-option--gpt::before { background:#176fc1; }.model-option--image::before { background:#a254c7; }.model-option--deepseek::before { background:#2474d8; }.model-option--glm::before { background:#e5723e; }.model-option--kimi::before { background:#199d8a; }.model-option--claude::before { background:#c47745; }.model-option--seedance::before { background:#d14e69; }.model-option--image .download-option-icon { border-color:rgba(162,84,199,.2); background:#f7effc; color:#a254c7; }.model-option--deepseek .download-option-icon { border-color:rgba(36,116,216,.2); background:#eaf3ff; color:#2474d8; }.model-option--glm .download-option-icon { border-color:rgba(229,114,62,.2); background:#fff1e9; color:#d86432; }.model-option--kimi .download-option-icon { border-color:rgba(25,157,138,.2); background:#e8f8f4; color:#199d8a; }.model-option--claude .download-option-icon { border-color:rgba(196,119,69,.22); background:#fff3ea; color:#b56638; }.model-option--seedance .download-option-icon { border-color:rgba(209,78,105,.2); background:#fff0f3; color:#d14e69; }.model-popover { width:260px; }
.download-popover { position: absolute; top: calc(100% + 10px); left: 50%; z-index: 90; display: grid; width: 304px; gap: 5px; padding: 8px; border: 1px solid rgba(71,132,196,.28); border-radius: 8px; background: linear-gradient(145deg, #ffffff 0%, #f1f8fe 100%); box-shadow: 0 24px 52px rgba(32,77,119,.22), 0 2px 8px rgba(32,77,119,.08); transform: translateX(-50%); }.download-popover::before { position: absolute; top: -6px; left: calc(50% - 6px); width: 11px; height: 11px; border-top: 1px solid rgba(71,132,196,.28); border-left: 1px solid rgba(71,132,196,.28); background: #ffffff; content: ''; transform: rotate(45deg); }.download-popover-head { display: flex; align-items: center; justify-content: space-between; min-height: 29px; padding: 0 5px 2px 7px; color: #527289; font-size: 10px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }.download-popover-head i { width: 7px; height: 7px; border-radius: 50%; background: #24bd78; box-shadow: 0 0 0 4px rgba(36,189,120,.13); }
.download-option { position: relative; display: grid; grid-template-columns: 40px minmax(0, 1fr) 26px; align-items: center; gap: 10px; min-height: 66px; padding: 8px; border-radius: 6px; color: #1d3b50; overflow: hidden; transition: transform .22s ease, background .22s ease, box-shadow .22s ease; }.download-option::after { display: none; }.download-option::before { position: absolute; top: 14px; bottom: 14px; left: 0; width: 2px; border-radius: 2px; content: ''; transform: scaleY(.4); transition: transform .22s ease; }.download-option--codex::before { background: #1b84d7; }.download-option--switch::before { background: #f28442; }.download-option:hover, .download-option:focus-visible { color: #142a3c; background: rgba(255,255,255,.9); box-shadow: 0 8px 18px rgba(44,99,137,.12); outline: none; transform: translateX(3px); }.download-option:hover::before, .download-option:focus-visible::before { transform: scaleY(1); }.download-option-icon { display: grid; width: 40px; height: 40px; place-items: center; border: 1px solid rgba(47,123,186,.18); border-radius: 6px; background: #e8f5ff; color: #1677c4; transition: transform .22s ease, background .22s ease; }.download-option-icon img { display: block; width: 23px; height: 23px; object-fit: contain; }.download-option--switch .download-option-icon { border-color: rgba(238,131,67,.22); background: #fff2e9; color: #d96721; }.download-option:hover .download-option-icon, .download-option:focus-visible .download-option-icon { transform: scale(1.07) rotate(-4deg); }.download-option-copy { display: grid; min-width: 0; gap: 3px; }.download-option-copy strong { overflow: hidden; color: inherit; font-size: 13px; font-weight: 850; text-overflow: ellipsis; white-space: nowrap; }.download-option-copy small { color: #718a9b; font-size: 11px; font-weight: 650; }.download-option-arrow { display: grid; width: 26px; height: 26px; place-items: center; border-radius: 50%; color: #6f91aa; background: rgba(77,143,199,.09); transition: color .22s ease, background .22s ease, transform .22s ease; }.download-option:hover .download-option-arrow, .download-option:focus-visible .download-option-arrow { color: #ffffff; background: #2180d6; transform: translate(2px, -2px); }.download-panel-enter-active, .download-panel-leave-active { transition: opacity .18s ease, transform .18s ease; }.download-panel-enter-from, .download-panel-leave-to { opacity: 0; transform: translateY(-8px); }

.image-panel-enter-active, .image-panel-leave-active { transition: opacity .18s ease, transform .18s ease; }.image-panel-enter-from, .image-panel-leave-to { opacity: 0; transform: translateY(-8px); }

.header-actions { display: flex; align-items: center; gap: 16px; }.auth-link { color: #5d7385; font-size: 13px; font-weight: 760; transition: color .2s ease; }.auth-link:hover { color: #142a3c; }.trial-link { min-height: 34px; display: inline-flex; align-items: center; gap: 7px; padding: 0; border: 0; color: #1769c2; background: transparent; font: inherit; font-size: 13px; font-weight: 850; cursor: pointer; }.trial-link::before { width: 1px; height: 17px; margin-right: 2px; background: rgba(69,125,177,.22); content: ''; }.trial-link:hover { color: #0f4f97; }.trial-link svg { transition: transform .2s ease; }.trial-link:hover svg { transform: translate(2px, -2px); }

.header-spacer { height: 76px; }
:deep(.language-trigger) { min-height: auto; min-width: 0; padding: 0; border: 0; border-radius: 0; color: #5d7385; background: transparent; box-shadow: none; font-size: 13px; font-weight: 760; }
:deep(.language-trigger:hover) { color: #142a3c; background: transparent; transform: none; }
:deep(.language-trigger svg) { width: 15px; height: 15px; }
:deep(.language-menu) { z-index: 80; }
:deep(.language-popover) { top: calc(100% + 16px); z-index: 90; border-color: rgba(71,132,196,.25); color: #142231; box-shadow: 0 18px 40px rgba(32,77,119,.2); }

@media (max-width: 1120px) { .header-shell { gap: 19px; }.primary-nav { gap: 15px; }.header-actions { gap: 12px; }.register-link { display: none; } }
@media (max-width: 820px) { .site-header { min-height: 118px; }.header-shell { width: min(100% - 32px, 1240px); min-height: 118px; grid-template-columns: 1fr auto; grid-template-rows: 58px 44px; gap: 0; }.brand img { width: 132px; }.primary-nav { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; gap: 20px; height: 44px; overflow-x: auto; scrollbar-width: none; }.primary-nav.has-open-popover { overflow: visible; }.primary-nav::-webkit-scrollbar { display: none; }.primary-nav a, .nav-download-trigger, .nav-image-trigger { flex: 0 0 auto; font-size: 13px; }.primary-nav a::after, .nav-download-trigger::after, .nav-image-trigger::after { bottom: 3px; }.download-popover { left: 0; width: min(304px, calc(100vw - 32px)); transform: none; }.download-popover::before { left: 18px; }.image-popover { left: 0; width: min(248px, calc(100vw - 32px)); transform: none; }.image-popover::before { left: 18px; }.header-actions { justify-content: flex-end; }.auth-link { display: none; }.trial-link::before { display: none; }.header-spacer { height: 118px; } }
@media (max-width: 440px) { .header-shell { width: min(100% - 24px, 1240px); }.brand img { width: 120px; }.trial-link span { display: none; }.trial-link { width: 30px; height: 30px; justify-content: center; border: 1px solid rgba(69,125,177,.3); border-radius: 5px; }.primary-nav { gap: 17px; } }
.docs-option--guide::before { background:#1b84d7; }.docs-option--guide .download-option-icon { border-color:rgba(27,132,215,.2); background:#e8f5ff; color:#176fc1; }.docs-popover { width:260px; }
.docs-option--guide .download-option-icon img { width:25px; height:25px; }
.docs-option--harness::before { background:#1b9a70; }.docs-option--harness .download-option-icon { border-color:rgba(27,154,112,.22); background:#e8f8f1; color:#16805c; }
.about-option--about::before { background:#8e63d9; }.about-option--about .download-option-icon { border-color:rgba(142,99,217,.22); background:#f3edff; color:#7650c3; }.about-option--blog::before { background:#1b84d7; }.about-option--blog .download-option-icon { border-color:rgba(27,132,215,.2); background:#e8f5ff; color:#176fc1; }.about-popover { width:248px; }
</style>
