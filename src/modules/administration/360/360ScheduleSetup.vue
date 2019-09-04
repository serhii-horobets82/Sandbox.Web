<template>
  <v-container fluid>
    <v-layout row class="pb-3">
      <v-flex xs12>
        <div class="title font-weight-bold" style="line-height: 48px !important;">360 Schedule Setup</div>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        Frequency: once in a quarter
      </v-flex>
      <v-flex xs12>
        Evaluation period: 1 month
      </v-flex>
      <v-flex xs12>
        Start date: 01
      </v-flex>
      <v-flex xs12 class="pt-3">
        Resulting evaluation schedule:
        <ul>
          <li>01/01/2019</li>
          <li>01/04/2019</li>
          <li>01/07/2019</li>
          <li>01/10/2019</li>
        </ul>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import toast from '@/services/toast'

export default {
  data: () => ({
    loading: true,
  }),

  async created(){
    this.loading = true;
    // this.projects = await this.$http.get(`api/projects/basic`).then(r => r.data);
    this.loading = false;
  },

  methods: {

  }
}

</script>

<style lang="scss">
</style>

