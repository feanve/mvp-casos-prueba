<template>
  <v-container fluid class="pa-6">
    <!-- Header Section -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h3 font-weight-bold text-primary mb-2">Casos de Prueba</h1>
        <p class="text-subtitle-1 text-grey">Crea y ejecuta casos de prueba para validar funcionalidades</p>
      </div>
      <v-btn 
        color="primary" 
        size="large"
        @click="openForm()"
        prepend-icon="mdi-plus"
        elevation="2"
      >
        Nuevo Caso de Prueba
      </v-btn>
    </div>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card color="success" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-check-circle</v-icon>
          <div class="text-h4 font-weight-bold">{{ passedTests }}</div>
          <div class="text-subtitle-2">Pruebas OK</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="error" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-close-circle</v-icon>
          <div class="text-h4 font-weight-bold">{{ failedTests }}</div>
          <div class="text-subtitle-2">Pruebas FAIL</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="warning" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-clock-outline</v-icon>
          <div class="text-h4 font-weight-bold">{{ pendingTests }}</div>
          <div class="text-subtitle-2">Pendientes</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card color="info" variant="tonal" class="text-center pa-4">
          <v-icon size="40" class="mb-2">mdi-clipboard-check</v-icon>
          <div class="text-h4 font-weight-bold">{{ totalTests }}</div>
          <div class="text-subtitle-2">Total Casos</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Test Cases Table -->
    <v-card elevation="2" rounded="lg">
      <v-card-title class="d-flex align-center pa-6">
        <v-icon class="mr-3">mdi-clipboard-check</v-icon>
        Lista de Casos de Prueba
      </v-card-title>
      <v-divider></v-divider>
      <TestCaseList
        :testCases="testCases"
        :loading="loading"
        @edit="openForm"
        @delete="deleteTestCase"
      />
    </v-card>

    <!-- Form Dialog -->
    <v-dialog v-model="showForm" max-width="900" persistent>
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center pa-6 bg-primary text-white">
          <div class="d-flex align-center">
            <v-icon class="mr-3">{{ selectedTestCase ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
            {{ selectedTestCase ? 'Editar Caso de Prueba' : 'Nuevo Caso de Prueba' }}
          </div>
          <v-span icon @click="closeForm" class="text-white bg-transparent cursor-pointer">
            <v-icon>mdi-close</v-icon>
          </v-span>
        </v-card-title>
        <v-card-text class="pa-6">
          <TestCaseForm
            :testCase="selectedTestCase"
            @save="saveTestCase"
            @cancel="closeForm"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTestCasesStore } from '../store/testCases'
import { useUserStoriesStore } from '../store/userStories'
import TestCaseList from '../components/TestCase/TestCaseList.vue'
import TestCaseForm from '../components/TestCase/TestCaseForm.vue'

const store = useTestCasesStore()
const userStoriesStore = useUserStoriesStore()
const showForm = ref(false)
const selectedTestCase = ref(null)

const testCases = computed(() => store.testCases)
const loading = computed(() => store.loading)
const totalTests = computed(() => testCases.value.length)
const passedTests = computed(() => testCases.value.filter(tc => tc.test_status === true).length)
const failedTests = computed(() => testCases.value.filter(tc => tc.test_status === false).length)
const pendingTests = computed(() => testCases.value.filter(tc => tc.test_status === null).length)

onMounted(() => {
  store.fetchTestCases()
  userStoriesStore.fetchUserStories()
})

function openForm(testCase = null) {
  selectedTestCase.value = testCase
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedTestCase.value = null
}

async function saveTestCase(data) {
  if (selectedTestCase.value) {
    await store.updateTestCase(selectedTestCase.value.id, data)
  } else {
    await store.addTestCase(data)
  }
  closeForm()
}

async function deleteTestCase(testCase) {
  if (confirm('¿Eliminar este caso de prueba?')) {
    await store.deleteTestCase(testCase.id)
  }
}
</script>
