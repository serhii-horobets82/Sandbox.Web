<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon>
        <v-icon x-large>rocket</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>EvoFlare</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/evaluation">Evaluation</v-btn>
        <v-btn flat to="/okr">OKR</v-btn>
        <v-btn flat to="/about">About</v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
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
