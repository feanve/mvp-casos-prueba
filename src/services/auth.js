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
