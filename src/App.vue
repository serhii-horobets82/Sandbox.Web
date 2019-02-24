<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon>
        <v-img src="img/icons/favicon-32x32.png"></v-img>
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
  import Nav from '@/components/Nav.vue'

  export default {
    name: 'App',
    components: {
      //Nav
    },
    data () {
      return {
        //
      }
    }
  }
</script>
