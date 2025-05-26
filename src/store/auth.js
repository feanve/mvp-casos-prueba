import { defineStore } from 'pinia'
import { login, getMe } from '../services/auth'

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
        await login({ username, password })
        // Una vez logueado, obtén los datos del usuario
        this.user = await getMe()
        console.log("user", this.user)
        this.loading = false
        return true
      } catch (err) {
        this.error = 'Usuario o contraseña incorrectos'
        this.loading = false
        return false
      }
    },
    async fetchUser() {
      // Puedes usar esto para refrescar los datos del usuario en cualquier momento
      this.user = await getMe()
    },
    logout() {
      this.user = null
      localStorage.removeItem('token')
    }
  }
})