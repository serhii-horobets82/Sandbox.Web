<template>
  <v-container>
    <v-layout row>
      <h1>
        Suggestions to improve from your 360 degree evaluation peers.
      </h1>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 pa-1>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 v-for="item in feedbacks.startDoing" :key="item.id">
            <!-- <v-card flat > -->
              <v-chip color="green lighten-1" text-color="white">
                {{ item.text }}
              </v-chip>
            <!-- </v-card> -->
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs6 pa-1>
        <v-card>
          <v-layout xs12 v-for="item in feedbacks.stopDoing" :key="item.id">
            <!-- <v-card flat v-for="item in feedbacks.stopDoing" :key="item.evaluationId"> -->
              <v-chip color="red lighten-2" text-color="white">
                {{ item.text }}
              </v-chip>
            <!-- </v-card> -->
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    feedbacks: {
      startDoing: [],
      stopDoing: []
    }
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + `api/employees/suggestions-to-improve`);
    const start= [];
    const stop= [];
    res.data.forEach(r => {
      start.push({id: r.id, text: r.startDoing})
      stop.push({id: r.id, text: r.stopDoing})
    })

    stop.push({id: 1, text: 'aaaaaaaaaaaaaaa'})
    stop.push({id: 2, text: 'aaaaaa agggggggggg'})
    stop.push({id: 3, text: 'aaaaaaaaaaa af3aaaffffffffffa'})
    stop.push({id: 4, text: 'aaaas a sdf  fffffffffff a'})

    start.push({id: 1, text: 'lllllllll ps pasfsdlfk '})
    start.push({id: 2, text: 'aaaaaa agggggggggg'})
    start.push({id: 3, text: 'aaaaaaaaaaa af3aaaffffffffffa'})

    this.feedbacks.startDoing = start;
    this.feedbacks.stopDoing = stop;
  },

  methods: {
    add(id) {

    },
    async save(){

    },
  }
}
</script>

<style>

</style>
