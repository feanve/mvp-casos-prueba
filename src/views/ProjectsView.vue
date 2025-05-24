<template>
  <v-container>
    <h1>Proyectos</h1>
    <v-btn color="primary" @click="openForm()">Nuevo Proyecto</v-btn>
    <ProjectList
      :projects="projects"
      :loading="loading"
      @edit="openForm"
      @delete="deleteProject"
    />
    <v-dialog v-model="showForm" max-width="500">
      <ProjectForm
        :project="selectedProject"
        @save="saveProject"
        @cancel="closeForm"
      />
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
