import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      value: 'light',
    }
  },
  actions: {
    setValue(value: string) {
      this.value = value
    },
  },
  persist: true, // ✅ 这一行启用持久化
})
