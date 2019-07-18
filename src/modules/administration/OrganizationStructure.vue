<template>
  <v-container fluid grid-list-md>
    <v-layout row style="padding-bottom: 32px;">
      <span class="title font-weight-bold">Organization Structure Type</span>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs4 v-for="type in types" :key="type.id">
        <v-card>
          <v-card-title primary-title class="subheading">
            {{ type.name }}
          </v-card-title>
          <v-card-text style="min-height: 440px">
            <img width="415" :src="images[type.id]" class="mb-3">
            {{ type.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn block color="#3C88B5" style="color: white">Select</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    images: {
      1: '/img/misc/1-functional-organizational-structure.jpg',
      2: '/img/misc/2-projectized-organizational-structure.jpg',
      3: '/img/misc/3-weak-matrix-organizational-structure.jpg',
    },
    types: null
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + 'api/OrganizationStructureTypes')
    this.types = res.data;
  },

  methods: {

  }
}

</script>

<style>

</style>
