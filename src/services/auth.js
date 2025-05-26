import apiClient from './axios'

const users = [
  { username: 'admin', password: 'admin', name: 'Administrador', role: 'admin' },
  { username: 'tester', password: 'tester', name: 'Tester QA', role: 'tester' }
]

export function loginMock({ username, password }) {
  const user = users.find(
    u => u.username === username && u.password === password
  )
  if (user) {
    // No devuelvas la contraseña
    const { password, ...userData } = user
    return Promise.resolve(userData)
  } else {
    return Promise.reject('Usuario o contraseña incorrectos')
  }
}

export function login({ username, password }) {
  console.log("Credenciales", username, password)
  // Ajusta la URL según tu router de autenticación
  console.log("Credenciales en login", username, password)
  return apiClient.post('account/login/', { email: username, password })
    .then(res => {
      console.log("Respuesta", res)
      localStorage.setItem('token', res.data.access)
      return res.data
    })  
}

export function getMe() {
  return apiClient.get('account/me/')
    .then(res => res.data)
}
