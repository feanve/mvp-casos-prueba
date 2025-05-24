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
  { path: '/projects', component: ProjectsView },
  { path: '/user-stories', component: UserStoriesView, meta: { requiresAuth: true } },
  { path: '/test-cases', component: TestCasesView, meta: { requiresAuth: true } },
  // ...otras rutas
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
    } else {
      next()
    }
  })

export default router