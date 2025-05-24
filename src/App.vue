<script setup>
import { useAuthStore } from './store/auth'
import { useRouter } from 'vue-router'
import AppDrawer from './components/AppDrawer.vue'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <AppDrawer v-if="auth.user" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
