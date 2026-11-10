<template>
  <div class="subscription-page">
    <SiteHeader @trial="showModal = true" />
    <main>
      <section class="hero-section">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">{{ page.hero.eyebrow }}</p>
            <h1>{{ page.hero.title }}</h1>
            <p class="hero-text">{{ page.hero.text }}</p>
            <div class="hero-actions">
              <a class="action action-primary" href="#plan-selector">{{ page.hero.primary }}<ArrowDown :size="18" aria-hidden="true" /></a>
              <router-link class="action action-secondary" to="/enterprise-service/">{{ page.hero.secondary }}</router-link>
            </div>
          </div>
          <aside class="range-board" :aria-label="page.hero.boardLabel">
            <header><span>{{ page.hero.boardLabel }}</span><i><span></span>LIVE</i></header>
            <div class="range-labels" aria-hidden="true"><span>PERIOD</span><span>TIERS</span><span>PRICE</span><span>PLAN QUOTA</span></div>
            <div v-for="row in page.hero.boardRows" :key="row.period" class="range-row">
              <strong>{{ row.period }}</strong><span>{{ row.count }}</span><span>{{ row.price }}</span><b>{{ row.quota }}</b>
            </div>
            <footer><CheckCircle2 :size="17" aria-hidden="true" />{{ page.selector.included }}</footer>
          </aside>
        </div>
        <div class="hero-metrics">
          <div v-for="metric in page.hero.metrics" :key="metric.value"><strong>{{ metric.value }}</strong><span>{{ metric.label }}</span></div>
        </div>
      </section>

      <section id="plan-selector" class="section selector-section">
        <div class="shell">
          <div class="section-heading selector-heading">
            <div><p class="eyebrow">{{ page.selector.eyebrow }}</p><h2>{{ page.selector.title }}</h2></div>
            <p>{{ page.selector.text }}</p>
          </div>
          <div class="period-tabs" role="tablist" :aria-label="page.selector.tabLabel">
            <button v-for="plan in t.plans" :key="plan.id" type="button" role="tab" :aria-selected="activePeriod === plan.id" :class="{ active: activePeriod === plan.id }" @click="activePeriod = plan.id">
              <span>{{ plan.label }}</span><small>{{ plan.period }} · {{ plan.tiers.length }} {{ lang === 'en' ? 'tiers' : '档' }}</small>
            </button>
          </div>
          <div class="plan-ledger">
            <aside class="plan-context">
              <span>{{ activePlan.kicker }}</span><h3>{{ activePlan.label }}</h3><p>{{ activePlan.summary }}</p>
              <div class="context-meta"><CalendarRange :size="17" aria-hidden="true" /><strong>{{ activePlan.period }}</strong></div>
              <p class="context-note">{{ activePlan.note }}</p>
              <button class="action action-primary" type="button" @click="showModal = true">{{ page.selector.action }}<ArrowRight :size="17" aria-hidden="true" /></button>
            </aside>
            <div class="tier-table" role="tabpanel">
              <div class="tier-head" aria-hidden="true"><span>{{ page.selector.quota }}</span><span>{{ page.selector.total }}</span><span>{{ page.selector.price }}</span></div>
              <div v-for="(tier, index) in activePlan.tiers" :key="tier.quota" class="tier-row">
                <span class="tier-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="tier-quota"><small>{{ page.selector.quota }}</small><strong>{{ tier.quota }}</strong></div>
                <div class="tier-total"><small>{{ page.selector.total }}</small><span>{{ tier.total }}</span></div>
                <div class="tier-price"><span v-if="tier.badge">{{ tier.badge }}</span><strong>{{ tier.price }}</strong></div>
              </div>
              <footer><Layers3 :size="17" aria-hidden="true" /><span>{{ page.selector.included }}</span></footer>
            </div>
          </div>
        </div>
      </section>

      <section class="section guide-section">
        <div class="shell">
          <div class="section-heading guide-heading">
            <div><p class="eyebrow">{{ page.guide.eyebrow }}</p><h2>{{ page.guide.title }}</h2></div><p>{{ page.guide.text }}</p>
          </div>
          <div class="guide-grid">
            <article v-for="(item, index) in page.guide.items" :key="item.title">
              <header><span>0{{ index + 1 }}</span><i>{{ item.label }}</i></header><h3>{{ item.title }}</h3><p>{{ item.text }}</p><strong>{{ item.answer }}</strong>
            </article>
          </div>
          <div class="enterprise-rail">
            <span class="enterprise-icon"><Building2 :size="24" aria-hidden="true" /></span>
            <div class="enterprise-copy">
              <p>{{ page.enterprise.standardLabel }}<ArrowRight :size="15" aria-hidden="true" />{{ page.enterprise.customLabel }}</p>
              <h3>{{ t.enterprisePlan.title }}</h3><span>{{ t.enterprisePlan.text }}</span><small>{{ page.enterprise.note }}</small>
            </div>
            <div class="enterprise-tags"><span v-for="tag in t.enterprisePlan.tags" :key="tag">{{ tag }}</span></div>
            <router-link class="action action-secondary" to="/enterprise-service/">{{ t.enterprisePlan.action }}<ArrowRight :size="17" aria-hidden="true" /></router-link>
          </div>
        </div>
      </section>

      <section class="section process-section">
        <div class="shell process-grid">
          <div class="process-copy">
            <p class="eyebrow">{{ page.process.eyebrow }}</p><h2>{{ page.process.title }}</h2><p>{{ page.process.text }}</p>
            <ol><li v-for="(step, index) in page.process.steps" :key="step.title"><span>0{{ index + 1 }}</span><div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div></li></ol>
          </div>
          <aside class="contact-panel" :aria-label="page.contact.qrLabel">
            <p class="eyebrow">{{ page.contact.eyebrow }}</p><h2>{{ page.contact.title }}</h2><p>{{ page.contact.text }}</p>
            <div class="contact-body">
              <div><ul><li v-for="item in page.contact.checks" :key="item"><Check :size="15" aria-hidden="true" />{{ item }}</li></ul><small>{{ page.contact.qrText }}</small></div>
              <img src="/assets/customer-service-qr.png" :alt="page.contact.qrLabel" />
            </div>
          </aside>
        </div>
      </section>

      <section class="section faq-section">
        <div class="shell faq-grid">
          <div class="faq-heading"><p class="eyebrow">{{ page.faq.eyebrow }}</p><h2>{{ page.faq.title }}</h2></div>
          <div class="faq-list"><details v-for="(item, index) in page.faq.items" :key="item.q" :open="index === 0"><summary><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item.q }}</summary><p>{{ item.a }}</p></details></div>
        </div>
      </section>
    </main>
    <SiteFooter />
    <Teleport to="body">
      <div v-if="showModal" class="trial-modal" @click.self="showModal = false">
        <div class="trial-dialog" role="dialog" aria-modal="true" :aria-label="t.modal.title">
          <header><h2>{{ t.modal.title }}</h2><button type="button" :aria-label="page.close" @click="showModal = false"><X :size="19" aria-hidden="true" /></button></header>
          <div><img src="/assets/customer-service-qr.png" alt="QR" /><p>{{ t.modal.text }}</p></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowDown, ArrowRight, Building2, CalendarRange, Check, CheckCircle2, Layers3, X } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import { subscriptionEn, subscriptionZh } from '@/data/subscription'
