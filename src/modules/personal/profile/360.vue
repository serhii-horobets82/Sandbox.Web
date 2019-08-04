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
                <div
                  class="mt-4 mb-3 ml-2 mr-2"
                  id="360bars"
                  ref="360bars"
                  style="width: 550px;height:280px;"
                ></div>
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
                  ref="360quarterly"
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
    barChart: null,
    bars: {
      categories: null,
      my: null,
      company: null
    },
    lineChart: null,
    lines: {
      categories: null,
      data: null
    }
  }),

  async created() {
    const res = await this.$http.get(`api/_360evaluation/profile`);

    const barData = res.data.barData;
    this.bars.categories = barData.company.map(d => d.question);
    this.bars.my = barData.my.map(d => d.value);
    this.bars.company = barData.company.map(d => d.value);

    const linesData = res.data.lineData;
    this.lines.categories = linesData.categories;
    this.lines.data = linesData.data
  },
  mounted() {
    this.renderBars();
    this.renderLines();
  },
  methods: {
    renderBars() {
      // specify chart configuration item and data
      const option = {
        title: {
          show: false
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
          axisLine: { lineStyle: { color: "#E8EFF7" } },
          axisLabel: { color: "#3C88B5" }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          max: 5,
          splitLine: { lineStyle: { color: "#E8EFF7" } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#3C88B5", showMinLabel: false }
        },
      };

      const myChart = echarts.init(this.$refs["360bars"]);
      this.barChart = myChart;
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
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:[]
        },
        xAxis: {
          type: "category",
          axisLine: { lineStyle: { color: "#E8EFF7" } },
          axisLabel: { color: "#3C88B5" }
        },
        yAxis: {
          type: "value",
          max: 5,
          // scale: true,
          // boundaryGap: ['20%', '20%'],
          splitLine: { lineStyle: { color: "#E8EFF7" } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#3C88B5", showMinLabel: false }
        },
      };

      var myChart = echarts.init(this.$refs["360quarterly"]);
      this.lineChart = myChart;
      myChart.setOption(option);
    }
  },
  watch: {
    bars: {
      deep: true,
      handler() {
        const option = {
          xAxis: {
            data: this.bars.categories,
          },
          series: [
            {
              name: "My Current",
              type: "bar",
              data: this.bars.my,
              color: "#3DB3ED",
              barWidth: 10
            },
            {
              name: "Median",
              type: "bar",
              data: this.bars.company,
              color: "#E8EFF7",
              barWidth: 10,
              label: {
                color: "#3C88B5"
              }
            }
          ]
        }
        this.barChart.setOption(option)
      }
    },
    lines: {
      deep: true,
      handler() {
        const option = {
          xAxis: {
            data: this.lines.categories,
          },
          series: this.lines.data.map(d => ({
            // stack: d.question,
            name: d.question,
            data: d.values,
            type: "line",
            // smooth: true
          }))
        };
        this.lineChart.setOption(option);
      }
    }
  }
};
</script>

<style>
</style>
