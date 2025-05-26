import { defineStore } from 'pinia'
import { projectsApi } from '../services/api'

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
        this.projects = await projectsApi.getAll()
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
    async addProject(project) {
      const newProject = await projectsApi.create(project)
      this.projects.push(newProject)
    },
    async updateProject(id, data) {
      const updated = await projectsApi.update(id, data)
      const idx = this.projects.findIndex(p => p.id === id)
      if (idx !== -1) this.projects[idx] = updated
    },
    async deleteProject(id) {
      await projectsApi.delete(id)
      this.projects = this.projects.filter(p => p.id !== id)
    }
  }
})
