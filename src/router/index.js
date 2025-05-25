import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { pinia } from '../main' // importa la instancia de pinia
import ProjectsView from '../views/ProjectsView.vue'
import UserStoriesView from '../views/UserStoriesView.vue'
import TestCasesView from '../views/TestCasesView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/login', component: LoginView },
  { 
    path: '/projects', 
    component: ProjectsView, 
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  { 
    path: '/user-stories', 
    component: UserStoriesView, 
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  { 
    path: '/test-cases', 
    component: TestCasesView, 
    meta: { requiresAuth: true, roles: ['admin', 'tester'] }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Protección de rutas
router.beforeEach((to, from, next) => {
  const auth = useAuthStore(pinia)
  
  if (to.meta.requiresAuth && !auth.user) {
    next('/login')
  } else if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) {
    // Si el usuario no tiene el rol requerido, redirigir según su rol
    if (auth.user?.role === 'tester') {
      next('/test-cases')
    } else {
      next('/projects')
    }
  } else {
    next()
  }
})

export default router