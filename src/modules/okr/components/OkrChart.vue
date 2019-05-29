<template>
  <v-card flat color="accent">
    <v-card-title class="pa-0 pt-2 pb-3">
      <h2>{{$t('OKR.chartTitle')}}</h2>
    </v-card-title>
    <v-card flat class="okr-chart">
      <v-card-actions>
        <v-select
          class="okr-chart__period"
          append-icon
          flat
          hide-details
          v-model="periodValue"
          color="secondary"
          prepend-inner-icon="unfold_more"
          outline
          single-line
          :items="periods"
        ></v-select>
        <v-select
          class="okr-chart__count"
          append-icon
          flat
          hide-details
          v-model="countValue"
          color="secondary"
          prepend-inner-icon="unfold_more"
          outline
          single-line
          :items="counters"
        ></v-select>
        <v-btn icon>
          <v-icon color="secondary">arrow_back</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="secondary">arrow_forward</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat>{{$t('OKR.chartReset')}}</v-btn>
      </v-card-actions>
      <line-chart :chart-data="lineChartData"/>
    </v-card>
  </v-card>
</template>

<script>
const lineChartData = {
  okrPoints: {
    expectedData: [0.7, 0.3, 0.8, 0.7, 0.5, 0.6, 0.8],
    actualData: [0.1, 1, 0.2, 0.5, 0.7, 0.6, 0.8]
  }
};

import LineChart from "./LineChart.vue";
export default {
  components: { LineChart },

  data: () => ({
    periods: [
      { value: 0, text: "Show last quarter" },
      { value: 1, text: "Show last year" }
    ],
    counters: [1, 2, 3, 4],
    periodValue: 0,
    countValue: 2,
    lineChartData: lineChartData.okrPoints
  })
};
</script>

<style lang="stylus" scoped>
.okr-chart {
  border: 2px solid #B5D6EC;

  &__period {
    max-width: 250px;
  }

  &__count {
    max-width: 70px;
  }
}
</style>
