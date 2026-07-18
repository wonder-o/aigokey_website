<template>
  <div class="page overflow-hidden">
    <SiteHeader @trial="goTrial" />
    <main>
      <section class="py-[72px] px-6 bg-white max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <div><div class="text-blue text-[13px] font-black uppercase tracking-[.12em]">{{ copy.list.eyebrow }}</div><h2 class="max-w-[760px] mt-3 text-[clamp(30px,4vw,48px)] leading-[1.12] font-black">{{ copy.list.title }}</h2></div>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ copy.list.summary }}</p>
          </div>
          <div class="flex items-center justify-between gap-5 mb-7 pb-4 border-b border-line max-[720px]:items-stretch max-[720px]:flex-col">
            <div class="flex items-center gap-2 flex-wrap" role="tablist" :aria-label="copy.list.filterLabel">
              <button v-for="filter in filters" :key="filter.key" type="button" class="min-h-[34px] px-3.5 border rounded-full text-[13px] font-extrabold cursor-pointer" :class="activeFilter === filter.key ? 'border-blue bg-blue text-white' : 'border-line bg-white text-[#35495a]'" @click="activeFilter = filter.key">{{ filter.label }}</button>
            </div>
            <label class="flex items-center gap-2 w-[250px] min-h-[38px] px-3 border border-line rounded-lg text-muted bg-[#fbfdff] max-[720px]:w-full"><Search :size="16" /><span class="sr-only">{{ copy.list.searchLabel }}</span><input v-model="searchQuery" type="search" :placeholder="copy.list.searchPlaceholder" class="w-full border-0 outline-0 bg-transparent text-[13px]" /></label>
          </div>
          <div class="grid grid-cols-3 gap-4 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="article in filteredArticles" :key="article.slug" class="group grid content-start min-h-[310px] p-6 border border-line rounded-lg bg-[#fbfdff] transition-all duration-200 hover:-translate-y-1 hover:border-blue/35 hover:shadow-[0_18px_42px_rgba(36,104,242,0.12)]">
              <div class="flex items-center justify-between gap-3 text-[12px] font-black"><span class="inline-flex items-center gap-1.5 text-blue"><Tag :size="14" /> {{ article.category }}</span><span class="text-muted">{{ article.date }}</span></div>
              <h3 class="mt-5 text-[23px] leading-[1.25] font-black">{{ article.title }}</h3>
              <p class="mt-3 text-muted text-[14px] leading-[1.72]">{{ article.summary }}</p>
              <div class="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-line text-[12px] font-extrabold"><span class="text-muted">{{ article.readTime }} {{ copy.list.minutes }}</span><router-link class="inline-flex items-center gap-1.5 text-blue" :to="`/blog/${article.slug}`">{{ copy.list.read }} <ArrowRight :size="15" /></router-link></div>
            </article>
          </div>
          <div v-if="filteredArticles.length === 0" class="py-14 text-center text-muted">{{ copy.list.empty }}</div>
        </div>
      </section>

    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, Search, Tag } from '@lucide/vue'
import { useRouter } from 'vue-router'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { blogIndex, getBlogArticle } from '@/data/blog'
import { useI18n } from '@/composables/useI18n'

const router = useRouter()
const { lang } = useI18n()
const activeFilter = ref('all')
const searchQuery = ref('')
const copyByLang = {
  zh: { list: { eyebrow: 'Agent 应用观察', title: '每天一篇，真正拿去用', summary: '不做新闻搬运。每篇都回答：发生了什么、为什么重要、今天怎么试。', filterLabel: '按主题筛选', searchLabel: '搜索文章', searchPlaceholder: '搜索标题、主题或关键词', minutes: '分钟', read: '阅读文章', empty: '没有匹配文章，换个关键词试试。' } },
  en: { list: { eyebrow: 'Agent field notes', title: 'One article a day, made useful', summary: 'No news dumping. Every piece answers what changed, why it matters, and what to try now.', filterLabel: 'Filter by topic', searchLabel: 'Search articles', searchPlaceholder: 'Search title, topic, or keyword', minutes: 'min', read: 'Read article', empty: 'No matching articles. Try another keyword.' } },
} as const
const copy = computed(() => lang.value === 'en' ? copyByLang.en : copyByLang.zh)
const displayArticles = computed(() => blogIndex.map((article) => getBlogArticle(article.slug, lang.value === 'en' ? 'en' : 'zh-CN') || article))
const filters = computed(() => [{ key: 'all', label: lang.value === 'en' ? 'All' : '全部' }, ...Array.from(new Set(displayArticles.value.map((article) => article.category))).map((key) => ({ key, label: key }))])
const filteredArticles = computed(() => { const query = searchQuery.value.trim().toLowerCase(); return displayArticles.value.filter((article) => (activeFilter.value === 'all' || article.category === activeFilter.value) && (!query || `${article.title} ${article.summary} ${article.tags.join(' ')}`.toLowerCase().includes(query))) })
watch(lang, () => { activeFilter.value = 'all' })
function goTrial() { router.push('/free-trial') }
useHead(() => ({ title: lang.value === 'en' ? 'Agent Dispatch | AigoKey' : 'Agent 连载 | AigoKey', meta: [{ name: 'description', content: copy.value.list.summary }] }))
</script>
