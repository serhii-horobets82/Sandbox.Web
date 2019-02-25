<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon>
        <img src="@/assets/logo.png">
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>EvoFlare</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/organization">Organization</v-btn>
        <v-btn flat to="/okr">OKR</v-btn>
        <v-btn flat to="/evaluation">Evaluation</v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style scoped>
  button img {
    width: 36px;
    height: 36px;
  }
</style>
