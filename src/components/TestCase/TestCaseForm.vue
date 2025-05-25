<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-select
      v-model="form.id_us"
      :items="userStories"
      item-title="name"
      item-value="id"
      label="Historia de Usuario"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-account-group"
      variant="outlined"
      class="mb-4"
      required
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-truncate">
            {{ item.raw.description }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-select>

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
      v-model="form.preconditions"
      label="Precondiciones"
      prepend-inner-icon="mdi-clipboard-list"
      variant="outlined"
      class="mb-4"
      hint="Condiciones que deben cumplirse antes de ejecutar la prueba"
      persistent-hint
    />

    <v-textarea
      v-model="form.input_data"
      label="Datos de entrada"
      prepend-inner-icon="mdi-database"
      variant="outlined"
      class="mb-4"
      hint="Datos necesarios para ejecutar la prueba"
      persistent-hint
    />

    <v-textarea
      v-model="form.steps"
      label="Pasos"
      prepend-inner-icon="mdi-format-list-numbered"
      variant="outlined"
      class="mb-4"
      hint="Pasos a seguir para ejecutar la prueba (uno por línea)"
      persistent-hint
      rows="4"
    />

    <v-textarea
      v-model="form.expected_result"
      label="Resultado esperado"
      prepend-inner-icon="mdi-check-circle"
      variant="outlined"
      class="mb-4"
      hint="Resultado que se espera obtener al ejecutar la prueba"
      persistent-hint
    />

    <v-textarea
      v-if="isEdit"
      v-model="form.actual_result"
      label="Resultado actual"
      prepend-inner-icon="mdi-clipboard-check"
      variant="outlined"
      class="mb-4"
      hint="Resultado real obtenido al ejecutar la prueba"
      persistent-hint
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
      prepend-inner-icon="mdi-state-machine"
      variant="outlined"
      class="mb-6"
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
  actual_result: '',
  test_status: null,
  id_us: null
})
const valid = ref(false)
const formRef = ref(null)

const isEdit = computed(() => !!props.testCase)

watch(() => props.testCase, (val) => {
  if (val) {
    form.description = val.description
    form.priority = val.priority.charAt(0).toUpperCase() + val.priority.slice(1)
    form.preconditions = val.preconditions || ''
    form.input_data = val.input_data || ''
    form.steps = val.steps || ''
    form.expected_result = val.expected_result || ''
    form.actual_result = val.actual_result || ''
    form.test_status = val.test_status
    form.id_us = val.id_us
  } else {
    form.description = ''
    form.priority = 'Media'
    form.preconditions = ''
    form.input_data = ''
    form.steps = ''
    form.expected_result = ''
    form.actual_result = ''
    form.test_status = null
    form.id_us = null
  }
}, { immediate: true })

function onSubmit() {
  // Aseguramos que los datos estén en el formato exacto que espera la API
  const formData = {
    description: form.description.trim(),
    priority: form.priority, // Mantenemos la primera letra en mayúscula como espera la API
    preconditions: form.preconditions?.trim() || '',
    input_data: form.input_data?.trim() || '',
    steps: form.steps?.trim() || '',
    expected_result: form.expected_result?.trim() || '',
    actual_result: form.actual_result?.trim() || '',
    test_status: form.test_status, // Ya viene como booleano o null del select
    id_us: Number(form.id_us)
  }
  emit('save', formData)
  
  if (!isEdit.value) {
    form.description = ''
    form.priority = 'Media'
    form.preconditions = ''
    form.input_data = ''
    form.steps = ''
    form.expected_result = ''
    form.actual_result = ''
    form.test_status = null
    form.id_us = null
    formRef.value.resetValidation()
  }
}
</script>
