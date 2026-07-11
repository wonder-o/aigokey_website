<template>
  <div class="enterprise-page">
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

    <main>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">{{ t.enterprise.hero.eyebrow }}</p>
          <h1>{{ t.enterprise.hero.title }}</h1>
          <p class="summary">
            {{ t.enterprise.hero.summary }}
          </p>
          <div class="hero-actions">
            <a class="button" href="#contact">{{ t.enterprise.hero.primary }}</a>
            <a class="button secondary" href="#plans">{{ t.enterprise.hero.secondary }}</a>
          </div>
        </div>
        <aside class="hero-panel" :aria-label="t.enterprise.meta.title">
          <div class="panel-label">{{ t.enterprise.panel.label }}</div>
          <div class="quota">{{ t.enterprise.panel.quota }}</div>
          <p>{{ t.enterprise.panel.text }}</p>
          <div class="mini-grid">
            <span v-for="tag in t.enterprise.panel.tags" :key="tag">{{ tag }}</span>
          </div>
        </aside>
      </section>

      <section id="plans" class="band white">
        <div class="section-inner">
          <div class="section-head">
            <h2>{{ t.enterprise.plans.head }}</h2>
            <p>{{ t.enterprise.plans.desc }}</p>
          </div>
          <div class="card-grid">
            <article v-for="item in t.enterprise.plans.cards" :key="item.title" class="card">
              <div class="card-icon">{{ item.icon }}</div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="capacity" class="band soft">
        <div class="section-inner split">
          <div>
            <div class="section-head compact">
              <h2>{{ t.enterprise.capacity.head }}</h2>
              <p>{{ t.enterprise.capacity.desc }}</p>
            </div>
            <div class="feature-list">
              <div v-for="item in t.enterprise.capacity.items" :key="item.title" class="feature-row">
                <strong>{{ item.title }}</strong>
                <span>{{ item.text }}</span>
              </div>
            </div>
          </div>
          <aside class="metric-panel">
            <div v-for="item in t.enterprise.capacity.metrics" :key="item.label" class="metric">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </aside>
        </div>
      </section>

      <section id="private" class="band dark">
        <div class="section-inner">
          <div class="section-head">
            <h2>{{ t.enterprise.private.head }}</h2>
            <p>{{ t.enterprise.private.desc }}</p>
          </div>
          <div class="dark-grid">
            <article v-for="item in t.enterprise.private.items" :key="item.title">
              <span>{{ item.num }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" class="band contact-band">
        <div class="section-inner contact-box">
          <div>
            <p class="eyebrow">{{ t.enterprise.contact.eyebrow }}</p>
            <h2>{{ t.enterprise.contact.head }}</h2>
            <p class="contact-copy">
              {{ t.enterprise.contact.text }}
            </p>
            <ul class="contact-list">
              <li v-for="item in t.enterprise.contact.list" :key="item">{{ item }}</li>
            </ul>
          </div>
          <aside class="qr-card" :aria-label="t.enterprise.contact.head">
            <img src="/assets/customer-service-qr.png" :alt="t.enterprise.contact.head" />
            <p>{{ t.enterprise.contact.qrText }}</p>
          </aside>
        </div>
      </section>
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
  title: t.value.enterprise.meta.title,
  meta: [
    { name: 'description', content: t.value.enterprise.meta.description },
    { name: 'keywords', content: t.value.enterprise.meta.keywords },
    { property: 'og:title', content: t.value.enterprise.meta.title },
    { property: 'og:description', content: t.value.enterprise.meta.ogDescription },
    { property: 'og:type', content: 'website' },
  ],
}))
</script>

<style scoped>
.enterprise-page {
  min-height: 100vh;
  color: #111b24;
  background: #f8fbfd;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
}

a { color: inherit; text-decoration: none; }
h1, h2, h3, p { margin: 0; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid #dce5ec;
  background: rgba(248, 251, 253, 0.92);
  backdrop-filter: blur(18px);
}

.topbar {
  width: min(1180px, calc(100% - 32px));
  min-height: 72px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 21px;
  font-weight: 950;
  white-space: nowrap;
}

.brand img {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: cover;
}

.nav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.nav a {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  color: #1d3144;
  background: #fff;
  font-size: 14px;
  font-weight: 850;
  white-space: nowrap;
}

.hero {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 76px 0 70px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  gap: 38px;
  align-items: center;
}

.eyebrow {
  color: #2c9d18;
  font-size: 14px;
  font-weight: 950;
  letter-spacing: 0;
}

h1 {
  max-width: 800px;
  margin-top: 14px;
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.06;
  font-weight: 950;
}

