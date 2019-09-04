<template>
  <v-container fluid grid-list-md>
    <v-layout row style="padding-bottom: 32px;">
      <span class="title font-weight-bold">Company Strategy</span>
    </v-layout>

    <v-layout row wrap>
      TBD

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
