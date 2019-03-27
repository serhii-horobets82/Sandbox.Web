<template>
<div>
  <v-toolbar height="35">
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/administration/employees">Employees</v-btn>
        <v-btn flat to="/administration/360-questionarie">360 Questionarie</v-btn>
        <v-btn flat to="/administration/position">Positions (Cross-Project)</v-btn>
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
