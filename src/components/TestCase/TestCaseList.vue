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

    <template #item.history_detail="{ item }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-chip color="info" variant="tonal" size="small" v-bind="props" class="text-truncate" style="max-width: 200px;">
            <v-icon start>mdi-account-group</v-icon>
            {{ item.history_detail?.name || 'Sin historia' }}
          </v-chip>
        </template>
        <div class="pa-2">
          <div class="font-weight-bold mb-1">{{ item.history_detail?.name }}</div>
          <div class="text-caption">{{ item.history_detail?.description }}</div>
        </div>
      </v-tooltip>
    </template>

    <template #item.description="{ item }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="text-truncate d-inline-block" style="max-width: 200px;">
            {{ truncateText(item.description, 150) }}
          </span>
        </template>
        <span>{{ item.description }}</span>
      </v-tooltip>
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
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="text-truncate d-inline-block" style="max-width: 150px;">
            {{ truncateText(item.preconditions, 100) || '-' }}
          </span>
        </template>
        <span>{{ item.preconditions || '-' }}</span>
      </v-tooltip>
    </template>

    <template #item.steps="{ item }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="text-truncate d-inline-block" style="max-width: 200px;">
            {{ truncateText(item.steps, 150) }}
          </span>
        </template>
        <span style="white-space: pre-line">{{ item.steps }}</span>
      </v-tooltip>
    </template>

    <template #item.expected_result="{ item }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <span v-bind="props" class="text-truncate d-inline-block" style="max-width: 200px;">
            {{ truncateText(item.expected_result, 150) }}
          </span>
        </template>
        <span>{{ item.expected_result }}</span>
      </v-tooltip>
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
  { title: 'Historia de Usuario', key: 'history_detail', width: '200px' },
  { title: 'Descripción', key: 'description', width: '200px' },
  { title: 'Prioridad', key: 'priority', width: '120px' },
  { title: 'Precondiciones', key: 'preconditions', width: '150px' },
  { title: 'Pasos', key: 'steps', width: '200px' },
  { title: 'Resultado Esperado', key: 'expected_result', width: '200px' },
  { title: 'Estado', key: 'test_status', width: '120px' },
  { title: 'Acciones', key: 'actions', sortable: false, width: '120px' }
]

function truncateText(text, maxLength) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

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