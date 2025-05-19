import { defineStore } from 'pinia'
import { CurrentUser } from '@/types/currentUser'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => {
    return {
      info: {
        fullname: '',
      } as CurrentUser,
      token: '',
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setInfo(info: CurrentUser) {
      this.info = info
    },
    toggle2FA() {
      this.info.is2FAEnabled = !this.info.is2FAEnabled
    },

    changeUserName(fullname: string) {
      this.info.fullname = fullname
    },
  },
  persist: true, // ✅ 这一行启用持久化
})
