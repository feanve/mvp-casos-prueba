<script setup>
import { useAuthStore } from './store/auth'
import { useRouter } from 'vue-router'
import AppDrawer from './components/AppDrawer.vue'
import AppHeader from './components/AppHeader.vue'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <AppDrawer v-if="auth.user" @logout="logout" />
    <v-main>
      <AppHeader v-if="auth.user" />
      <router-view />
    </v-main>
  </v-app>
</template>