<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps(['connected'])
</script>

<template>
  <div class="container mx-auto md:flex justify-between py-6 md:py-8 items-center gap-8">
    <div class="flex items-center gap-6">
      <nuxt-link to="/">
        <img
            src="https://arbitrum.foundation/_next/static/media/arbitrum_logo.700dd1fb.svg" alt=""
            class="h-12 w-auto"
        >
      </nuxt-link>
    </div>
    <div class="flex-1 hidden xl:flex justify-between items-center gap-6">
      <div class="flex gap-6">
        <a href="">Learn</a>
        <a href="">Ecosystem</a>
        <a href="">Arbitrum Orbit</a>
      </div>
      <div class="flex gap-6 items-center">
        <div v-if="!props.connected" class="cursor-pointer p-4 px-8 bg-blue rounded-full uppercase font-maison-mono" @click="$emit('connect')">
          Connect Wallet
        </div>
        <a href="">
          <div class="w-6 h-6 i-xx-icons-twitter fill-white" />
        </a>
        <a href="">
          <div class="w-6 h-6 i-xx-icons-discord fill-white" />
        </a>
        <a href="">
          <div class="w-6 h-6 i-xx-icons-telegram fill-white" />
        </a>
      </div>
    </div>
  </div>
</template>
