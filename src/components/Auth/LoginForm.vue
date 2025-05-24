<template>
  <v-form @submit.prevent="onSubmit" v-model="valid">
    <v-text-field
      v-model="form.username"
      label="Usuario"
      :rules="[v => !!v || 'Requerido']"
      required
    />
    <v-text-field
      v-model="form.password"
      label="Contraseña"
      type="password"
      :rules="[v => !!v || 'Requerido']"
      required
    />
    <v-btn type="submit" color="primary" :loading="loading" :disabled="!valid">
      Ingresar
    </v-btn>
    <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>
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
