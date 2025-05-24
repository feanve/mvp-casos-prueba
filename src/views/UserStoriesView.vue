<template>
  <v-container>
    <h1>Historias de Usuario</h1>
    <v-btn color="primary" @click="openForm()">Nueva Historia</v-btn>
    <UserStoryList
      :userStories="userStories"
      :loading="loading"
      @edit="openForm"
      @delete="deleteUserStory"
    />
    <v-dialog v-model="showForm" max-width="600">
      <UserStoryForm
        :userStory="selectedUserStory"
        @save="saveUserStory"
        @cancel="closeForm"
      />
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStoriesStore } from '../store/userStories'
import UserStoryList from '../components/UserStory/UserStoryList.vue'
import UserStoryForm from '../components/UserStory/UserStoryForm.vue'

const store = useUserStoriesStore()
const showForm = ref(false)
const selectedUserStory = ref(null)

const userStories = computed(() => store.userStories)
const loading = computed(() => store.loading)

onMounted(() => {
  store.fetchUserStories()
})

function openForm(userStory = null) {
  selectedUserStory.value = userStory
  showForm.value = true
}
function closeForm() {
  showForm.value = false
  selectedUserStory.value = null
}
async function saveUserStory(data) {
  if (selectedUserStory.value) {
    await store.updateUserStory(selectedUserStory.value.id, data)
  } else {
    await store.addUserStory(data)
  }
  closeForm()
}
async function deleteUserStory(userStory) {
  if (confirm('¿Eliminar esta historia de usuario?')) {
    await store.deleteUserStory(userStory.id)
  }
}
</script>

<style lang="scss" scoped>

</style>