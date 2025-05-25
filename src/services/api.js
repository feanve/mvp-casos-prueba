import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

// Configuración de axios para mejor manejo de errores
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export const api = {
  // Proyectos - Conectados a API real
  async getProjects() {
    try {
      const response = await axios.get(`${API_URL}/projects/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async addProject(project) {
    try {
      const response = await axios.post(`${API_URL}/projects/`, project)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateProject(id, data) {
    try {
      const response = await axios.put(`${API_URL}/projects/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteProject(id) {
    try {
      await axios.delete(`${API_URL}/projects/${id}/`)
    } catch (error) {
      throw error
    }
  },

  // Historias de usuario - Conectadas a API real
  async getUserStories() {
    try {
      const response = await axios.get(`${API_URL}/histories/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async addUserStory(story) {
    try {
      // Transformamos los datos para que coincidan con la API
      const data = {
        project: story.id_project,
        name: story.name,
        description: story.description,
        priority: story.priority.toLowerCase(),
        criteria: story.accept_criteria
      }
      const response = await axios.post(`${API_URL}/histories/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateUserStory(id, story) {
    try {
      // Transformamos los datos para que coincidan con la API
      const data = {
        project: story.id_project,
        name: story.name,
        description: story.description,
        priority: story.priority.toLowerCase(),
        criteria: story.accept_criteria
      }
      const response = await axios.put(`${API_URL}/histories/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteUserStory(id) {
    try {
      await axios.delete(`${API_URL}/histories/${id}/`)
    } catch (error) {
      throw error
    }
  },

  // Casos de prueba - Conectados a API real
  async getTestCases() {
    try {
      const response = await axios.get(`${API_URL}/test_cases/`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async addTestCase(testCase) {
    try {
      // Transformamos los datos para que coincidan con la API
      const data = {
        description: testCase.description,
        priority: testCase.priority,
        preconditions: testCase.preconditions,
        input_data: testCase.input_data,
        steps: testCase.steps,
        expected_result: testCase.expected_result,
        actual_result: testCase.actual_result || '',
        test_status: testCase.test_status,
        id_us: testCase.id_us
      }
      const response = await axios.post(`${API_URL}/test_cases/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async updateTestCase(id, testCase) {
    try {
      // Transformamos los datos para que coincidan con la API
      const data = {
        description: testCase.description,
        priority: testCase.priority,
        preconditions: testCase.preconditions,
        input_data: testCase.input_data,
        steps: testCase.steps,
        expected_result: testCase.expected_result,
        actual_result: testCase.actual_result || '',
        test_status: testCase.test_status,
        id_us: testCase.id_us
      }
      const response = await axios.put(`${API_URL}/test_cases/${id}/`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteTestCase(id) {
    try {
      await axios.delete(`${API_URL}/test_cases/${id}/`)
    } catch (error) {
      throw error
    }
  }
}