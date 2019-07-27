<template>
  <v-container fluid grid-list-md>
    <v-layout row style="padding-bottom: 32px;">
      <span class="title font-weight-bold">Checklist (before we start)</span>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <router-link :to="{name: 'organization-structure'}">Organization Structure</router-link>
        <router-link>Configure Roles</router-link>
        <router-link>Invite Employees</router-link>
        <router-link>Create Projects</router-link>
        <router-link>Configure Access Rights</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
  }),

  async created(){
  },

  methods: {

  }
}

</script>

<style>

</style>
