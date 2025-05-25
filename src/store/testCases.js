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
      this.error = null
      try {
        const cases = await api.getTestCases()
        this.testCases = cases
      } catch (err) {
        if (err.response) {
          // Error de respuesta del servidor
          switch (err.response.status) {
            case 404:
              this.error = 'No se encontró el endpoint de casos de prueba. Verifique la URL de la API.'
              break
            case 500:
              this.error = 'Error interno del servidor. Por favor, intente más tarde.'
              break
            default:
              this.error = `Error del servidor (${err.response.status}): ${err.response.data?.detail || err.message}`
          }
        } else if (err.request) {
          // Error de red (no se recibió respuesta)
          this.error = 'No se pudo conectar con el servidor. Verifique su conexión a internet y que el servidor esté funcionando.'
        } else {
          // Otros errores
          this.error = `Error al cargar los casos de prueba: ${err.message}`
        }
        throw err
      } finally {
        this.loading = false
      }
    },
    async addTestCase(testCase) {
      this.loading = true
      this.error = null
      try {
        // Validamos los datos antes de enviarlos
        if (!testCase.description?.trim()) {
          throw new Error('La descripción es requerida')
        }
        if (!testCase.id_us) {
          throw new Error('Debe seleccionar una historia de usuario')
        }
        if (!testCase.priority || !['Alta', 'Media', 'Baja'].includes(testCase.priority)) {
          throw new Error('La prioridad debe ser Alta, Media o Baja')
        }
        if (testCase.test_status !== null && typeof testCase.test_status !== 'boolean') {
          throw new Error('El estado de prueba debe ser OK, FAIL o Pendiente')
        }

        // Aseguramos que los campos opcionales sean cadenas vacías si no tienen valor
        const dataToSend = {
          ...testCase,
          preconditions: testCase.preconditions || '',
          input_data: testCase.input_data || '',
          steps: testCase.steps || '',
          expected_result: testCase.expected_result || '',
          actual_result: testCase.actual_result || ''
        }

        const newTestCase = await api.addTestCase(dataToSend)
        // Recargamos todos los casos para asegurar que tenemos los datos actualizados
        await this.fetchTestCases()
        return newTestCase
      } catch (err) {
        if (err.response) {
          // Error de respuesta del servidor
          switch (err.response.status) {
            case 400:
              this.error = `Error de validación: ${err.response.data?.detail || 'Datos inválidos'}`
              break
            case 404:
              this.error = 'No se encontró el endpoint de casos de prueba. Verifique la URL de la API.'
              break
            case 500:
              this.error = 'Error interno del servidor. Por favor, intente más tarde.'
              break
            default:
              this.error = `Error del servidor (${err.response.status}): ${err.response.data?.detail || err.message}`
          }
        } else if (err.request) {
          // Error de red (no se recibió respuesta)
          this.error = 'No se pudo conectar con el servidor. Verifique su conexión a internet y que el servidor esté funcionando.'
        } else {
          // Otros errores (incluyendo errores de validación)
          this.error = err.message
        }
        throw err
      } finally {
        this.loading = false
      }
    },
    async updateTestCase(id, data) {
      this.loading = true
      this.error = null
      try {
        // Validamos los datos antes de enviarlos
        if (!data.description?.trim()) {
          throw new Error('La descripción es requerida')
        }
        if (!data.id_us) {
          throw new Error('Debe seleccionar una historia de usuario')
        }
        if (!data.priority || !['Alta', 'Media', 'Baja'].includes(data.priority)) {
          throw new Error('La prioridad debe ser Alta, Media o Baja')
        }
        if (data.test_status !== null && typeof data.test_status !== 'boolean') {
          throw new Error('El estado de prueba debe ser OK, FAIL o Pendiente')
        }

        // Aseguramos que los campos opcionales sean cadenas vacías si no tienen valor
        const dataToSend = {
          ...data,
          preconditions: data.preconditions || '',
          input_data: data.input_data || '',
          steps: data.steps || '',
          expected_result: data.expected_result || '',
          actual_result: data.actual_result || ''
        }

        const updated = await api.updateTestCase(id, dataToSend)
        // Recargamos todos los casos para asegurar que tenemos los datos actualizados
        await this.fetchTestCases()
        return updated
      } catch (err) {
        if (err.response) {
          // Error de respuesta del servidor
          switch (err.response.status) {
            case 400:
              this.error = `Error de validación: ${err.response.data?.detail || 'Datos inválidos'}`
              break
            case 404:
              this.error = 'No se encontró el caso de prueba o el endpoint. Verifique la URL de la API.'
              break
            case 500:
              this.error = 'Error interno del servidor. Por favor, intente más tarde.'
              break
            default:
              this.error = `Error del servidor (${err.response.status}): ${err.response.data?.detail || err.message}`
          }
        } else if (err.request) {
          // Error de red (no se recibió respuesta)
          this.error = 'No se pudo conectar con el servidor. Verifique su conexión a internet y que el servidor esté funcionando.'
        } else {
          // Otros errores (incluyendo errores de validación)
          this.error = err.message
        }
        throw err
      } finally {
        this.loading = false
      }
    },
    async deleteTestCase(id) {
      this.loading = true
      this.error = null
      try {
        await api.deleteTestCase(id)
        // Recargamos todos los casos para asegurar que tenemos los datos actualizados
        await this.fetchTestCases()
      } catch (err) {
        if (err.response) {
          // Error de respuesta del servidor
          switch (err.response.status) {
            case 404:
              this.error = 'No se encontró el caso de prueba o el endpoint. Verifique la URL de la API.'
              break
            case 500:
              this.error = 'Error interno del servidor. Por favor, intente más tarde.'
              break
            default:
              this.error = `Error del servidor (${err.response.status}): ${err.response.data?.detail || err.message}`
          }
        } else if (err.request) {
          // Error de red (no se recibió respuesta)
          this.error = 'No se pudo conectar con el servidor. Verifique su conexión a internet y que el servidor esté funcionando.'
        } else {
          // Otros errores
          this.error = `Error al eliminar el caso de prueba: ${err.message}`
        }
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
