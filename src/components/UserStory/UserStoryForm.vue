<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-text-field
      v-model="form.name"
      label="Nombre de la Historia"
      :rules="[v => !!v || 'Requerido']"
      required
    />
    <v-textarea
      v-model="form.description"
      label="Descripción"
      :rules="[v => !!v || 'Requerido']"
      required
    />
    <v-select
      v-model="form.priority"
      :items="['Alta', 'Media', 'Baja']"
      label="Prioridad"
      :rules="[v => !!v || 'Requerido']"
      required
    />
    <v-textarea
      v-model="form.accept_criteria"
      label="Criterios de Aceptación"
      :rules="[v => !!v || 'Requerido']"
      required
    />
    <v-btn type="submit" color="primary" :disabled="!valid">
      {{ isEdit ? 'Actualizar' : 'Crear' }}
    </v-btn>
    <v-btn v-if="isEdit" @click="$emit('cancel')" color="grey">
      Cancelar
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref, watch, reactive, computed } from 'vue'

const props = defineProps({
  userStory: Object
})
const emit = defineEmits(['save', 'cancel'])

const form = reactive({
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
    form.name = val.name
    form.description = val.description
    form.priority = val.priority
    form.accept_criteria = val.accept_criteria
  } else {
    form.name = ''
    form.description = ''
    form.priority = 'Media'
    form.accept_criteria = ''
  }
}, { immediate: true })

function onSubmit() {
  emit('save', { ...form })
  if (!isEdit.value) {
    form.name = ''
    form.description = ''
    form.priority = 'Media'
    form.accept_criteria = ''
    formRef.value.resetValidation()
  }
}
</script>
