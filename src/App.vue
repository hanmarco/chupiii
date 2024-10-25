<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Book Album Collection</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.v-toolbar-title {
  font-weight: bold;
}
.v-container {
  margin-top: 20px;
}
</style>
