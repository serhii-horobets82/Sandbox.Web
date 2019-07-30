<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{$t('System.Setup.title')}}</h2>
      </v-flex>
      <v-flex xs12>
        <v-btn class="primary" @click="reset">{{$t('System.Setup.reset')}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    async reset() {
      const res = await axios.post(this.$backendUrl + `api/setup`);
    }
  }
};
</script>