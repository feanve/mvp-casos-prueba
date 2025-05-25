<template>
  <v-container fluid class="pa-6">
    <!-- Header Section -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h3 font-weight-bold text-primary mb-2">Historias de Usuario</h1>
        <p class="text-subtitle-1 text-grey">Define las funcionalidades de tus proyectos</p>
      </div>
      <v-btn 
        color="primary" 
        size="large"
        @click="showForm = true"
        prepend-icon="mdi-plus"
        elevation="2"
      >
        Nueva Historia
      </v-btn>
    </div>

    <!-- Alertas de error -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      closable
      class="mb-4"
      @click:close="error = null"
    >
      {{ error }}
    </v-alert>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card color="error" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-alert-circle</v-icon>
          <div class="text-h4 font-weight-bold">{{ highPriorityStories }}</div>
          <div class="text-subtitle-2">Alta Prioridad</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="warning" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-alert</v-icon>
          <div class="text-h4 font-weight-bold">{{ mediumPriorityStories }}</div>
          <div class="text-subtitle-2">Media Prioridad</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="success" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-check-circle</v-icon>
          <div class="text-h4 font-weight-bold">{{ lowPriorityStories }}</div>
          <div class="text-subtitle-2">Baja Prioridad</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="info" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-account-group</v-icon>
          <div class="text-h4 font-weight-bold">{{ totalStories }}</div>
          <div class="text-subtitle-2">Total Historias</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- User Stories Table -->
    <v-card elevation="2" rounded="lg">
      <v-card-title class="d-flex align-center pa-6">
        <v-icon class="mr-3">mdi-account-group</v-icon>
        Lista de Historias de Usuario
      </v-card-title>
      <v-divider></v-divider>
      <UserStoryList
        :userStories="userStoriesStore.userStories"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </v-card>

    <!-- Form Dialog -->
    <v-dialog v-model="showForm" max-width="800" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex align-center pa-6 bg-primary text-white">
          <v-icon class="mr-3">{{ selectedStory ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
          {{ selectedStory ? 'Editar Historia' : 'Nueva Historia de Usuario' }}
        </v-card-title>
        <v-card-text class="pa-6">
          <UserStoryForm
            :userStory="selectedStory"
            @save="handleSave"
            @cancel="handleCancel"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStoriesStore } from '../store/userStories'
import { useProjectsStore } from '../store/projects'
import UserStoryList from '../components/UserStory/UserStoryList.vue'
import UserStoryForm from '../components/UserStory/UserStoryForm.vue'
import { api } from '../services/api'

const userStoriesStore = useUserStoriesStore()
const projectsStore = useProjectsStore()

const showForm = ref(false)
const selectedStory = ref(null)
const loading = ref(false)
const error = ref(null)

const userStories = computed(() => userStoriesStore.userStories)
const totalStories = computed(() => userStories.value.length)
const highPriorityStories = computed(() => userStories.value.filter(s => s.priority === 'Alta').length)
const mediumPriorityStories = computed(() => userStories.value.filter(s => s.priority === 'Media').length)
const lowPriorityStories = computed(() => userStories.value.filter(s => s.priority === 'Baja').length)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const stories = await api.getUserStories()
    userStoriesStore.setUserStories(stories)
  } catch (err) {
    if (err.response) {
      // Error de respuesta del servidor
      switch (err.response.status) {
        case 404:
          error.value = 'No se encontró el endpoint de historias de usuario. Verifique la URL de la API.'
          break
        case 500:
          error.value = 'Error interno del servidor. Por favor, intente más tarde.'
          break
        default:
          error.value = `Error del servidor (${err.response.status}): ${err.response.data?.detail || err.message}`
      }
    } else if (err.request) {
      // Error de red (no se recibió respuesta)
      error.value = 'No se pudo conectar con el servidor. Verifique su conexión a internet y que el servidor esté funcionando.'
    } else {
      // Otros errores
      error.value = `Error al cargar las historias: ${err.message}`
    }
  } finally {
    loading.value = false
  }
})

async function handleSave(story) {
  try {
    loading.value = true
    error.value = null
    
    if (selectedStory.value) {
      // Actualizar historia existente
      await api.updateUserStory(selectedStory.value.id, story)
    } else {
      // Crear nueva historia
      await api.addUserStory(story)
    }
    
    // Recargar todas las historias para asegurar que la lista esté actualizada
    const stories = await api.getUserStories()
    userStoriesStore.setUserStories(stories)
    
    showForm.value = false
    selectedStory.value = null
  } catch (err) {
    error.value = 'Error al guardar la historia de usuario. Por favor, intente nuevamente.'
  } finally {
    loading.value = false
  }
}

async function handleDelete(id) {
  try {
    loading.value = true
    error.value = null
    await api.deleteUserStory(id)
    userStoriesStore.deleteUserStory(id)
  } catch (err) {
    error.value = 'Error al eliminar la historia de usuario. Por favor, intente nuevamente.'
  } finally {
    loading.value = false
  }
}

function handleEdit(story) {
  selectedStory.value = story
  showForm.value = true
}

function handleCancel() {
  selectedStory.value = null
  showForm.value = false
  error.value = null
}
</script>