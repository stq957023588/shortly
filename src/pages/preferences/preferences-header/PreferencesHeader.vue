<template>
  <VaAvatar size="large" color="warning"><span class="text-4xl"> 😍 </span></VaAvatar>
  <div class="flex flex-col justify-center">
    <h2 class="text-[28px] md:text-[32px] leading-10 font-bold">{{ store.info.fullname }}</h2>
    <div class="flex space-x-1 text-[13px] leading-4">
      <p>Member since</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCurrentUserStore } from '@/stores/currentUser'

const store = useCurrentUserStore()
</script>
