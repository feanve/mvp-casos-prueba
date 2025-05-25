<template>
  <v-data-table
    :headers="headers"
    :items="testCases"
    :loading="loading"
    class="elevation-0"
    :items-per-page="10"
  >
    <template #loading>
      <v-skeleton-loader type="table-row@6"></v-skeleton-loader>
    </template>
    
    <template #no-data>
      <div class="text-center pa-8">
        <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-clipboard-check</v-icon>
        <h3 class="text-h6 mb-2">No hay casos de prueba</h3>
        <p class="text-grey">Crea tu primer caso de prueba para comenzar</p>
      </div>
    </template>

    <template #item.id_us="{ item }">
      <v-chip color="info" variant="tonal" size="small">
        <v-icon start>mdi-account-group</v-icon>
        {{ userStoriesMap[item.id_us] || 'Sin historia' }}
      </v-chip>
    </template>

    <template #item.description="{ item }">
      <span class="text-truncate" style="max-width: 200px;">{{ item.description }}</span>
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

    <template #item.preconditions="{ item }">
      <span class="text-truncate" style="max-width: 150px;">{{ item.preconditions || '-' }}</span>
    </template>

    <template #item.test_status="{ item }">
      <v-chip 
        v-if="item.test_status === true" 
        color="success" 
        variant="tonal"
        size="small"
      >
        <v-icon start>mdi-check-circle</v-icon>
        OK
      </v-chip>
      <v-chip 
        v-else-if="item.test_status === false" 
        color="error" 
        variant="tonal"
        size="small"
      >
        <v-icon start>mdi-close-circle</v-icon>
        FAIL
      </v-chip>
      <v-chip 
        v-else 
        color="warning" 
        variant="tonal"
        size="small"
      >
        <v-icon start>mdi-clock-outline</v-icon>
        PENDIENTE
      </v-chip>
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
import { useUserStoriesStore } from '../../store/userStories'

const userStoriesStore = useUserStoriesStore()
const userStoriesMap = computed(() => {
  const map = {}
  userStoriesStore.userStories.forEach(us => { map[us.id] = us.name })
  return map
})

const props = defineProps(['testCases', 'loading'])
const emit = defineEmits(['edit', 'delete'])

const headers = [
  { title: 'ID', key: 'id', width: '80px' },
  { title: 'Historia de Usuario', key: 'id_us', width: '200px' },
  { title: 'Descripción', key: 'description', width: '250px' },
  { title: 'Prioridad', key: 'priority', width: '120px' },
  { title: 'Precondiciones', key: 'preconditions', width: '180px' },
  { title: 'Estado', key: 'test_status', width: '120px' },
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