<template>
  <v-container >
    <v-layout row style="padding-bottom: 32px;">
      <span class="title font-weight-bold">Notification testing UI - TODO: Remove later</span>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        The message should appear in the notification menu for all (for now) users
      </v-flex>
      <v-flex xs12>
        <v-text-field v-model="message"></v-text-field>
        <v-btn color="success" @click="send()">Send</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    message: null
  }),

  async created(){

  },

  methods: {
    async send(){
      await this.$http.post('api/Notifications/send', {message: this.message})
      this.message = null;
    },
  }
}
</script>

<style>

</style>
