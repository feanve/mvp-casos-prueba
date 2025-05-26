<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-select
      v-model="form.project"
      :items="projects"
      item-title="name"
      item-value="id"
      label="Proyecto"
      :rules="[v => !!v || 'Requerido']"
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
      :items="[
        { text: 'Alta', value: 'alta' },
        { text: 'Media', value: 'media' },
        { text: 'Baja', value: 'baja' }
      ]"
      label="Prioridad"
      :rules="[v => !!v || 'Requerido']"
      required
      item-title="text"
      item-value="value"
    />
    
    <v-textarea
      v-model="form.criteria"
      label="Criterios de Aceptación"
      :rules="[v => !!v || 'Requerido']"
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
  project: null,
  name: '',
  description: '',
  priority: 'media',
  criteria: ''
})
const valid = ref(false)
const formRef = ref(null)

const isEdit = computed(() => !!props.userStory)

watch(() => props.userStory, (val) => {
  if (val) {
    form.project = val.project
    form.name = val.name
    form.description = val.description
    form.priority = val.priority
    form.criteria = val.criteria
  } else {
    form.project = null
    form.name = ''
    form.description = ''
    form.priority = 'media'
    form.criteria = ''
  }
}, { immediate: true })

function onSubmit() {
  emit('save', { ...form })
  if (!isEdit.value) {
    form.project = null
    form.name = ''
    form.description = ''
    form.priority = 'media'
    form.criteria = ''
    formRef.value.resetValidation()
  }
}
</script>