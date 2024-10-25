<template>
  <v-app>
    <v-app-bar app v-if="showAppBar">
      <v-toolbar-title>Book Album Collection</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    
    const showAppBar = computed(() => {
      return !route.meta.hideAppBar
    })

    return {
      showAppBar
    }
  }
}
</script>

<style scoped>
.v-toolbar-title {
  font-weight: bold;
}
</style>
