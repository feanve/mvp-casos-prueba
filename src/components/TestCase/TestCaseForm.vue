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
    <v-text-field
      v-model="form.actual_result"
      label="Resultado actual"
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
    <div class="d-flex gap-3 mt-6">
      <v-btn type="submit" color="primary" :disabled="!valid" prepend-icon="mdi-content-save" size="large">
        {{ isEdit ? 'Actualizar' : 'Crear' }}
      </v-btn>
      <v-btn @click="$emit('cancel')" color="grey" variant="outlined" prepend-icon="mdi-close" size="large">
        Cancelar
      </v-btn>
    </div>
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
  id_us: null,
  description: '',
  priority: 'media',
  preconditions: '',
  input_data: '',
  steps: '',
  expected_result: '',
  actual_result: '',
  test_status: null
})
const valid = ref(false)
const formRef = ref(null)

const isEdit = computed(() => !!props.testCase)

watch(() => props.testCase, (val) => {
  if (val) {
    form.id_us = val.id_us
    form.description = val.description
    form.priority = val.priority
    form.preconditions = val.preconditions
    form.input_data = val.input_data
    form.steps = val.steps
    form.expected_result = val.expected_result
    form.actual_result = val.actual_result
    form.test_status = val.test_status
  } else {
    form.id_us = null
    form.description = ''
    form.priority = 'media'
    form.preconditions = ''
    form.input_data = ''
    form.steps = ''
    form.expected_result = ''
    form.actual_result = ''
    form.test_status = null
  }
}, { immediate: true })

function onSubmit() {
  emit('save', { ...form })
  if (!isEdit.value) {
    form.id_us = null
    form.description = ''
    form.priority = 'media'
    form.preconditions = ''
    form.input_data = ''
    form.steps = ''
    form.expected_result = ''
    form.actual_result = ''
    form.test_status = null
    formRef.value.resetValidation()
  }
}
</script>
