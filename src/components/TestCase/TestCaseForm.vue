<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-select
      v-model="form.id_us"
      :items="userStories"
      item-title="name"
      item-value="id"
      label="Historia de Usuario"
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
    <v-text-field
      v-model="form.preconditions"
      label="Precondiciones"
    />
    <v-text-field
      v-model="form.input_data"
      label="Datos de entrada"
    />
    <v-textarea
      v-model="form.steps"
      label="Pasos"
    />
    <v-text-field
      v-model="form.expected_result"
      label="Resultado esperado"
    />
    <v-select
      v-model="form.test_status"
      :items="[
        { text: 'Pendiente', value: null },
        { text: 'OK', value: true },
        { text: 'FAIL', value: false }
      ]"
      label="Estado de prueba"
      item-title="text"
      item-value="value"
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
import { useUserStoriesStore } from '../../store/userStories'

const props = defineProps({
  testCase: Object
})
const emit = defineEmits(['save', 'cancel'])

const userStoriesStore = useUserStoriesStore()
const userStories = computed(() => userStoriesStore.userStories)

const form = reactive({
  description: '',
  priority: 'Media',
  preconditions: '',
  input_data: '',
  steps: '',
  expected_result: '',
  test_status: null,
  id_us: null // Relación con historia de usuario
})
const valid = ref(false)
const formRef = ref(null)

const isEdit = computed(() => !!props.testCase)

watch(() => props.testCase, (val) => {
  if (val) {
    form.description = val.description
    form.priority = val.priority
    form.preconditions = val.preconditions
    form.input_data = val.input_data
    form.steps = val.steps
    form.expected_result = val.expected_result
    form.test_status = val.test_status
    form.id_us = val.id_us
  } else {
    form.description = ''
    form.priority = 'Media'
    form.preconditions = ''
    form.input_data = ''
    form.steps = ''
    form.expected_result = ''
    form.test_status = null
    form.id_us = null
  }
}, { immediate: true })

function onSubmit() {
  emit('save', { ...form })
  if (!isEdit.value) {
    form.description = ''
    form.priority = 'Media'
    form.preconditions = ''
    form.input_data = ''
    form.steps = ''
    form.expected_result = ''
    form.test_status = null
    form.id_us = null
    formRef.value.resetValidation()
  }
}
</script>
