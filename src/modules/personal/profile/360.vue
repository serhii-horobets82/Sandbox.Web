<template>
  <v-layout>
    <v-flex>
      <v-layout>
        <v-flex>
          <span class="title">
            <!-- <span class="profileIcon mr-1">
              <v-icon>bug_report</v-icon>
            </span>-->
            My Review
          </span>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 class="mr-1 mt-4">
          <v-card flat style="border: 1px solid #E8EFF7">
            <v-layout row wrap>
              <v-flex>
                <v-card flat style="min-height: 62px; line-height: 62px;">
                  <v-card-title class="py-0 mx-2">
                    <!-- <v-select
                      :items="items"
                      v-model="value"
                      label="label"
                    ></v-select>-->
                    <v-spacer></v-spacer>

                    <span
                      class="mr-1"
                      style="display:inline-block; width: 6px; height: 6px; background-color: #3DB3ED; border-radius: 6px"
                    ></span>
                    <span class="mr-2">Your Score</span>

                    <span
                      class="mr-1"
                      style="display:inline-block; width: 6px; height: 6px; background-color: #D5DFE9; border-radius: 6px"
                    ></span>
                    <span>Score</span>
                  </v-card-title>
                </v-card>

                <v-divider style="border-color:#E8EFF7"></v-divider>
              </v-flex>
              <v-flex>
                <div class="mt-4 mb-3 ml-2 mr-2" id="360bars" style="width: 550px;height:280px;"></div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs6 class="mr-1 mt-4">
          <v-card flat style="border: 1px solid #E8EFF7">
            <v-layout row wrap>
              <v-flex>
                <v-card flat style="min-height: 62px; line-height: 62px;">
                  <v-card-title class="py-0 mx-2">
                    <!-- <v-select
                      :items="items"
                      v-model="value"
                      label="label"
                    ></v-select>-->
                    <v-spacer></v-spacer>

                    <!-- <span class="mr-1" style="display:inline-block; width: 6px; height: 6px; background-color: #3DB3ED; border-radius: 6px">

                    </span>
                    <span class="mr-2">Your Score</span>

                    <span class="mr-1" style="display:inline-block; width: 6px; height: 6px; background-color: #D5DFE9; border-radius: 6px">

                    </span>
                    <span>Score</span>-->
                  </v-card-title>
                </v-card>

                <v-divider style="border-color:#E8EFF7"></v-divider>
              </v-flex>
              <v-flex>
                <div
                  class="mt-4 mb-3 ml-2 mr-2"
                  id="360quarterly"
                  style="width: 550px;height:280px;"
                ></div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import echarts from "echarts";

export default {
  data: () => ({

  }),

  async created() {},
  mounted() {
    this.renderBars();
    this.renderLines();
  },
  methods: {
    renderBars() {
      var myChart = echarts.init(document.getElementById("360bars"));

      // specify chart configuration item and data
      const option = {
        title: {
          show: false
          // text: '世界人口总量',
          // subtext: '数据来自网络'
        },
        legend: { show: false },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["Score", "Your Score"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: 10,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["Q1", "Q2", "Q3", "Q4", "Q5"],
          axisLine: { lineStyle: { color: "#E8EFF7" } },
          axisLabel: { color: "#3C88B5" }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          splitLine: { lineStyle: { color: "#E8EFF7" } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#3C88B5", showMinLabel: false }
        },
        series: [
          {
            name: "My Current",
            type: "bar",
            data: [4.1, 4.0, 3.8, 4.1, 3.7],
            color: "#3DB3ED",
            barWidth: 10
          },
          {
            name: "Median",
            type: "bar",
            data: [4, 4.3, 4.1, 4.0, 3.7],
            color: "#E8EFF7",
            barWidth: 10,
            label: {
              color: "#3C88B5"
            }
          }
        ]
      };

      // use configuration item and data specified to show chart
      myChart.setOption(option);
    },
    renderLines() {
      const option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['II 2018' ,"III 2018", "IV 2018", "I 2019"],
          axisLine: { lineStyle: { color: "#E8EFF7" } },
          axisLabel: { color: "#3C88B5" }
        },
        yAxis: {
          type: 'value',

          splitLine: { lineStyle: { color: "#E8EFF7" } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#3C88B5", showMinLabel: false }
        },
        series: [{
          stack: 'Q1',
          data: [, 3.9, 4, 4],
          type: 'line',
          smooth: true
        },
        {
          stack: 'Q2',
          data: [, 3.8, 3.9, 3.7],
          type: 'line',
          smooth: true
        },
        {
          stack: 'Q3',
          data: [, 3.6, 3.5, 3.8],
          type: 'line',
          smooth: true
        },
        {
          stack: 'Q4',
          data: [, 3.8, 4.1, 4.2],
          type: 'line',
          smooth: true
        },
        {
          stack: 'Q5',
          data: [, 4.3, 3.9, 3.7],
          type: 'line',
          smooth: true
        }]
      };
      var myChart = echarts.init(document.getElementById("360quarterly"));

      myChart.setOption(option);
    },
    add(id) {},
    async save() {}
  }
};
</script>

<style>
</style>