import { SITE_ORIGIN } from '@/config/site'

const { lang, t } = useI18n()
const showModal = ref(false)
const activePeriod = ref('month')

function localizeTraditional<T>(value: T): T {
  if (typeof value === 'string') return toTraditionalText(value) as T
  if (Array.isArray(value)) return value.map((item) => localizeTraditional(item)) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, localizeTraditional(nested)])) as T
  return value
}

const page = computed(() => lang.value === 'en' ? subscriptionEn : lang.value === 'zh-TW' ? localizeTraditional(subscriptionZh) : subscriptionZh)
const activePlan = computed(() => t.value.plans.find((plan) => plan.id === activePeriod.value) ?? t.value.plans[0])
const plansSchema = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Product', name: 'AIGOKEY AI Token Plans',
  description: 'AIGOKEY day, week, and monthly AI Token plans for Codex Agent, GPT, and Image models.',
  brand: { '@type': 'Brand', name: 'AIGOKEY' }, url: `${SITE_ORIGIN}/subscription/`,
  offers: { '@type': 'AggregateOffer', priceCurrency: 'CNY', lowPrice: '5', highPrice: '3000', offerCount: '14' },
})

useHead(() => ({
  title: page.value.meta.title,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { property: 'og:title', content: page.value.meta.title }, { property: 'og:description', content: page.value.meta.description }, { property: 'og:type', content: 'website' },
  ],
  script: [{ type: 'application/ld+json', children: plansSchema }],
}))
</script>

