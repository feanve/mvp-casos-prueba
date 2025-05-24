<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh;">
    <v-card width="400">
      <v-card-title>Iniciar Sesión</v-card-title>
      <v-card-text>
        <LoginForm
          :loading="loading"
          :error="error"
          @login="handleLogin"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import LoginForm from '../components/Auth/LoginForm.vue'

const store = useAuthStore()
const router = useRouter()

const loading = computed(() => store.loading)
const error = computed(() => store.error)

async function handleLogin(credentials) {
  const ok = await store.login(credentials)
  if (ok) {
    router.push('/projects')
  }
}
</script>

<style lang="scss" scoped>

</style>