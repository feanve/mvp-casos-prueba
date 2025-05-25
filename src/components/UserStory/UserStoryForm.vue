<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-select
      v-model="form.id_project"
      :items="projects"
      item-title="name"
      item-value="id"
      label="Proyecto"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-folder"
      variant="outlined"
      class="mb-4"
      required
    />
    
    <v-text-field
      v-model="form.name"
      label="Nombre de la Historia"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-account-group"
      variant="outlined"
      class="mb-4"
      required
    />
    
    <v-textarea
      v-model="form.description"
      label="Descripción"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-text"
      variant="outlined"
      class="mb-4"
      required
    />
    
    <v-select
      v-model="form.priority"
      :items="['Alta', 'Media', 'Baja']"
      label="Prioridad"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-flag"
      variant="outlined"
      class="mb-4"
      required
    />
    
    <v-textarea
      v-model="form.accept_criteria"
      label="Criterios de Aceptación"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-check-circle"
      variant="outlined"
      class="mb-6"
      required
    />

    <div class="d-flex gap-3 mt-6">
      <v-btn 
        type="submit" 
        color="primary" 
        :disabled="!valid"
        prepend-icon="mdi-content-save"
        size="large"
      >
        {{ isEdit ? 'Actualizar' : 'Crear' }}
      </v-btn>
      <v-btn 
        v-if="isEdit" 
        @click="$emit('cancel')" 
        color="grey"
        variant="outlined"
        prepend-icon="mdi-close"
        size="large"
      >
        Cancelar
      </v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { ref, watch, reactive, computed } from 'vue'
import { useProjectsStore } from '../../store/projects'

const props = defineProps({
  userStory: Object
})
const emit = defineEmits(['save', 'cancel'])

const projectsStore = useProjectsStore()
const projects = computed(() => projectsStore.projects.filter(p => p.status)) // Solo proyectos activos

const form = reactive({
  id_project: null,
  name: '',
  description: '',
  priority: 'Media',
  accept_criteria: ''
})
const valid = ref(false)
const formRef = ref(null)

const isEdit = computed(() => !!props.userStory)

watch(() => props.userStory, (val) => {
  if (val) {
    form.id_project = val.project
    form.name = val.name
    form.description = val.description
    form.priority = val.priority.charAt(0).toUpperCase() + val.priority.slice(1)
    form.accept_criteria = val.criteria
  } else {
    form.id_project = null
    form.name = ''
    form.description = ''
    form.priority = 'Media'
    form.accept_criteria = ''
  }
}, { immediate: true })

function onSubmit() {
  const formData = {
    ...form,
    priority: form.priority.toLowerCase()
  }
  emit('save', formData)
  
  if (!isEdit.value) {
    form.name = ''
    form.description = ''
    form.priority = 'Media'
    form.accept_criteria = ''
    form.id_project = null
    formRef.value.resetValidation()
  }
}
</script>