<style scoped>
.subscription-page { --sub-ink:#14293a; --sub-muted:#5d7283; --sub-line:#d7e3e9; --sub-blue:#176fc1; --sub-green:#16835b; --sub-canvas:#ffffff; --sub-sky:#eef5fa; --sub-mint:#f2f8f6; min-height:100vh; overflow:clip; color:var(--sub-ink); background:var(--sub-canvas); font-family:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; }
.subscription-page :where(h1,h2,h3,p) { margin:0; }.subscription-page :where(a) { color:inherit; text-decoration:none; }
.shell { width:min(1180px,calc(100% - 48px)); margin:0 auto; }.section { padding:102px 0; }
.eyebrow { color:var(--sub-blue); font-family:"Cascadia Code","SFMono-Regular",monospace; font-size:12px; font-weight:800; line-height:1.5; }
.section-heading { display:grid; grid-template-columns:minmax(0,.95fr) minmax(340px,.65fr); gap:90px; align-items:end; }
.section-heading h2,.process-copy h2,.contact-panel h2,.faq-heading h2 { margin-top:13px; font-size:42px; font-weight:900; line-height:1.2; }
.section-heading>p,.process-copy>p:last-of-type,.contact-panel>p:last-of-type { color:var(--sub-muted); font-size:16px; line-height:1.8; }
.action { min-height:48px; display:inline-flex; align-items:center; justify-content:center; gap:9px; padding:0 20px; border:1px solid transparent; border-radius:7px; font-size:14px; font-weight:850; cursor:pointer; transition:transform .2s ease,background-color .2s ease,border-color .2s ease; }
.action:hover { transform:translateY(-2px); }.action:focus-visible,.period-tabs button:focus-visible { outline:3px solid rgba(23,111,193,.24); outline-offset:3px; }
.action-primary { color:#fff; background:var(--sub-blue); box-shadow:0 14px 30px rgba(23,111,193,.18); }.action-primary:hover { background:#125a9d; }
.action-secondary { border-color:#b9ccd7; background:rgba(255,255,255,.86); }.action-secondary:hover { border-color:#7fa7bd; background:#fff; }
.hero-section { position:relative; overflow:hidden; border-bottom:1px solid var(--sub-line); background:#ffffff; }
.hero-section::before { content:""; position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(54,117,158,.052) 1px,transparent 1px),linear-gradient(90deg,rgba(54,117,158,.052) 1px,transparent 1px); background-size:52px 52px; mask-image:linear-gradient(180deg,#000,transparent 88%); }
.hero-grid { position:relative; width:min(1180px,calc(100% - 48px)); min-height:620px; margin:0 auto; padding:78px 0 72px; display:grid; grid-template-columns:minmax(0,1.08fr) minmax(430px,.92fr); gap:72px; align-items:center; }
.hero-copy h1 { max-width:720px; margin-top:18px; font-size:57px; font-weight:950; line-height:1.1; }.hero-text { max-width:710px; margin-top:24px; color:var(--sub-muted); font-size:17px; line-height:1.85; }.hero-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:31px; }
.range-board { overflow:hidden; border:1px solid #c9d9e1; border-radius:8px; background:rgba(255,255,255,.94); box-shadow:0 28px 70px rgba(26,67,91,.12); }
.range-board>header { min-height:55px; display:flex; align-items:center; justify-content:space-between; gap:14px; padding:0 19px; border-bottom:1px solid var(--sub-line); font-size:13px; font-weight:850; }
.range-board>header i { display:flex; align-items:center; gap:7px; color:var(--sub-green); font-family:"Cascadia Code",monospace; font-size:9px; font-style:normal; }.range-board>header i span { width:7px; height:7px; border-radius:50%; background:#2bb978; box-shadow:0 0 0 5px rgba(43,185,120,.12); }
.range-labels,.range-row { display:grid; grid-template-columns:.75fr .6fr .9fr 1.25fr; gap:10px; align-items:center; }.range-labels { min-height:37px; padding:0 18px; color:#8296a3; background:#f3f7f9; font-family:"Cascadia Code",monospace; font-size:8px; }
.range-row { min-height:83px; margin:0 18px; border-bottom:1px solid #e0e9ed; }.range-row:last-of-type { border-bottom:0; }.range-row strong { font-size:15px; }.range-row span { color:var(--sub-muted); font-size:12px; }.range-row b { color:var(--sub-blue); font-family:"Cascadia Code",monospace; font-size:11px; }
.range-board footer { min-height:57px; display:flex; align-items:center; gap:9px; padding:12px 18px; border-top:1px solid #c5d5dd; color:#dbeaf2; background:#183447; font-size:12px; font-weight:750; }.range-board footer svg { color:#61d39e; }
.hero-metrics { position:relative; width:min(1180px,calc(100% - 48px)); margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--sub-line); }.hero-metrics div { min-height:92px; display:grid; align-content:center; gap:6px; padding:15px 24px; border-right:1px solid var(--sub-line); }.hero-metrics div:first-child { padding-left:0; }.hero-metrics div:last-child { border-right:0; }.hero-metrics strong { font-size:20px; }.hero-metrics span { color:var(--sub-muted); font-size:12px; line-height:1.55; }
.selector-section { scroll-margin-top:128px; background:#ffffff; }.selector-heading>p { max-width:520px; }
.period-tabs { margin-top:54px; display:grid; grid-template-columns:repeat(3,1fr); padding:5px; border:1px solid #c7d8e1; border-radius:8px; background:#dfeaf0; }.period-tabs button { min-height:68px; display:grid; align-content:center; gap:5px; padding:8px 18px; border:0; border-radius:5px; color:#526a7a; background:transparent; font:inherit; text-align:left; cursor:pointer; }.period-tabs button.active { color:var(--sub-ink); background:#fff; box-shadow:0 7px 18px rgba(35,76,99,.1); }.period-tabs button span { font-size:16px; font-weight:850; }.period-tabs button small { color:#718897; font-size:11px; }
.plan-ledger { margin-top:16px; display:grid; grid-template-columns:minmax(260px,.72fr) minmax(0,1.28fr); overflow:hidden; border:1px solid #c7d8e1; border-radius:8px; background:#fff; box-shadow:0 24px 60px rgba(31,78,105,.09); }.plan-context { padding:35px 31px; border-right:1px solid var(--sub-line); background:#f9fcfd; }.plan-context>span { color:var(--sub-blue); font-family:"Cascadia Code",monospace; font-size:10px; font-weight:800; }.plan-context h3 { margin-top:10px; font-size:34px; }.plan-context>p { margin-top:15px; color:var(--sub-muted); font-size:14px; line-height:1.75; }.context-meta { display:flex; align-items:center; gap:9px; margin-top:26px; padding:15px 0; border-top:1px solid var(--sub-line); border-bottom:1px solid var(--sub-line); color:var(--sub-blue); }.context-note { font-size:12px!important; }.plan-context .action { width:100%; margin-top:23px; }
.tier-head { min-height:52px; display:grid; grid-template-columns:1.15fr 1fr .55fr; gap:20px; align-items:center; padding:0 27px 0 68px; border-bottom:1px solid var(--sub-line); color:#8094a1; background:#f3f7f9; font-family:"Cascadia Code",monospace; font-size:9px; }.tier-row { min-height:91px; display:grid; grid-template-columns:29px 1.15fr 1fr .55fr; gap:20px; align-items:center; margin:0 26px; border-bottom:1px solid #e1e9ed; }.tier-index { display:grid; width:28px; height:28px; place-items:center; border:1px solid #a9c4d3; border-radius:50%; color:var(--sub-blue); font-family:"Cascadia Code",monospace; font-size:8px; font-weight:850; }.tier-row small { display:none; color:#7f94a1; font-size:10px; }.tier-quota strong { font-size:18px; }.tier-total span { color:var(--sub-muted); font-size:13px; }.tier-price { display:flex; align-items:center; justify-content:flex-end; gap:8px; }.tier-price>span { padding:4px 7px; border-radius:4px; color:#166d4d; background:#dff4e9; font-size:9px; font-weight:850; }.tier-price strong { font-size:22px; }.tier-table footer { min-height:57px; display:flex; align-items:center; gap:9px; padding:12px 26px; color:#4c6d81; background:var(--sub-mint); font-size:12px; font-weight:750; }.tier-table footer svg { color:var(--sub-green); }
.guide-section { background:#fff; }.guide-grid { margin-top:60px; display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid #b7cbd5; border-bottom:1px solid var(--sub-line); }.guide-grid article { min-height:278px; padding:31px 29px; border-right:1px solid var(--sub-line); }.guide-grid article:first-child { padding-left:0; }.guide-grid article:last-child { padding-right:0; border-right:0; }.guide-grid header { display:flex; align-items:center; justify-content:space-between; gap:15px; color:var(--sub-blue); font-family:"Cascadia Code",monospace; font-size:10px; font-weight:800; }.guide-grid header i { font-style:normal; }.guide-grid h3 { margin-top:40px; font-size:22px; }.guide-grid article>p { margin-top:13px; color:var(--sub-muted); font-size:14px; line-height:1.72; }.guide-grid article>strong { display:inline-flex; margin-top:23px; color:var(--sub-green); font-size:12px; }
.enterprise-rail { margin-top:28px; display:grid; grid-template-columns:auto minmax(0,1.1fr) minmax(210px,.6fr) auto; gap:24px; align-items:center; padding:28px; border:1px solid #c8ddd3; border-radius:8px; background:var(--sub-mint); }.enterprise-icon { display:grid; width:52px; height:52px; place-items:center; border:1px solid #a8cabe; border-radius:7px; color:var(--sub-green); background:#fff; }.enterprise-copy>p { display:flex; align-items:center; gap:8px; color:var(--sub-green); font-size:10px; font-weight:850; }.enterprise-copy h3 { margin-top:8px; font-size:21px; }.enterprise-copy>span { display:block; margin-top:8px; color:var(--sub-muted); font-size:13px; line-height:1.6; }.enterprise-copy small { display:block; margin-top:8px; color:#789087; font-size:10px; }.enterprise-tags { display:flex; flex-wrap:wrap; gap:7px; }.enterprise-tags span { padding:6px 8px; border:1px solid #bad5c9; border-radius:4px; color:#35735b; background:rgba(255,255,255,.6); font-size:10px; font-weight:800; }
.process-section { background:#ffffff; }.process-grid { display:grid; grid-template-columns:minmax(0,.94fr) minmax(390px,.76fr); gap:82px; align-items:start; }.process-copy>p:last-of-type { max-width:650px; margin-top:18px; }.process-copy ol { margin:42px 0 0; padding:0; border-top:1px solid #b7cbd5; list-style:none; }.process-copy li { min-height:118px; display:grid; grid-template-columns:42px minmax(0,1fr); gap:17px; align-items:center; border-bottom:1px solid var(--sub-line); }.process-copy li>span { color:var(--sub-blue); font-family:"Cascadia Code",monospace; font-size:10px; font-weight:850; }.process-copy h3 { font-size:17px; }.process-copy li p { margin-top:7px; color:var(--sub-muted); font-size:13px; line-height:1.65; }
.contact-panel { padding:31px; border:1px solid #c9d9e1; border-radius:8px; background:#fff; box-shadow:0 24px 60px rgba(31,78,105,.09); }.contact-panel h2 { font-size:29px; }.contact-panel>p:last-of-type { margin-top:15px; font-size:14px; }.contact-body { margin-top:24px; display:grid; grid-template-columns:minmax(0,1fr) 170px; gap:24px; align-items:center; }.contact-body ul { display:grid; gap:11px; margin:0; padding:0; list-style:none; }.contact-body li { display:flex; align-items:flex-start; gap:8px; color:#4b6474; font-size:12px; line-height:1.55; }.contact-body li svg { flex:0 0 auto; margin-top:2px; color:var(--sub-green); }.contact-body small { display:block; margin-top:18px; color:#78909e; font-size:10px; line-height:1.6; }.contact-body img { width:170px; aspect-ratio:1; object-fit:contain; border:1px solid var(--sub-line); border-radius:6px; background:#fff; }
.faq-section { background:#fff; }.faq-grid { display:grid; grid-template-columns:minmax(280px,.7fr) minmax(0,1.3fr); gap:92px; align-items:start; }.faq-heading { position:sticky; top:112px; }.faq-list { border-top:1px solid #b8cbd5; }.faq-list details { border-bottom:1px solid var(--sub-line); }.faq-list summary { min-height:74px; display:grid; grid-template-columns:36px minmax(0,1fr); gap:13px; align-items:center; padding:13px 0; font-size:15px; font-weight:850; cursor:pointer; }.faq-list summary span { color:var(--sub-blue); font-family:"Cascadia Code",monospace; font-size:9px; }.faq-list details>p { padding:0 0 24px 49px; color:var(--sub-muted); font-size:14px; line-height:1.75; }
.trial-modal { position:fixed; z-index:1000; inset:0; display:grid; place-items:center; padding:20px; background:rgba(16,35,48,.58); backdrop-filter:blur(5px); }.trial-dialog { width:min(410px,100%); overflow:hidden; border-radius:8px; background:#fff; box-shadow:0 26px 80px rgba(13,32,44,.28); }.trial-dialog>header { min-height:58px; display:flex; align-items:center; justify-content:space-between; gap:18px; padding:0 20px; border-bottom:1px solid #dce6eb; }.trial-dialog h2 { font-size:17px; }.trial-dialog button { width:36px; height:36px; display:grid; place-items:center; padding:0; border:0; border-radius:6px; color:#506777; background:transparent; cursor:pointer; }.trial-dialog button:hover { background:#edf4f7; }.trial-dialog>div { padding:26px; text-align:center; }.trial-dialog img { width:210px; max-width:100%; }.trial-dialog p { margin-top:14px; color:var(--sub-muted); font-size:14px; line-height:1.7; }
@media (max-width:1040px) { .hero-grid { min-height:auto; grid-template-columns:1fr; gap:46px; padding:72px 0; }.range-board { max-width:780px; }.plan-ledger { grid-template-columns:1fr; }.plan-context { border-right:0; border-bottom:1px solid var(--sub-line); }.enterprise-rail { grid-template-columns:auto minmax(0,1fr); }.enterprise-tags { grid-column:2; }.enterprise-rail>.action { grid-column:2; justify-self:start; }.process-grid { grid-template-columns:1fr; }.contact-panel { max-width:720px; } }
@media (max-width:780px) { .shell,.hero-grid,.hero-metrics { width:min(100% - 36px,1180px); }.section { padding:78px 0; }.hero-copy h1 { font-size:43px; }.section-heading,.faq-grid { grid-template-columns:1fr; gap:27px; }.section-heading h2,.process-copy h2,.faq-heading h2 { font-size:34px; }.hero-metrics { grid-template-columns:1fr; }.hero-metrics div,.hero-metrics div:first-child { min-height:74px; padding:13px 0; border-right:0; border-bottom:1px solid var(--sub-line); }.hero-metrics div:last-child { border-bottom:0; }.period-tabs { margin-top:40px; }.guide-grid { grid-template-columns:1fr; }.guide-grid article,.guide-grid article:first-child,.guide-grid article:last-child { min-height:auto; padding:28px 0 31px; border-right:0; border-bottom:1px solid var(--sub-line); }.guide-grid article:last-child { border-bottom:0; }.guide-grid h3 { margin-top:25px; }.faq-heading { position:static; } }
@media (max-width:560px) { .hero-grid { padding:58px 0 62px; }.hero-copy h1 { font-size:36px; line-height:1.14; }.hero-text { font-size:16px; }.hero-actions { align-items:stretch; flex-direction:column; }.action { width:100%; white-space:normal; text-align:center; }.range-labels { display:none; }.range-row { min-height:101px; grid-template-columns:1fr auto; gap:8px 14px; }.range-row strong { font-size:16px; }.range-row b { grid-column:1/-1; }.period-tabs { grid-template-columns:1fr; }.period-tabs button { min-height:58px; grid-template-columns:1fr auto; align-items:center; }.plan-context { padding:27px 22px; }.tier-head { display:none; }.tier-row { min-height:118px; grid-template-columns:minmax(0,1fr) auto; gap:11px 16px; margin:0 20px; padding:18px 0; }.tier-index { display:none; }.tier-row small { display:block; margin-bottom:4px; }.tier-total { grid-column:1/-1; }.tier-total small { display:none; }.tier-price { grid-column:2; grid-row:1; align-self:end; }.tier-price strong { font-size:20px; }.tier-table footer { align-items:flex-start; }.enterprise-rail { grid-template-columns:1fr; padding:23px; }.enterprise-icon { display:none; }.enterprise-tags,.enterprise-rail>.action { grid-column:1; }.enterprise-copy>p { align-items:flex-start; flex-direction:column; }.enterprise-copy>p svg { transform:rotate(90deg); }.contact-panel { padding:25px 20px; }.contact-panel h2 { font-size:27px; }.contact-body { grid-template-columns:1fr; }.contact-body img { width:min(220px,100%); justify-self:center; }.faq-list summary { grid-template-columns:29px minmax(0,1fr); font-size:14px; }.faq-list details>p { padding-left:42px; } }
@media (prefers-reduced-motion:reduce) { .action { transition:none; }.action:hover { transform:none; } }
</style>
