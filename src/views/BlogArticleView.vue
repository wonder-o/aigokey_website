<template>
  <div class="page overflow-hidden">
    <SiteHeader @trial="goTrial" />
    <main v-if="article" class="article-page">
      <div class="article-progress" aria-hidden="true"><span :style="{ width: `${progress}%` }"></span></div>
      <section class="py-10 px-6 bg-[#f2f7fb] max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-muted" aria-label="Breadcrumb"><router-link to="/blog" class="text-blue font-extrabold">{{ copy.breadcrumb.blog }}</router-link><span>/</span><span>{{ article.category }}</span></nav>
          <div class="grid grid-cols-[minmax(0,1fr)_270px] gap-12 items-end mt-10 max-[900px]:grid-cols-1">
            <div>
              <div class="flex items-center gap-3 flex-wrap text-[13px] font-extrabold text-muted"><span class="inline-flex items-center min-h-[30px] px-2.5 rounded-full text-[#184ab7] bg-cyan">{{ article.category }}</span><span>{{ article.date }}</span><span>{{ article.readTime }} {{ copy.meta.minutes }}</span></div>
              <h1 class="max-w-[860px] mt-5 text-[clamp(32px,4vw,52px)] leading-[1.12] font-black">{{ article.title }}</h1>
              <p class="max-w-[760px] mt-5 text-[19px] leading-[1.78] text-muted">{{ article.summary }}</p>
            </div>
            <div class="p-5 border border-line rounded-lg bg-white shadow-[0_16px_42px_rgba(17,27,36,0.07)]"><div class="text-[12px] font-black text-blue uppercase tracking-[.12em]">{{ copy.meta.source }}</div><div v-for="source in article.sources" :key="source.url" class="mt-3"><a :href="source.url" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 text-[14px] font-black text-[#1d3144] hover:text-blue">{{ source.publisher }} <ExternalLink :size="14" /></a><div class="mt-1 text-[12px] leading-[1.5] text-muted">{{ source.title }}</div><div v-if="source.publishedAt" class="mt-1 text-[11px] text-muted">{{ source.publishedAt }}</div></div></div>
          </div>
        </div>
      </section>

      <section class="py-[68px] px-6 bg-white max-[720px]:px-4">
        <div class="grid grid-cols-[minmax(0,760px)_280px] gap-16 max-w-[1120px] mx-auto items-start max-[980px]:grid-cols-1">
          <div>
            <div class="article-lead"><strong>{{ copy.article.leadLabel }}</strong><span>{{ copy.article.leadText }}</span></div>
            <div class="article-visual" :class="`article-visual--${article.visual.type}`"><div class="text-blue text-[12px] font-black uppercase tracking-[.12em]">{{ copy.article.visualLabel }}</div><h2>{{ article.visual.title }}</h2><div class="visual-grid"><div v-for="(item, index) in article.visual.items" :key="item" class="visual-item"><span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ item }}</p></div></div></div>
            <div ref="articleContent" class="article-content" v-html="article.html"></div>
            <div class="article-source-note"><strong>{{ copy.article.editorNote }}</strong><p>{{ copy.article.editorText }}</p></div>
          </div>
          <aside class="article-sidebar">
            <div class="toc-panel"><div class="text-blue text-[12px] font-black uppercase tracking-[.12em]">{{ copy.article.toc }}</div><nav class="mt-4 grid gap-2" aria-label="Article outline"><a v-for="item in article.toc" :key="item.id" :href="`#${item.id}`" :class="item.level === 3 ? 'pl-4 text-[12px]' : 'text-[13px]'">{{ item.label }}</a></nav></div>
            <div class="mt-5 p-5 border border-line rounded-lg bg-[#fbfdff]"><div class="text-[12px] font-black text-muted uppercase tracking-[.12em]">{{ copy.article.tags }}</div><div class="flex flex-wrap gap-2 mt-3"><span v-for="tag in article.tags" :key="tag" class="inline-flex min-h-[28px] items-center px-2.5 rounded-full text-[12px] font-black text-[#184ab7] bg-cyan">{{ tag }}</span></div></div>
          </aside>
        </div>
      </section>

      <section class="py-[68px] px-6 bg-[#f2f7fb] max-[720px]:px-4"><div class="max-w-[1120px] mx-auto"><div class="flex items-end justify-between gap-6 mb-7 max-[720px]:flex-col max-[720px]:items-start"><div><div class="text-blue text-[12px] font-black uppercase tracking-[.12em]">{{ copy.related.eyebrow }}</div><h2 class="mt-3 text-[clamp(28px,3.5vw,44px)] leading-[1.12] font-black">{{ copy.related.title }}</h2></div><router-link class="btn btn-ghost" to="/blog">{{ copy.related.all }} <ArrowRight :size="16" /></router-link></div><div class="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1"><article v-for="item in related" :key="item.slug" class="p-5 border border-line rounded-lg bg-white"><span class="text-[12px] font-black text-blue">{{ item.category }}</span><h3 class="mt-3 text-[20px] leading-[1.3] font-black">{{ item.title }}</h3><p class="mt-2 text-muted text-[13px] leading-[1.65]">{{ item.summary }}</p><router-link class="inline-flex items-center gap-2 mt-5 text-blue text-[13px] font-black" :to="`/blog/${item.slug}`">{{ copy.related.read }} <ArrowRight :size="15" /></router-link></article></div></div></section>

      <section class="py-[42px] px-6 bg-white max-[720px]:px-4"><div class="flex items-stretch justify-between gap-4 max-w-[1120px] mx-auto max-[720px]:flex-col"><router-link v-if="adjacent.previous" class="article-nav-card" :to="`/blog/${adjacent.previous.slug}`"><span>{{ copy.nav.previous }}</span><strong>{{ adjacent.previous.title }}</strong></router-link><span v-else></span><router-link v-if="adjacent.next" class="article-nav-card article-nav-card--next" :to="`/blog/${adjacent.next.slug}`"><span>{{ copy.nav.next }}</span><strong>{{ adjacent.next.title }}</strong></router-link></div></section>
    </main>
    <section v-else class="py-32 px-6 bg-white"><div class="max-w-[720px] mx-auto text-center"><div class="text-blue text-[13px] font-black uppercase tracking-[.12em]">{{ copy.empty.eyebrow }}</div><h1 class="mt-4 text-[clamp(34px,5vw,58px)] font-black">{{ copy.empty.title }}</h1><p class="mt-4 text-muted leading-[1.75]">{{ copy.empty.text }}</p><router-link class="btn btn-primary mt-7" to="/blog">{{ copy.empty.action }}</router-link></div></section>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, ExternalLink } from '@lucide/vue'
