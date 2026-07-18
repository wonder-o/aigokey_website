<template>
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
        <router-link class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" to="/skills">{{ t.navButtons.skills }}</router-link>
        <router-link class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" to="/blog">{{ t.navButtons.blog }}</router-link>
        <router-link class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" to="/codex-help">{{ t.navButtons.help }}</router-link>
        <router-link class="btn btn-ghost max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" to="/enterprise-service">{{ t.navButtons.enterprise }}</router-link>
        <button class="btn btn-primary max-[720px]:min-h-[40px] max-[720px]:px-2.5 max-[720px]:text-[13px]" type="button" @click="$emit('trial')">{{ t.navButtons.trial }}</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageMenu from '@/components/LanguageMenu.vue'
import { useI18n } from '@/composables/useI18n'
import { useHostUrl } from '@/composables/useHostUrl'

defineEmits<{ trial: [] }>()
const { t } = useI18n()
const { loginUrl, registerUrl } = useHostUrl()
</script>
