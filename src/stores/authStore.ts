import { defineStore } from 'pinia'
import { useApi } from '@/api'
import jwtDecode from 'jwt-decode'

import type { IAuthStore, IUser } from '@/interfaces'

const { fetchData } = useApi()
export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuthStore => ({
    profile: null
  }),
  persist: {
    key: 'jlpwa',
    paths: ['profile']
  },
  getters: {
    token: (state) => state.profile?.token
  },
  actions: {
    async logout() {
      const win: Window = window
      // await logoutRequest()
      this.profile = null
      win.location = '/login'
    },

    async login(url: string) {
      const res = await fetchData(url, true)
      if (res.success) {
        const decodedToken = jwtDecode(res?.data?.data?.access_token)
        this.profile = {
          token: res?.data?.data?.access_token,
          refreshToken: res?.data?.data?.refresh_token,
          user: decodedToken as IUser
        }
      }

      return res
    },
    resetProfile() {
      const win: Window = window

      this.profile = null
      win.location = '/login'
    }
  }
})
