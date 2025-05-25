import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useUserStoriesStore = defineStore('userStories', {
  state: () => ({
    userStories: [],
    loading: false,
    error: null
  }),
  actions: {
    setUserStories(stories) {
      this.userStories = stories
    },
    async fetchUserStories() {
      this.loading = true
      try {
        const stories = await api.getUserStories()
        this.userStories = stories
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.loading = false
      }
    },
    async addUserStory(story) {
      const newStory = await api.addUserStory(story)
      this.userStories.push(newStory)
      return newStory
    },
    async updateUserStory(id, data) {
      const updated = await api.updateUserStory(id, data)
      const idx = this.userStories.findIndex(s => s.id === id)
      if (idx !== -1) this.userStories[idx] = updated
      return updated
    },
    async deleteUserStory(id) {
      await api.deleteUserStory(id)
      this.userStories = this.userStories.filter(s => s.id !== id)
    }
  }
})