import { useRoute, useRouter } from 'vue-router'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { getAdjacentArticles, getBlogArticle, getRelatedArticles } from '@/data/blog'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const router = useRouter()
const { lang } = useI18n()
const articleContent = ref<HTMLElement | null>(null)
const progress = ref(0)
const copyByLang = {
  zh: { breadcrumb: { blog: 'Agent 连载' }, meta: { minutes: '分钟阅读', source: '原始来源' }, article: { leadLabel: '编辑部导读', leadText: '本文从公开资料出发，补齐背景、判断和可执行步骤，适合边读边试。', visualLabel: '一眼看懂', toc: '文章目录', tags: '文章标签', actionLabel: '今天可以试', editorNote: '编辑说明', editorText: '本文是对公开来源的归纳与实践建议，不直接代表原作者立场。涉及产品能力、价格和实时信息时，请以官方最新页面为准。' }, related: { eyebrow: '继续阅读', title: '把一个方法带进下一个场景', all: '查看全部', read: '阅读' }, nav: { previous: '上一篇', next: '下一篇' }, empty: { eyebrow: 'Agent 连载', title: '这篇文章不存在', text: '文章可能尚未发布，或者链接中的 slug 已经变化。', action: '返回连载首页' } },
  en: { breadcrumb: { blog: 'Agent Dispatch' }, meta: { minutes: 'min read', source: 'Original source' }, article: { leadLabel: 'Editor\'s guide', leadText: 'We turn public signals into context, judgment, and steps you can run while reading.', visualLabel: 'At a glance', toc: 'In this article', tags: 'Tags', actionLabel: 'Try this today', editorNote: 'Editorial note', editorText: 'This is an editorial synthesis of public sources and practice notes. It does not represent the source authors. Check official pages for current product behavior, pricing, and live information.' }, related: { eyebrow: 'Keep reading', title: 'Carry the method into another context', all: 'All articles', read: 'Read' }, nav: { previous: 'Previous', next: 'Next' }, empty: { eyebrow: 'Agent Dispatch', title: 'Article not found', text: 'This article may not be published yet, or its slug may have changed.', action: 'Back to dispatch' } },
} as const
const copy = computed(() => lang.value === 'en' ? copyByLang.en : copyByLang.zh)
const slug = computed(() => String(route.params.slug || ''))
const article = computed(() => getBlogArticle(slug.value, lang.value === 'en' ? 'en' : 'zh-CN'))
const related = computed(() => getRelatedArticles(slug.value, lang.value === 'en' ? 'en' : 'zh-CN'))
const adjacent = computed(() => getAdjacentArticles(slug.value, lang.value === 'en' ? 'en' : 'zh-CN'))
function goTrial() { router.push('/free-trial') }
function updateProgress() { const root = articleContent.value; if (!root) return; const top = root.getBoundingClientRect().top + window.scrollY; const total = Math.max(root.scrollHeight - window.innerHeight, 1); progress.value = Math.min(100, Math.max(0, ((window.scrollY - top + 120) / total) * 100)) }
function decorateCodeBlocks() { const root = articleContent.value; if (!root) return; root.querySelectorAll('pre').forEach((pre) => { if (pre.querySelector('.copy-code')) return; const button = document.createElement('button'); button.type = 'button'; button.className = 'copy-code'; button.textContent = lang.value === 'en' ? 'Copy' : '复制'; button.addEventListener('click', async () => { const text = pre.querySelector('code')?.textContent || ''; try { await navigator.clipboard.writeText(text); button.textContent = lang.value === 'en' ? 'Copied' : '已复制'; setTimeout(() => { button.textContent = lang.value === 'en' ? 'Copy' : '复制' }, 1400) } catch { button.textContent = lang.value === 'en' ? 'Select manually' : '请手动选择' } }); pre.appendChild(button) }) }
function refreshArticle() { nextTick(() => { decorateCodeBlocks(); updateProgress() }) }
watch(article, refreshArticle)
onMounted(() => { window.addEventListener('scroll', updateProgress, { passive: true }); refreshArticle() })
onUnmounted(() => window.removeEventListener('scroll', updateProgress))
useHead(() => ({ title: article.value ? `${article.value.title} | AigoKey` : 'Agent 连载 | AigoKey', meta: [{ name: 'description', content: article.value?.summary || 'AigoKey Agent 连载' }, { property: 'og:title', content: article.value?.title || 'Agent 连载 | AigoKey' }, { property: 'og:description', content: article.value?.summary || '' }, { property: 'og:type', content: 'article' }] }))
</script>

