<template>
<div>
  <v-toolbar height="35">
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/organization/project">Projects</v-btn>
        <v-btn flat to="/organization/position">Positions</v-btn>
        <!-- <v-btn flat to="/okr">OKR</v-btn>
        <v-btn flat to="/evaluation">Evaluation</v-btn> -->
      </v-toolbar-items>
  </v-toolbar>
  <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
