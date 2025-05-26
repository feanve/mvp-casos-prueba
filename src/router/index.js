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
  // Permitir acceso libre a /login
  if (to.path === '/login') {
    next()
    return
  }
  // Si la ruta requiere auth y no hay usuario, redirige a login
  if (to.meta.requiresAuth && !auth.user) {
    next('/login')
    return
  }
  // Si la ruta requiere roles específicos
  if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) {
    // Si ya estás en la ruta a la que quieres redirigir, no redirijas de nuevo
    if (auth.user?.role === 'tester' && to.path !== '/test-cases') {
      next('/test-cases')
      return
    }
    if (auth.user?.role === 'admin' && to.path !== '/projects') {
      next('/projects')
      return
    }
    // Si ya estás en la ruta correcta, permite el acceso
    next()
    return
  }
  next()
})

export default router