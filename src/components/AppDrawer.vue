<template>
  <v-navigation-drawer app v-model="drawer" :permanent="true">
    <v-list>
      <v-list-item>
        <v-list-item-title class="text-h6">Casos de Prueba</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        link
        @click="navigate(item.to)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="logout" link>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const drawer = ref(true)
const router = useRouter()
const auth = useAuthStore()

const items = [
  { title: 'Proyectos', to: '/projects', icon: 'mdi-folder' },
  { title: 'Historias de Usuario', to: '/user-stories', icon: 'mdi-account-group' },
  { title: 'Casos de Prueba', to: '/test-cases', icon: 'mdi-clipboard-check' }
]

function navigate(to) {
  router.push(to)
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
