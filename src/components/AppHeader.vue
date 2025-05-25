<template>
  <div class="app-header">
    <v-btn 
      icon 
      variant="text" 
      @click="toggleDrawer" 
      color="grey-darken-1"
      size="small"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
function toggleDrawer() {
  // Emit event to toggle drawer
  window.dispatchEvent(new CustomEvent('toggle-drawer'))
}
</script>

<style scoped>
.app-header {
  height: 44px;
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-left: 15px;
}
</style>