<template>
  <v-card flat>
    <v-card-title>
      <span class="title">My Planning</span>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex>
          <div class="grid-wrapper" ref="gridWrapper">
            <table class="grid" ref="grid">
              <tr>
                <td v-for="d in dates" :key="d.getTime()">
                  <span class="date">{{d.getDate()}}</span>
                  <br>
                  <span class="month">{{months[d.getMonth()]}}</span>

                </td>
              </tr>
            </table>
            <div class="events" ref="events">
              <div v-for="(event, i) in events" :key="i" class="event"
                :style="{
                  'margin-left': `${getDaysDiff(event.date, startDate)*width}px`,
                  width: `200px`,

                }"
                :ref="`event_${i}`">
                  {{event.name}}
                </div>
            </div>
          </div>
          <!-- <div id='timeline-embed' style="width: 100%; height: 300px"></div> -->
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 v-for="(event, i) in events" :key="event.name"
          @click="scrollToView(i)">
          {{event.name}}: {{event.date.toLocaleDateString()}}
        </v-flex>
      </v-layout>
    </v-card-text>

  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    startDate: null,
    endDate: null,
    dates: [],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    events: [
      {name: 'English exam', date: new Date(2019, 12, 3) },
      {name: 'Smart talk', date: new Date(2019, 10, 1) },
      {name: 'Something today', date: new Date() },
    ],
    diffDays: null,
    width: 40
  }),

  async created(){
    const startDate = new Date();
    startDate.setFullYear(2018);
    this.startDate = new Date(startDate.getTime());

    const endDate = new Date();
    endDate.setFullYear(2020);

    this.diffDays = this.getDaysDiff(startDate, new Date());

    const dates = []
    for(let date = startDate;
        date < endDate;
        date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date.getTime()))
    }
    this.dates = dates;
  },

  mounted() {
    this.$refs.events.style.width = this.$refs.grid.clientWidth + 'px';
    console.log(this.diffDays)
    this.$refs.gridWrapper.scrollLeft = this.diffDays * this.width;
  },

  methods: {
    getDaysDiff(dt1, dt2) {
      return Math.floor(Math.abs(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())
          - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())
        ) / (1000 * 60 * 60 * 24)
      ));
    },
    scrollToView(i) {
      this.$refs.gridWrapper.scrollLeft = parseInt(this.$refs[`event_${i}`][0].style.marginLeft);
    },

    add(id) {

    },
    async save(){

    },
  }
}
</script>

<style lang="scss" scoped>
.grid-wrapper {
  overflow: auto;
  width: 100%;
}

.grid {
  border-collapse: collapse;

  td {
    height: 40px;
    min-width: 40px;
    text-align: right;
    background-color: #F7FBFF;
    border: none;
    font-size: 10px;

    .date {
      margin-right: 1px;
    }
    .month {
      display: block;
      margin-top: -4px;
    }
  }

}

.events {
  padding: 26px 0;
  background-image: url("/img/misc/dash-background.svg");
  background-repeat: repeat;

  .event {
    background-color: rgba(109, 169, 205, 0.8);
    margin: 3px 0;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    padding-left: 14px;
  }
}

</style>
