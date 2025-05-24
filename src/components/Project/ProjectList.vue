<!-- src/components/Project/ProjectList.vue -->
<template>
    <v-data-table
      :headers="headers"
      :items="projects"
      :loading="loading"
      class="elevation-1"
    >
      <template #item.status="{ item }">
        <v-chip :color="item.status ? 'green' : 'red'" dark>
          {{ item.status ? 'Activo' : 'Inactivo' }}
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
  const props = defineProps(['projects', 'loading'])
  const headers = [
    { text: 'ID', value: 'id' },
    { text: 'Nombre', value: 'name' },
    { text: 'Estado', value: 'status' },
    { text: 'Acciones', value: 'actions', sortable: false }
  ]
  </script>