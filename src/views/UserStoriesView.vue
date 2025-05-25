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
        @click="openForm()"
        prepend-icon="mdi-plus"
        elevation="2"
      >
        Nueva Historia
      </v-btn>
    </div>

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
        :userStories="userStories"
        :loading="loading"
        @edit="openForm"
        @delete="deleteUserStory"
      />
    </v-card>

    <!-- Form Dialog -->
    <v-dialog v-model="showForm" max-width="800" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex align-center pa-6 bg-primary text-white">
          <v-icon class="mr-3">{{ selectedUserStory ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
          {{ selectedUserStory ? 'Editar Historia' : 'Nueva Historia de Usuario' }}
        </v-card-title>
        <v-card-text class="pa-6">
          <UserStoryForm
            :userStory="selectedUserStory"
            @save="saveUserStory"
            @cancel="closeForm"
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

const store = useUserStoriesStore()
const projectsStore = useProjectsStore()
const showForm = ref(false)
const selectedUserStory = ref(null)

const userStories = computed(() => store.userStories)
const loading = computed(() => store.loading)
const totalStories = computed(() => userStories.value.length)
const highPriorityStories = computed(() => userStories.value.filter(s => s.priority === 'Alta').length)
const mediumPriorityStories = computed(() => userStories.value.filter(s => s.priority === 'Media').length)
const lowPriorityStories = computed(() => userStories.value.filter(s => s.priority === 'Baja').length)

onMounted(() => {
  store.fetchUserStories()
  projectsStore.fetchProjects() // Cargar proyectos para el formulario
})

function openForm(userStory = null) {
  selectedUserStory.value = userStory
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedUserStory.value = null
}

async function saveUserStory(data) {
  if (selectedUserStory.value) {
    await store.updateUserStory(selectedUserStory.value.id, data)
  } else {
    await store.addUserStory(data)
  }
  closeForm()
}

async function deleteUserStory(userStory) {
  if (confirm('¿Eliminar esta historia de usuario?')) {
    await store.deleteUserStory(userStory.id)
  }
}
</script>