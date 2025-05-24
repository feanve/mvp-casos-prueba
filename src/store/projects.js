import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchProjects() {
      this.loading = true
      try {
        this.projects = await api.getProjects()
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
    async addProject(project) {
      const newProject = await api.addProject(project)
      this.projects.push(newProject)
    },
    async updateProject(id, data) {
      const updated = await api.updateProject(id, data)
      const idx = this.projects.findIndex(p => p.id === id)
      if (idx !== -1) this.projects[idx] = updated
    },
    async deleteProject(id) {
      await api.deleteProject(id)
      this.projects = this.projects.filter(p => p.id !== id)
    }
  }
})
