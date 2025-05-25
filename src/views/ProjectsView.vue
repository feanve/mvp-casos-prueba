<template>
  <v-container fluid class="pa-6">
    <!-- Header Section -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h3 font-weight-bold text-primary mb-2">Proyectos</h1>
        <p class="text-subtitle-1 text-grey">Gestiona todos tus proyectos de testing</p>
      </div>
      <v-btn 
        color="primary" 
        size="large"
        @click="openForm()"
        prepend-icon="mdi-plus"
        elevation="2"
      >
        Nuevo Proyecto
      </v-btn>
    </div>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card color="success" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-check-circle</v-icon>
          <div class="text-h4 font-weight-bold">{{ activeProjects }}</div>
          <div class="text-subtitle-2">Proyectos Activos</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="warning" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-pause-circle</v-icon>
          <div class="text-h4 font-weight-bold">{{ inactiveProjects }}</div>
          <div class="text-subtitle-2">Proyectos Inactivos</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="info" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-folder-multiple</v-icon>
          <div class="text-h4 font-weight-bold">{{ totalProjects }}</div>
          <div class="text-subtitle-2">Total Proyectos</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="primary" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-calendar-today</v-icon>
          <div class="text-h4 font-weight-bold">{{ recentProjects }}</div>
          <div class="text-subtitle-2">Recientes</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Projects Table -->
    <v-card elevation="2" rounded="lg">
      <v-card-title class="d-flex align-center pa-6">
        <v-icon class="mr-3">mdi-folder-multiple</v-icon>
        Lista de Proyectos
      </v-card-title>
      <v-divider></v-divider>
      <ProjectList
        :projects="projects"
        :loading="loading"
        @edit="openForm"
        @delete="deleteProject"
      />
    </v-card>

    <!-- Form Dialog -->
    <v-dialog v-model="showForm" max-width="600" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center pa-6 bg-primary text-white">
          <div class="d-flex align-center">
            <v-icon class="mr-3">{{ selectedProject ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
            {{ selectedProject ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
          </div>
          <v-span icon @click="closeForm" class="text-white bg-transparent cursor-pointer">
            <v-icon>mdi-close</v-icon>
          </v-span>
        </v-card-title>
        <v-card-text class="pa-6">
          <ProjectForm
            :project="selectedProject"
            @save="saveProject"
            @cancel="closeForm"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProjectsStore } from '../store/projects'
import ProjectList from '../components/Project/ProjectList.vue'
import ProjectForm from '../components/Project/ProjectForm.vue'

const store = useProjectsStore()
const showForm = ref(false)
const selectedProject = ref(null)

const projects = computed(() => store.projects)
const loading = computed(() => store.loading)
const totalProjects = computed(() => projects.value.length)
const activeProjects = computed(() => projects.value.filter(p => p.status).length)
const inactiveProjects = computed(() => projects.value.filter(p => !p.status).length)
const recentProjects = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return projects.value.filter(p => new Date(p.created_at) > oneWeekAgo).length
})

onMounted(() => {
  store.fetchProjects()
})

function openForm(project = null) {
  selectedProject.value = project
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedProject.value = null
}

async function saveProject(data) {
  if (selectedProject.value) {
    await store.updateProject(selectedProject.value.id, data)
  } else {
    await store.addProject(data)
  }
  closeForm()
}

async function deleteProject(project) {
  if (confirm('¿Eliminar este proyecto?')) {
    await store.deleteProject(project.id)
  }
}
</script>
