<template>
  <v-container>
    <h1>Casos de Prueba</h1>
    <v-btn color="primary" @click="openForm()">Nuevo Caso de Prueba</v-btn>
    <TestCaseList
      :testCases="testCases"
      :loading="loading"
      @edit="openForm"
      @delete="deleteTestCase"
    />
    <v-dialog v-model="showForm" max-width="700">
      <TestCaseForm
        :testCase="selectedTestCase"
        @save="saveTestCase"
        @cancel="closeForm"
      />
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

<style lang="scss" scoped>

</style>