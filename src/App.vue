<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme-store'
import { useColors } from 'vuestic-ui'

const themeStore = useThemeStore()
const { applyPreset } = useColors()

applyPreset(themeStore.value)
</script>

<style lang="scss">
#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 20rem;
}
</style>
