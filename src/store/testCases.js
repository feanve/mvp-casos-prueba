import { defineStore } from 'pinia'
import { testCasesApi } from '../services/api'

export const useTestCasesStore = defineStore('testCases', {
  state: () => ({
    testCases: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTestCases() {
      this.loading = true
      try {
        this.testCases = await testCasesApi.getAll()
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
    async addTestCase(testCase) {
      const newTestCase = await testCasesApi.create(testCase)
      this.testCases.push(newTestCase)
    },
    async updateTestCase(id, data) {
      const updated = await testCasesApi.update(id, data)
      const idx = this.testCases.findIndex(tc => tc.id === id)
      if (idx !== -1) this.testCases[idx] = updated
    },
    async deleteTestCase(id) {
      await testCasesApi.delete(id)
      this.testCases = this.testCases.filter(tc => tc.id !== id)
    }
  }
})
