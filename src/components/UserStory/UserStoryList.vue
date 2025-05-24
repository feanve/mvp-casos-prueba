<template>
  <v-data-table
    :headers="headers"
    :items="userStories"
    :loading="loading"
    class="elevation-1"
  >
    <template #item.priority="{ item }">
      <v-chip :color="priorityColor(item.priority)" dark>
        {{ item.priority }}
      </v-chip>
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

<script setup>
const props = defineProps(['userStories', 'loading'])
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Nombre', value: 'name' },
  { text: 'Descripción', value: 'description' },
  { text: 'Prioridad', value: 'priority' },
  { text: 'Criterios de Aceptación', value: 'accept_criteria' },
  { text: 'Acciones', value: 'actions', sortable: false }
]

function priorityColor(priority) {
  if (priority === 'Alta') return 'red'
  if (priority === 'Media') return 'orange'
  return 'green'
}
</script>