.summary {
  max-width: 760px;
  margin-top: 20px;
  color: #5b6874;
  font-size: 18px;
  line-height: 1.78;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.button {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border: 1px solid #2468f2;
  border-radius: 8px;
  color: #fff;
  background: #2468f2;
  font-weight: 900;
}

.button.secondary {
  color: #1d3144;
  background: #fff;
  border-color: #dce5ec;
}

.hero-panel {
  padding: 28px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 24px 70px rgba(17, 27, 36, 0.13);
}

.panel-label {
  color: #2468f2;
  font-size: 14px;
  font-weight: 950;
}

.quota {
  margin-top: 14px;
  font-size: clamp(38px, 5vw, 58px);
  line-height: 1;
  font-weight: 950;
}

.hero-panel p {
  margin-top: 16px;
  color: #5b6874;
  line-height: 1.7;
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 22px;
}

.mini-grid span {
  min-height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  color: #184ab7;
  background: #e9f3ff;
  font-weight: 900;
}

.band {
  padding: 82px 24px;
}

.white { background: #fff; }
.soft { background: #f2f7fb; }
.dark {
  color: #fff;
  background: linear-gradient(135deg, #132231, #184ab7 72%, #2c9d18);
}

.section-inner {
  max-width: 1180px;
  margin: 0 auto;
}

.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 30px;
}

.section-head.compact {
  display: block;
}

.section-head h2,
.contact-box h2 {
  max-width: 760px;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.16;
  font-weight: 950;
}

.section-head p {
  max-width: 480px;
  color: #5b6874;
  line-height: 1.72;
}

.dark .section-head p {
  color: rgba(255, 255, 255, 0.74);
}

.card-grid,
.dark-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card {
  min-height: 250px;
  padding: 26px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #fbfdff;
}

.card-icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 8px;
  color: #184ab7;
  background: #e9f3ff;
  font-weight: 950;
}

.card h3,
.dark-grid h3 {
  margin-top: 18px;
  font-size: 22px;
  line-height: 1.3;
}

.card p,
.dark-grid p {
  margin-top: 12px;
  color: #5b6874;
  line-height: 1.72;
}

.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
  gap: 28px;
  align-items: start;
}

.feature-list {
  display: grid;
  gap: 12px;
}

.feature-row {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 18px;
  padding: 18px 20px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #fff;
}

.feature-row strong {
  color: #111b24;
}

.feature-row span {
  color: #5b6874;
  line-height: 1.6;
}

.metric-panel {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 18px 48px rgba(17, 27, 36, 0.08);
}

.metric {
  padding: 16px;
  border-radius: 8px;
  background: #f8fbfd;
}

.metric span {
  display: block;
  color: #5b6874;
  font-size: 13px;
  font-weight: 850;
}

.metric strong {
  display: block;
  margin-top: 6px;
  font-size: 26px;
}

.dark-grid article {
  min-height: 230px;
  padding: 26px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.dark-grid span {
  color: #9feb8b;
  font-size: 28px;
  font-weight: 950;
}

.dark-grid p {
  color: rgba(255, 255, 255, 0.74);
}

.contact-band {
  background: #fff;
}

.contact-box {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
  gap: 30px;
  align-items: center;
  padding: 34px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #f8fbfd;
  box-shadow: 0 18px 48px rgba(17, 27, 36, 0.08);
}

.contact-copy {
  max-width: 760px;
  margin-top: 16px;
  color: #5b6874;
  font-size: 17px;
  line-height: 1.75;
}

.contact-list {
  display: grid;
  gap: 10px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.contact-list li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 10px;
  color: #344454;
  line-height: 1.55;
}

.contact-list li::before {
  content: "✓";
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #2c9d18;
  font-size: 13px;
  font-weight: 950;
}

.qr-card {
  padding: 18px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #fff;
  text-align: center;
}

.qr-card img {
  width: min(100%, 280px);
  margin: 0 auto;
  border-radius: 6px;
}

.qr-card p {
  margin-top: 12px;
  color: #5b6874;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
    padding: 14px 0;
  }

  .hero,
  .split,
  .contact-box {
    grid-template-columns: 1fr;
  }

  .section-head {
    align-items: start;
    flex-direction: column;
  }

  .card-grid,
  .dark-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero,
  .topbar {
    width: min(100% - 24px, 1180px);
  }

  .hero {
    padding: 46px 0 52px;
  }

  .band {
    padding: 62px 16px;
  }

  .feature-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .hero-actions {
    display: grid;
  }

  .button,
  .button.secondary {
    width: 100%;
  }
}
</style>
