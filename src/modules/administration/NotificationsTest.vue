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
        User assigned to project
        <v-btn @click="sendUserAdded()">Send</v-btn>
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
    async sendUserAdded(){
      const payload = {
        data: {
          name: 'Alex Took',
          project: 'HellProject'
        },
        notificationTypeId: 1 //joined
      }
      await this.$http.post('api/Notifications/send', payload);
    },
  }
}
</script>

<style>

</style>
