<script setup>
import { computed } from 'vue'
import { useUserStoriesStore } from '../../store/userStories'

const props = defineProps(['testCases', 'loading'])
const userStoriesStore = useUserStoriesStore()
const userStoriesMap = computed(() => {
  const map = {}
  userStoriesStore.userStories.forEach(us => { map[us.id] = us.name })
  return map
})

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Historia de Usuario', value: 'id_us' },
  { text: 'Descripción', value: 'description' },
  { text: 'Prioridad', value: 'priority' },
  { text: 'Precondiciones', value: 'preconditions' },
  { text: 'Estado', value: 'test_status' },
  { text: 'Acciones', value: 'actions', sortable: false }
]

function priorityColor(priority) {
  if (priority === 'Alta') return 'red'
  if (priority === 'Media') return 'orange'
  return 'green'
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testCases"
    :loading="loading"
    class="elevation-1"
  >
    <template #item.id_us="{ item }">
      <span>{{ userStoriesMap[item.id_us] || 'Sin historia' }}</span>
    </template>
    <template #item.priority="{ item }">
      <v-chip :color="priorityColor(item.priority)" dark>
        {{ item.priority }}
      </v-chip>
    </template>
    <template #item.test_status="{ item }">
      <v-chip v-if="item.test_status === true" color="green" dark>OK</v-chip>
      <v-chip v-else-if="item.test_status === false" color="red" dark>FAIL</v-chip>
      <v-chip v-else color="grey" dark>PENDIENTE</v-chip>
    </template>
    <template #item.actions="{ item }">
      <v-btn icon @click="$emit('edit', item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('delete', item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>