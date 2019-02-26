<template>
  <v-toolbar app>
    <v-toolbar-side-icon>
      <!-- <v-img src="img/icons/favicon-32x32.png"></v-img> -->
    </v-toolbar-side-icon>
    <v-toolbar-title class="headline">
      <span>EvoFlare</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/">Home</v-btn>
      <v-btn flat to="/organization">Organization</v-btn>
      <v-btn flat to="/evaluation">Evaluation</v-btn>
      <v-btn flat to="/okr">OKR</v-btn>
      <v-btn flat to="/about">About</v-btn>
      <v-btn flat>SIGN IN</v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
  export default {
    name: 'AppNavigation'
  }
</script>

<style scoped>
  /* button img {
    width: 36px;
    height: 36px;
  } */
</style>
