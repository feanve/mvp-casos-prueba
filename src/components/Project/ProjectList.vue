<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    :loading="loading"
    class="elevation-0"
    :items-per-page="10"
  >
    <template #loading>
      <v-skeleton-loader type="table-row@6"></v-skeleton-loader>
    </template>
    
    <template #no-data>
      <div class="text-center pa-8">
        <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-folder-open</v-icon>
        <h3 class="text-h6 mb-2">No hay proyectos</h3>
        <p class="text-grey">Crea tu primer proyecto para comenzar</p>
      </div>
    </template>

    <template #item.status="{ item }">
      <v-chip 
        :color="item.status ? 'success' : 'error'" 
        variant="tonal"
        size="small"
      >
        <v-icon start>{{ item.status ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
        {{ item.status ? 'Activo' : 'Inactivo' }}
      </v-chip>
    </template>

    <template #item.created_at="{ item }">
      <span class="text-caption">{{ formatDate(item.created_at) }}</span>
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
const props = defineProps(['projects', 'loading'])

const headers = [
  { title: 'ID', key: 'id', width: '80px' },
  { title: 'Nombre', key: 'name' },
  { title: 'Estado', key: 'status', width: '120px' },
  { title: 'Creado', key: 'created_at', width: '120px' },
  { title: 'Acciones', key: 'actions', sortable: false, width: '120px' }
]

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