<style scoped>
.article-progress { position: fixed; top: 0; left: 0; right: 0; z-index: 35; height: 3px; background: transparent; }
.article-progress span { display: block; height: 100%; background: var(--blue); transition: width .12s linear; }
.article-lead { display: grid; grid-template-columns: 118px 1fr; gap: 18px; padding: 17px 0; border-top: 2px solid var(--ink); border-bottom: 1px solid var(--line); color: var(--muted); font-size: 14px; line-height: 1.7; }
.article-lead strong { color: var(--blue-dark); font-size: 13px; }
.article-visual { margin: 30px 0 42px; padding: 24px; border: 1px solid rgba(36,104,242,.28); border-radius: 8px; background: linear-gradient(135deg, #f3f8ff, #ffffff); }
.article-visual h2 { margin: 10px 0 20px; color: var(--ink); font-size: 23px; line-height: 1.35; }
.visual-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.visual-item { display: grid; grid-template-columns: 30px 1fr; gap: 10px; align-items: start; min-height: 76px; padding: 13px; border: 1px solid var(--line); border-radius: 7px; background: #fff; }
.visual-item span { color: var(--blue); font-size: 12px; font-weight: 900; }
.visual-item p { margin: 0; color: #35495a; font-size: 13px; line-height: 1.55; }
.article-content { color: #263743; font-size: 16px; line-height: 1.95; }
.article-content :deep(h2) { position: relative; margin: 48px 0 16px; color: var(--ink); font-size: 30px; line-height: 1.25; scroll-margin-top: 92px; }
.article-content :deep(h3) { position: relative; margin: 34px 0 12px; color: var(--ink); font-size: 22px; line-height: 1.35; scroll-margin-top: 92px; }
.article-content :deep(p) { margin: 0 0 18px; }
.article-content :deep(ul), .article-content :deep(ol) { margin: 0 0 22px; padding-left: 24px; }
.article-content :deep(li) { margin: 6px 0; }
.article-content :deep(blockquote) { margin: 24px 0; padding: 16px 20px; border-left: 4px solid var(--green); color: #405866; background: #f1faee; }
.article-content :deep(a) { color: var(--blue-dark); text-decoration: underline; text-decoration-color: rgba(36,104,242,.35); text-underline-offset: 3px; }
.article-content :deep(pre) { position: relative; overflow-x: auto; margin: 24px 0; padding: 20px; border-radius: 8px; color: #edf5ff; background: var(--deep); box-shadow: 0 14px 30px rgba(19,34,49,.12); }
.article-content :deep(code) { font-family: "SFMono-Regular", Consolas, monospace; font-size: .88em; }
.article-content :deep(p code), .article-content :deep(li code) { padding: 2px 5px; border-radius: 4px; color: var(--blue-dark); background: var(--cyan); }
.article-content :deep(table) { width: 100%; margin: 24px 0; border-collapse: collapse; font-size: 14px; }
.article-content :deep(th), .article-content :deep(td) { padding: 10px 12px; border: 1px solid var(--line); text-align: left; vertical-align: top; }
.article-content :deep(th) { color: var(--ink); background: #f2f7fb; }
.article-content :deep(.copy-code) { position: absolute; top: 10px; right: 10px; min-height: 28px; padding: 0 9px; border: 1px solid rgba(255,255,255,.24); border-radius: 5px; color: #fff; background: rgba(255,255,255,.1); font-size: 11px; font-weight: 800; cursor: pointer; }
.article-actions { margin-top: 42px; padding: 24px; border-left: 4px solid var(--green); background: #f1faee; }
.article-actions strong { color: var(--green-dark); font-size: 13px; }
.article-actions ul { margin: 12px 0 0; padding-left: 20px; color: #36533a; font-size: 14px; line-height: 1.75; }
.article-source-note { margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; line-height: 1.7; }
.article-source-note p { margin: 8px 0 0; }
.article-sidebar { position: sticky; top: 96px; }
.toc-panel { padding: 20px; border: 1px solid var(--line); border-radius: 8px; background: #fbfdff; }
.toc-panel nav a { display: block; color: #5b6874; line-height: 1.5; }
.toc-panel nav a:hover { color: var(--blue); }
.article-nav-card { display: grid; gap: 6px; width: min(48%, 430px); padding: 18px 20px; border: 1px solid var(--line); border-radius: 8px; background: #fbfdff; }
.article-nav-card--next { text-align: right; }
.article-nav-card span { color: var(--blue); font-size: 12px; font-weight: 900; }
.article-nav-card strong { color: var(--ink); font-size: 16px; line-height: 1.4; }
@media (max-width: 720px) { .article-lead { grid-template-columns: 1fr; gap: 5px; } .visual-grid { grid-template-columns: 1fr; } .article-content { font-size: 15px; } .article-content :deep(h2) { font-size: 27px; } .article-sidebar { position: static; } .article-nav-card { width: 100%; } .article-nav-card--next { text-align: left; } }
</style>
