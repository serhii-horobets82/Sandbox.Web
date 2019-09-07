<template>
  <v-container fluid>
    <v-layout row class="pb-3">
      <v-flex xs12>
        <div class="title font-weight-bold" style="line-height: 48px !important;">360 Schedule Setup</div>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2" v-if="settings">
      <v-flex xs12>
        Frequency: once in
        <v-text-field
          v-model="settings.periodMonths"
          class="centered-input"
          style="width: 60px; display: inline-block; "
        ></v-text-field>
        month(s)
      </v-flex>
      <v-flex xs12>
        Evaluation period:
        <v-text-field
          v-model="settings.evaluationWindowMonths"
          class="centered-input"
          style="width: 60px; display: inline-block;"
        ></v-text-field>
        month(s)
      </v-flex>
      <v-flex xs12>
        Start date:
        <v-text-field
          v-model="settings.startDate"
          class="centered-input"
          style="width: 100px; display: inline-block;"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 class="pt-3">
        <!-- Resulting evaluation schedule: TODO...
        <ul>
          <li>01/01/2019</li>
          <li>01/04/2019</li>
          <li>01/07/2019</li>
          <li>01/10/2019</li>
        </ul> -->
      </v-flex>
      <v-flex xs12>
        <v-btn color="primary" @click="save()">Save</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="pt-5">
      <v-flex xs12>
        <!-- TODO: remove -->
        !!!DEMO!!! Start evaluation period manually
      </v-flex>
      <v-flex xs12>
        Start evaluation date:
        <v-text-field
          v-model="startEvaluationDate"
          class="centered-input"
          style="width: 100px; display: inline-block;"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-btn color="primary" @click="startManually()">Start</v-btn>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import toast from '@/services/toast'

export default {
  data: () => ({
    loading: true,
    settings: null,
    startEvaluationDate: null
  }),

  async created(){
    this.loading = true;
    const settings = await this.$http.get(`api/_360evaluation/schedule-settings`).then(r => r.data);
    this.loading = false;
    settings.startDate = settings.startDate.split('T')[0];
    this.settings = settings;
    this.startEvaluationDate = this.settings.startDate;
  },

  methods: {
    async save(){
      await this.$http.post(`api/_360evaluation/schedule-settings`, this.settings);
      toast.success(`Updated 360 schedule settings.`)
    },
    async startManually(){
      const result = await this.$http.post(`api/_360evaluation/start/${this.startEvaluationDate}`).then(_ => _.data)
      toast.success(`360 Evaluation started successfully.`)
    }
  }
}

</script>

<style lang="scss" >
.centered-input input {
  text-align: center
}
</style>

