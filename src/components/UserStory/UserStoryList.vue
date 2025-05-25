<template>
  <v-data-table
    :headers="headers"
    :items="userStories"
    :loading="loading"
    class="elevation-0"
    :items-per-page="10"
  >
    <template #loading>
      <v-skeleton-loader type="table-row@6"></v-skeleton-loader>
    </template>
    
    <template #no-data>
      <div class="text-center pa-8">
        <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-account-group</v-icon>
        <h3 class="text-h6 mb-2">No hay historias de usuario</h3>
        <p class="text-grey">Crea tu primera historia para comenzar</p>
      </div>
    </template>

    <template #item.id_project="{ item }">
      <v-chip color="primary" variant="tonal" size="small">
        <v-icon start>mdi-folder</v-icon>
        {{ projectsMap[item.id_project] || 'Sin proyecto' }}
      </v-chip>
    </template>

    <template #item.priority="{ item }">
      <v-chip 
        :color="priorityColor(item.priority)" 
        variant="tonal"
        size="small"
      >
        <v-icon start>{{ priorityIcon(item.priority) }}</v-icon>
        {{ item.priority }}
      </v-chip>
    </template>

    <template #item.description="{ item }">
      <span class="text-truncate" style="max-width: 200px;">{{ item.description }}</span>
    </template>

    <template #item.accept_criteria="{ item }">
      <span class="text-truncate" style="max-width: 200px;">{{ item.accept_criteria }}</span>
    </template>

    <template #item.actions="{ item }">
      <div class="d-flex gap-1">
        <v-btn 
          icon="mdi-pencil" 
          size="small" 
          color="primary"
          variant="tonal"
          @click="$emit('edit', item)"
        ></v-btn>
        <v-btn 
          icon="mdi-delete" 
          size="small" 
          color="error"
          variant="tonal"
          @click="$emit('delete', item)"
        ></v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script setup>
import { computed } from 'vue'
import { useProjectsStore } from '../../store/projects'

const projectsStore = useProjectsStore()
const projectsMap = computed(() => {
  const map = {}
  projectsStore.projects.forEach(project => { map[project.id] = project.name })
  return map
})

const props = defineProps(['userStories', 'loading'])
const emit = defineEmits(['edit', 'delete'])

const headers = [
  { title: 'ID', key: 'id', width: '80px' },
  { title: 'Proyecto', key: 'id_project', width: '180px' },
  { title: 'Nombre', key: 'name', width: '200px' },
  { title: 'Descripción', key: 'description', width: '250px' },
  { title: 'Prioridad', key: 'priority', width: '120px' },
  { title: 'Criterios de Aceptación', key: 'accept_criteria', width: '250px' },
  { title: 'Acciones', key: 'actions', sortable: false, width: '120px' }
]

function priorityColor(priority) {
  if (priority === 'Alta') return 'error'
  if (priority === 'Media') return 'warning'
  return 'success'
}

function priorityIcon(priority) {
  if (priority === 'Alta') return 'mdi-alert-circle'
  if (priority === 'Media') return 'mdi-alert'
  return 'mdi-check-circle'
}
</script>