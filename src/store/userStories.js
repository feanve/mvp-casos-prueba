import { defineStore } from 'pinia'
import { historiesApi } from '../services/api'

export const useUserStoriesStore = defineStore('userStories', {
  state: () => ({
    userStories: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchUserStories() {
      this.loading = true
      try {
        this.userStories = await historiesApi.getAll()
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
    async addUserStory(story) {
      const newStory = await historiesApi.create(story)
      this.userStories.push(newStory)
    },
    async updateUserStory(id, data) {
      const updated = await historiesApi.update(id, data)
      const idx = this.userStories.findIndex(s => s.id === id)
      if (idx !== -1) this.userStories[idx] = updated
    },
    async deleteUserStory(id) {
      await historiesApi.delete(id)
      this.userStories = this.userStories.filter(s => s.id !== id)
    }
  }
})
