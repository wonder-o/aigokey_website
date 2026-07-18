<template>
  <footer class="py-8 px-6 text-[#667583] border-t border-line bg-white">
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-w-[1180px] mx-auto text-[14px] max-[720px]:grid-cols-1 max-[720px]:justify-items-center max-[720px]:text-center">
      <router-link to="/" class="inline-flex items-center gap-3 text-[21px] font-black text-[#111b24]" aria-label="AigoKey">
        <img src="/assets/aigokey-logo.png" alt="AigoKey Logo" class="w-[42px] h-[42px] rounded-[10px] object-cover" />
        <span>AigoKey</span>
      </router-link>
      <div class="text-[#83909c] text-[13px]">{{ t.footer.copyright }}</div>
      <div class="justify-self-end max-[720px]:justify-self-center">{{ t.footer.text }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
