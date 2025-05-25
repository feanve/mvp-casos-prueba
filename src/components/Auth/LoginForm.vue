<template>
  <v-form @submit.prevent="onSubmit" v-model="valid">
    <v-text-field
      v-model="form.username"
      label="Usuario"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-account"
      variant="outlined"
      class="mb-3"
      required
    />
    <v-text-field
      v-model="form.password"
      label="Contraseña"
      type="password"
      :rules="[v => !!v || 'Requerido']"
      prepend-inner-icon="mdi-lock"
      variant="outlined"
      class="mb-4"
      required
    />
    <v-btn 
      type="submit" 
      color="primary" 
      :loading="loading" 
      :disabled="!valid"
      size="large"
      block
      class="mb-3"
    >
      <v-icon start>mdi-login</v-icon>
      Ingresar
    </v-btn>
    <v-alert v-if="error" type="error" variant="tonal" class="mt-3">
      <v-icon start>mdi-alert-circle</v-icon>
      {{ error }}
    </v-alert>
  </v-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  loading: Boolean,
  error: String
})
const emit = defineEmits(['login'])

const form = reactive({
  username: '',
  password: ''
})
const valid = ref(false)

function onSubmit() {
  emit('login', { ...form })
}
</script>
