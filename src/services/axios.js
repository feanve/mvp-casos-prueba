import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/', // Cambia si tu backend está en otro puerto
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar el token JWT si existe
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  console.log("Token", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
