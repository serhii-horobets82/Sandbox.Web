<template>
  <!-- <v-content>
    <v-layout> -->
      <div>
      <v-toolbar height="35">
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/evaluation/employees-evaluation">Employees evaluation</v-btn>
            <!-- <v-btn flat to="/evaluation/position">eCF</v-btn> -->
            <v-btn flat to="/evaluation/360-questionarie">360 Questionarie</v-btn>
            <v-btn flat to="/evaluation/i-evaluate">I Evaluate</v-btn>
            <!-- <v-btn flat to="/okr">OKR</v-btn>
            <v-btn flat to="/evaluation">Evaluation</v-btn> -->
          </v-toolbar-items>
      </v-toolbar>
    <!-- </v-layout>
    <v-layout> -->
      <router-view></router-view>
      </div>
    <!-- </v-layout> -->
  <!-- </v-content> -->

</template>

<script>
export default {

}
</script>

<style>

</style>
