let projects = [
  { id: 1, name: 'Proyecto Alpha', status: true, created_at: new Date(), updated_at: new Date() },
  { id: 2, name: 'Proyecto Beta', status: false, created_at: new Date(), updated_at: new Date() }
]

// Mock de historias de usuario
let userStories = [
  { id: 1, name: 'Login básico', description: 'Como usuario quiero iniciar sesión...', priority: 'Alta', accept_criteria: 'Debe validar usuario y contraseña', id_project: 1, created_at: new Date(), updated_at: new Date() }
]

// Mock de casos de prueba
let testCases = [
  {
    id: 1,
    description: 'Validar login exitoso',
    priority: 'Alta',
    preconditions: 'Usuario registrado',
    input_data: 'usuario: admin, contraseña: admin',
    steps: '1. Ir a login\n2. Ingresar usuario y contraseña\n3. Click en ingresar',
    expected_result: 'Acceso concedido',
    actual_result: '',
    test_status: null, // null: no ejecutado, true: OK, false: FAIL
    id_us: 1,
    created_at: new Date(),
    updated_at: new Date()
  }
]

export const api = {
  getProjects() {
    return Promise.resolve([...projects])
  },
  addProject(project) {
    const newProject = { ...project, id: Date.now(), created_at: new Date(), updated_at: new Date() }
    projects.push(newProject)
    return Promise.resolve(newProject)
  },
  updateProject(id, data) {
    const idx = projects.findIndex(p => p.id === id)
    if (idx !== -1) {
      projects[idx] = { ...projects[idx], ...data, updated_at: new Date() }
      return Promise.resolve(projects[idx])
    }
    return Promise.reject('No encontrado')
  },
  deleteProject(id) {
    projects = projects.filter(p => p.id !== id)
    return Promise.resolve()
  },
  // Historias de usuario
  getUserStories() {
    return Promise.resolve([...userStories])
  },
  addUserStory(story) {
    const newStory = { ...story, id: Date.now(), created_at: new Date(), updated_at: new Date() }
    userStories.push(newStory)
    return Promise.resolve(newStory)
  },
  updateUserStory(id, data) {
    const idx = userStories.findIndex(s => s.id === id)
    if (idx !== -1) {
      userStories[idx] = { ...userStories[idx], ...data, updated_at: new Date() }
      return Promise.resolve(userStories[idx])
    }
    return Promise.reject('No encontrado')
  },
  deleteUserStory(id) {
    userStories = userStories.filter(s => s.id !== id)
    return Promise.resolve()
  },
  // Casos de prueba
  getTestCases() {
    return Promise.resolve([...testCases])
  },
  addTestCase(testCase) {
    const newTestCase = { ...testCase, id: Date.now(), created_at: new Date(), updated_at: new Date() }
    testCases.push(newTestCase)
    return Promise.resolve(newTestCase)
  },
  updateTestCase(id, data) {
    const idx = testCases.findIndex(tc => tc.id === id)
    if (idx !== -1) {
      testCases[idx] = { ...testCases[idx], ...data, updated_at: new Date() }
      return Promise.resolve(testCases[idx])
    }
    return Promise.reject('No encontrado')
  },
  deleteTestCase(id) {
    testCases = testCases.filter(tc => tc.id !== id)
    return Promise.resolve()
  }
}
