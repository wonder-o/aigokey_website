<template>
  <div class="page overflow-hidden">
    <!-- Nav -->
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
      <!-- Hero -->
      <section class="relative py-20 px-6 max-[720px]:px-4 max-[720px]:pt-10" style="background: linear-gradient(115deg, rgba(36,104,242,0.09), transparent 38%), linear-gradient(180deg, #ffffff 0%, #eef6ff 100%);">
        <div class="absolute inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(36,104,242,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(36,104,242,0.08) 1px, transparent 1px); background-size: 56px 56px; mask-image: linear-gradient(180deg, rgba(0,0,0,0.46), transparent 78%);"></div>
        <div class="relative grid grid-cols-[minmax(0,1.18fr)_minmax(390px,0.82fr)] gap-10 items-center max-w-[1180px] mx-auto max-[1020px]:grid-cols-1">
          <div>
            <div class="inline-flex items-center gap-2 w-fit mb-5 px-3 py-2 border border-blue/15 rounded-full text-[14px] font-extrabold text-[#183d77] bg-white/85">
              <span class="w-2 h-2 rounded-full bg-green shadow-[0_0_0_6px_rgba(68,201,40,0.16)]"></span>
              {{ t.eyebrow }}
            </div>
            <h1 class="max-w-[720px] text-[clamp(42px,6vw,76px)] leading-[1.04] font-black">{{ t.heroTitleBefore }}<span class="text-blue">{{ t.heroTitleHighlight }}</span>{{ t.heroTitleAfter }}</h1>
            <p class="max-w-[690px] mt-5 text-muted text-[19px] leading-[1.82]">{{ t.heroCopy }}</p>
            <div class="flex items-center gap-3 flex-wrap mt-8">
              <a class="btn btn-primary" :href="loginUrl" target="_top">{{ t.heroButtons.login }}</a>
              <router-link class="btn btn-ghost" to="/codex-help">{{ t.heroButtons.help }}</router-link>
              <button class="btn btn-green" type="button" @click="showModal = true">{{ t.heroButtons.trial }}</button>
            </div>
            <p class="mt-4 text-[#687784] text-[14px] leading-[1.7]">{{ t.heroNote }}</p>
            <div class="grid grid-cols-3 gap-3.5 mt-8 max-[720px]:grid-cols-1">
              <div v-for="(item, i) in t.proof" :key="i" class="min-h-[104px] p-4 border border-line/90 rounded-lg bg-white/80 shadow-[0_16px_42px_rgba(17,27,36,0.06)]">
                <strong class="block text-[clamp(18px,1.6vw,24px)] leading-[1.2]">{{ item.strong }}</strong>
                <span class="block mt-2.5 text-muted text-[13px] leading-[1.45]">{{ item.text }}</span>
              </div>
            </div>
          </div>
          <div class="relative min-h-[560px] max-[1020px]:min-h-0" aria-label="AigoKey quota preview">
            <div class="absolute top-0 right-7 grid w-[178px] h-[178px] place-items-center border border-line/90 rounded-full bg-white shadow-[0_18px_48px_rgba(17,27,36,0.1)] max-[720px]:static max-[720px]:w-[136px] max-[720px]:h-[136px] max-[720px]:ml-auto">
              <img src="/assets/aigokey-logo.png" alt="AigoKey" class="w-[124px] h-[124px] object-cover max-[720px]:w-[96px] max-[720px]:h-[96px]" />
            </div>
            <div class="relative mt-[78px] overflow-hidden border border-line/95 rounded-lg bg-white shadow-[var(--shadow)] max-[720px]:mt-4">
              <div class="flex items-center justify-between gap-4 min-h-[58px] px-[18px] border-b border-line bg-[#fbfdff]">
                <div class="flex gap-[7px]">
                  <i class="w-2.5 h-2.5 rounded-full bg-[#f45f5f]"></i>
                  <i class="w-2.5 h-2.5 rounded-full bg-[#f2bd3f]"></i>
                  <i class="w-2.5 h-2.5 rounded-full bg-green"></i>
                </div>
                <div class="text-muted text-[13px] font-bold">{{ t.consoleTitle }}</div>
                <div class="inline-flex items-center gap-2 min-h-[30px] px-2.5 rounded-full text-[#276d17] bg-[#edfbe9] text-[12px] font-black">
                  <span class="w-2 h-2 rounded-full bg-green shadow-[0_0_0_6px_rgba(68,201,40,0.16)]"></span>
                  {{ t.liveText }}
                </div>
              </div>
              <div class="p-6 max-[720px]:p-4">
                <div class="text-white p-6 rounded-lg" style="background: linear-gradient(135deg, rgba(36,104,242,0.92), rgba(19,34,49,0.98) 58%);">
                  <div class="flex items-center justify-between gap-3 text-white/70 text-[13px] font-extrabold">
                    <span>{{ t.quotaHeadLeft }}</span>
                    <span>{{ t.quotaHeadRight }}</span>
                  </div>
                  <div class="mt-4 text-[clamp(36px,5vw,64px)] leading-none font-black whitespace-nowrap">{{ t.quotaMain }} <span class="text-[16px] opacity-70">{{ t.quotaUnit }}</span></div>
                  <div class="overflow-hidden h-2.5 mt-6 rounded-full bg-white/15">
                    <div class="w-[78%] h-full rounded-[inherit] bg-gradient-to-r from-green to-[#7df05f]"></div>
                  </div>
                  <div class="grid grid-cols-2 gap-3 mt-3.5">
                    <div class="min-h-[84px] p-[15px] border border-white/15 rounded-lg bg-white/10">
                      <strong class="block text-[22px]">{{ t.metricLeft.strong }}</strong>
                      <span class="block mt-1.5 text-white/70 text-[12px] leading-[1.45]">{{ t.metricLeft.text }}</span>
                    </div>
                    <div class="min-h-[84px] p-[15px] border border-white/15 rounded-lg bg-white/10">
                      <strong class="block text-[22px]">{{ t.metricRight.strong }}</strong>
                      <span class="block mt-1.5 text-white/70 text-[12px] leading-[1.45]">{{ t.metricRight.text }}</span>
                    </div>
                  </div>
                </div>
                <div class="grid gap-2.5 mt-4">
                  <div v-for="(item, i) in t.usage" :key="i" class="grid grid-cols-[auto_1fr_auto] items-center gap-3 min-h-[58px] py-3 px-3.5 border border-line rounded-lg bg-white max-[720px]:grid-cols-[auto_1fr]">
                    <div class="grid w-[26px] h-[26px] place-items-center rounded-full text-white bg-blue text-[13px] font-black">✓</div>
                    <div>
                      <strong class="block text-[14px]">{{ item.strong }}</strong>
                      <span class="block mt-0.5 text-muted text-[12px]">{{ item.text }}</span>
                    </div>
                    <div class="px-2 py-1 rounded-full text-[#276d17] bg-[#edfbe9] text-[12px] font-black max-[720px]:col-start-2 max-[720px]:w-fit">{{ item.tag }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pain Points -->
      <section class="py-[86px] px-6 bg-white max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.pain.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.pain.desc }}</p>
          </div>
          <div class="grid grid-cols-4 gap-4 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.pain.cards" :key="i" class="min-h-[220px] p-6 border border-line rounded-lg bg-[#fbfdff]">
              <div class="grid w-[42px] h-[42px] place-items-center rounded-lg text-blue bg-cyan font-black">{{ card.icon }}</div>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Value -->
      <section class="py-[86px] px-6 bg-[#f2f7fb] max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.value.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.value.desc }}</p>
          </div>
          <div class="grid grid-cols-3 gap-4 max-[1020px]:grid-cols-1">
            <article v-for="(card, i) in t.value.cards" :key="i" class="min-h-[220px] p-6 border border-line rounded-lg bg-white">
              <div class="grid w-[42px] h-[42px] place-items-center rounded-lg text-blue bg-cyan font-black">{{ card.icon }}</div>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section class="py-[86px] px-6 text-white max-[720px]:px-4" style="background: linear-gradient(135deg, rgba(19,34,49,0.98), rgba(36,104,242,0.88)), #132231;">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black text-white">{{ t.price.head }}</h2>
            <p class="max-w-[460px] text-white/70 text-[16px] leading-[1.75]">{{ t.price.desc }}</p>
          </div>
          <div class="grid gap-6">
            <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5 max-[1020px]:grid-cols-1">
              <article v-for="(plan, i) in t.plans" :key="i" class="relative grid content-start p-6 border rounded-lg bg-white/10" :class="{ 'border-[rgba(159,235,139,0.68)] bg-white/[0.13] shadow-[0_22px_48px_rgba(0,0,0,0.18)]': plan.featured, 'border-white/15': !plan.featured }">
                <div v-if="plan.badge" class="absolute top-4 right-4 inline-flex items-center min-h-[28px] px-2.5 rounded-full text-[#123412] bg-[#9feb8b] text-[12px] font-black">{{ plan.badge }}</div>
                <div class="text-[#9feb8b] font-black">{{ plan.label }}</div>
                <div class="mt-3.5 text-[clamp(36px,4vw,48px)] leading-none font-black">{{ plan.price }} <span class="text-[18px] text-white/70">{{ plan.unit }}</span></div>
                <p class="mt-4 text-white/75 text-[15px] leading-[1.68]">{{ plan.sub }}</p>
                <div class="grid gap-2.5 mt-5">
                  <div v-for="(q, j) in plan.quotas" :key="j" class="grid gap-0.5 py-3.5 px-4 border border-white/15 rounded-lg bg-white/10">
                    <span class="text-white/60 text-[13px] font-extrabold">{{ q.label }}</span>
                    <strong class="text-[22px]">{{ q.value }}</strong>
                  </div>
                </div>
                <ul class="grid gap-[11px] mt-6 p-0 list-none">
                  <li v-for="(check, k) in plan.checks" :key="k" class="grid grid-cols-[24px_1fr] gap-2.5 items-start text-white/85 leading-[1.55]">
                    <span class="grid w-6 h-6 place-items-center rounded-full text-[#0f2e13] bg-[#9feb8b] text-[13px] font-black before:content-['✓']"></span>
                    {{ check }}
                  </li>
                </ul>
              </article>
            </div>
            <!-- Compare -->
            <div class="grid gap-3.5">
              <div v-for="(item, i) in t.compare" :key="i" class="grid grid-cols-[1fr_auto] gap-[18px] items-center min-h-[78px] py-[18px] px-5 border border-white/15 rounded-lg bg-white/10 max-[720px]:grid-cols-1">
                <div>
                  <strong class="block text-[16px]">{{ item.title }}</strong>
                  <span class="block mt-1 text-white/70 text-[14px] leading-[1.55]">{{ item.text }}</span>
                </div>
                <div class="px-2.5 py-2 rounded-full text-[13px] font-black whitespace-nowrap" :class="item.good ? 'text-[#123412] bg-[#9feb8b]' : 'text-[#1d3144] bg-[#dce8f5]'">{{ item.tag }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Audience -->
      <section class="py-[86px] px-6 bg-white max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.audience.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.audience.desc }}</p>
          </div>
          <div class="grid grid-cols-5 gap-3.5 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.audience.cards" :key="i" class="min-h-[220px] p-6 border border-line rounded-lg bg-[#fbfdff]">
              <span class="inline-flex items-center min-h-[30px] px-2.5 rounded-full text-[#184ab7] bg-cyan text-[12px] font-black">{{ card.pill }}</span>
              <h3 class="mt-[18px] text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted text-[15px] leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Promise -->
      <section class="py-[86px] px-6 bg-[#f2f7fb] max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.promise.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.promise.desc }}</p>
          </div>
          <div class="grid grid-cols-4 gap-4 max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <article v-for="(card, i) in t.promise.cards" :key="i" class="min-h-[230px] p-[26px] border border-line rounded-lg bg-white">
              <div class="text-green-dark text-[30px] font-black">{{ card.num }}</div>
              <h3 class="mt-4 text-[20px]">{{ card.title }}</h3>
              <p class="mt-[11px] text-muted leading-[1.72]">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="py-[86px] px-6 bg-white max-[720px]:px-4">
        <div class="max-w-[1180px] mx-auto">
          <div class="flex items-end justify-between gap-7 mb-8 max-[1020px]:flex-col max-[1020px]:items-start">
            <h2 class="max-w-[780px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.faq.head }}</h2>
            <p class="max-w-[460px] text-muted text-[16px] leading-[1.75]">{{ t.faq.desc }}</p>
          </div>
          <div class="grid gap-3 max-w-[920px]">
            <details v-for="(item, i) in t.faq.items" :key="i" class="border border-line rounded-lg bg-white" :open="i === 0">
              <summary class="cursor-pointer py-5 px-[22px] font-black">{{ item.q }}</summary>
              <p class="px-[22px] pb-[22px] text-muted leading-[1.75]">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section class="py-[72px] px-6 text-white max-[720px]:px-4" style="background: linear-gradient(135deg, #111b24, #173d74 72%, #216a1f);">
        <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-7 items-center max-w-[1180px] mx-auto max-[1020px]:grid-cols-1 max-[1020px]:items-start">
          <div>
            <h2 class="max-w-[720px] text-[clamp(30px,4vw,48px)] leading-[1.15] font-black">{{ t.contact.head }}</h2>
            <p class="max-w-[660px] mt-3.5 text-white/75 leading-[1.75]">{{ t.contact.text }}</p>
          </div>
          <div class="flex items-center gap-3 flex-wrap justify-end max-[1020px]:justify-start">
            <a class="btn btn-primary" :href="loginUrl" target="_top">{{ t.contact.buttons.login }}</a>
            <router-link class="btn border-white/20 bg-white/10 text-white" to="/codex-help">{{ t.contact.buttons.help }}</router-link>
            <button class="btn btn-green" type="button" @click="showModal = true">{{ t.contact.buttons.trial }}</button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
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

    <!-- Trial Modal -->
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

useHead({
  title: 'AigoKey - Codex Agent + GPT + Image 稳定 AI 套餐',
  meta: [
    { name: 'description', content: 'AigoKey 是稳定可靠的 AI Token 套餐，5 元/天起，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型，日卡、周卡和三档月卡可选，每天 30-200 美元额度。' },
    { name: 'keywords', content: 'AigoKey, AI Token, Codex Agent, GPT, Image, AI套餐, 稳定AI, 日卡, 周卡, 月卡' },
    { property: 'og:title', content: 'AigoKey - Codex Agent + GPT + Image 稳定 AI 套餐' },
    { property: 'og:description', content: 'AigoKey 是稳定可靠的 AI Token 套餐，5 元/天起，覆盖 Codex Agent、GPT 系列模型和 Image 系列模型。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'AigoKey' },
  ],
})

const { t } = useI18n()
const { loginUrl, registerUrl } = useHostUrl()
const showModal = ref(false)
</script>
