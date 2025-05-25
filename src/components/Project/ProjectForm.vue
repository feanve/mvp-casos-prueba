<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-text-field
      v-model="form.name"
      label="Nombre del Proyecto"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-folder"
      variant="outlined"
      class="mb-4"
      required
    />
    
    <v-switch
      v-model="form.status"
      label="Proyecto Activo"
      color="success"
      class="mb-4"
      hide-details
    >
      <template #prepend>
        <v-icon :color="form.status ? 'success' : 'grey'">
          {{ form.status ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
      </template>
    </v-switch>

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
