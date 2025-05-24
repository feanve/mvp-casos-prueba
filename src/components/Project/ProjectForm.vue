<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-text-field
      v-model="form.name"
      label="Nombre del Proyecto"
      :rules="[v => !!v || 'Requerido']"
      required
    />
    <v-switch
      v-model="form.status"
      label="Activo"
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
  project: Object
})
const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  name: '',
  status: true
})
const valid = ref(false)
const formRef = ref(null)

const isEdit = computed(() => !!props.project)

watch(() => props.project, (val) => {
  if (val) {
    form.name = val.name
    form.status = val.status
  } else {
    form.name = ''
    form.status = true
  }
}, { immediate: true })

function onSubmit() {
  emit('save', { ...form })
  if (!isEdit.value) {
    form.name = ''
    form.status = true
    formRef.value.resetValidation()
  }
}
</script>
