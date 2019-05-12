<template>
  <v-container>
    <v-layout row>
      <h1>My Profile</h1>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <okr-list/>
      </v-flex>
      <v-flex xs12 sm6></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6></v-flex>
      <v-flex xs6></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OkrList from "../okr/components/OkrList.vue";
export default {
  components: {
    OkrList
  }
};
</script>

<style lang="stylus" scoped></style>

