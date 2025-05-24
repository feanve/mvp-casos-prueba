import { defineStore } from 'pinia'
import { loginMock } from '../services/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async login({ username, password }) {
      this.loading = true
      this.error = null
      try {
        const user = await loginMock({ username, password })
        this.user = user
        this.loading = false
        return true
      } catch (err) {
        this.error = err
        this.loading = false
        return false
      }
    },
    logout() {
      this.user = null
    }
  }
})