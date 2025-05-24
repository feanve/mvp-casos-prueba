import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useTestCasesStore = defineStore('testCases', {
  state: () => ({
    testCases: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTestCases() {
      this.loading = true
      this.testCases = await api.getTestCases()
      this.loading = false
    },
    async addTestCase(testCase) {
      const newTestCase = await api.addTestCase(testCase)
      this.testCases.push(newTestCase)
    },
    async updateTestCase(id, data) {
      const updated = await api.updateTestCase(id, data)
      const idx = this.testCases.findIndex(tc => tc.id === id)
      if (idx !== -1) this.testCases[idx] = updated
    },
    async deleteTestCase(id) {
      await api.deleteTestCase(id)
      this.testCases = this.testCases.filter(tc => tc.id !== id)
    }
  }
})
