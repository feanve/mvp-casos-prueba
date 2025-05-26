<template>
  <v-container fluid class="login-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-8 login-card" rounded="lg">
          <div class="text-center pa-6">
            <v-avatar size="80" color="primary" class="mb-4">
              <v-icon size="40" color="white">mdi-clipboard-check-multiple</v-icon>
            </v-avatar>
            <h2 class="text-h4 font-weight-bold text-primary mb-2">TestCase Manager</h2>
            <p class="text-subtitle-1 text-grey">Inicia sesión para continuar</p>
          </div>
          
          <v-card-text class="px-6 pb-6">
            <LoginForm
              :loading="loading"
              :error="error"
              @login="handleLogin"
            />
          </v-card-text>
          
          <v-card-actions class="px-6 pb-6">
            <v-chip color="info" variant="outlined" size="small">
              <v-icon start>mdi-information</v-icon>
              Demo: admin/admin o tester/tester
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
  console.log("Respuesta en login view", ok)
  if (ok) {
    router.push('/projects')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}
</style>
