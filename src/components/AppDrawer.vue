<template>
  <v-navigation-drawer 
    app 
    v-model="drawer"
    :permanent="!isMobile"
    :temporary="isMobile"
    color="grey-lighten-5"
    width="280"
  >
    <!-- Header content -->
    <div class="pa-4">
      <div class="text-center mb-4">
        <v-avatar size="64" color="primary">
          <v-icon size="32" color="white">mdi-clipboard-check-multiple</v-icon>
        </v-avatar>
        <h3 class="mt-2 text-primary">TestCase Manager</h3>
        <p class="text-caption text-grey">Gestión de casos de prueba</p>
      </div>
    </div>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        v-for="item in filteredItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :subtitle="item.subtitle"
        rounded="xl"
        class="ma-2"
        color="primary"
      >
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-menu offset-y location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              block
              variant="outlined"
              color="primary"
              class="text-none"
            >
              <v-avatar size="24" class="me-2">
                <v-icon size="16">mdi-account</v-icon>
              </v-avatar>
              {{ auth.user?.name || 'Usuario' }}
              <v-icon end>mdi-chevron-up</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>{{ auth.user?.name || 'Usuario' }}</v-list-item-title>
              <v-list-item-subtitle>{{ auth.user?.role || 'Rol' }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout" prepend-icon="mdi-logout">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useDisplay } from 'vuetify'

const router = useRouter()
const auth = useAuthStore()
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
const drawer = ref(!mobile.value)

const allItems = [
  { 
    title: 'Proyectos', 
    subtitle: 'Gestionar proyectos',
    to: '/projects', 
    icon: 'mdi-folder-multiple',
    roles: ['admin']
  },
  { 
    title: 'Historias de Usuario', 
    subtitle: 'Definir funcionalidades',
    to: '/user-stories', 
    icon: 'mdi-account-group',
    roles: ['admin']
  },
  { 
    title: 'Casos de Prueba', 
    subtitle: 'Crear y ejecutar tests',
    to: '/test-cases', 
    icon: 'mdi-clipboard-check',
    roles: ['admin', 'tester']
  }
]

const filteredItems = computed(() => {
  const userRole = auth.user?.role
  return allItems.filter(item => item.roles.includes(userRole))
})

function handleToggleDrawer() {
  drawer.value = !drawer.value
}

function logout() {
  auth.logout()
  router.push('/login')
}

onMounted(() => {
  window.addEventListener('toggle-drawer', handleToggleDrawer)
})

onUnmounted(() => {
  window.removeEventListener('toggle-drawer', handleToggleDrawer)
})
</script>