<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <h1>Evaluation Schedule </h1>
        <span class="red--text">WORK IN PROGRESS</span>
      </v-flex>
    </v-layout>

      <v-layout>
        <v-flex xs6>

          <v-card>
            <v-card-title>
              <h2>Not Scheduled</h2>
            </v-card-title>
            <v-card-text>
              <v-list two-line>
                <v-list-tile
                  v-for="item in notScheduled" :key="item.id"
                  avatar
                >
                  <v-list-tile-avatar color="teal">
                    <span class="white--text headline" >{{ item.nameTemp[0] }}</span>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.nameTemp }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{item.employeeType.type}}</v-list-tile-sub-title>

                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>Last evaluation: 01/01/2020</v-list-tile-action-text>
                    <v-btn @click="openScheduleDialog(item)">
                      Schedule
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>

          <v-card>
            <v-card-title>
              <h2>Scheduled</h2>
            </v-card-title>
            <v-card-text>
              <v-list two-line>
                <v-list-tile
                  v-for="item in notScheduled" :key="item.id"
                  avatar
                >
                  <v-list-tile-avatar color="teal">
                    <span class="white--text headline" >{{ item.nameTemp[0] }}</span>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.nameTemp }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{item.employeeType.type}}</v-list-tile-sub-title>

                  </v-list-tile-content>

                  <v-list-tile-action>
                    01/01/2020
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- <v-layout row wrap v-for="e in tableData" :key="e.id">
        <v-flex xs4>
          {{ e.name }} <router-link :to="{name: 'personalPage', params: {id: e.id}}">View</router-link>
        </v-flex>
        <v-flex xs4>
          Last evaluation date: <span class="font-weight-bold"> {{ e.evaluationStatus }} </span>
          <router-link v-if="e.evaluationId" :to="{name: 'ecfEvaluationForm', params: {id: e.evaluationId}}">eCF form</router-link>
        </v-flex>
        <v-flex xs4>
          <v-btn :disabled="e.evaluationStatus === 'In Progress'" @click="startEvaluationDialog(e)">Start evaluation</v-btn>
        </v-flex>
      </v-layout> -->


    <v-dialog
      v-model="scheduleDialog.open"
      max-width="600"
      scrollable
      @keydown.esc="scheduleDialog.open=false">
      <v-card>
        <v-card-title>
          <span class="headline">Schedule Evaluation</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                  :disabled="true"
                  :value="scheduleDialog.last"
                  label="Last evaluation"
                  prepend-icon="event"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <!-- <v-text-field
                      prepend-icon="event"
                      readonly
                      v-on="on" v-model="scheduleDialog.date" ></v-text-field> -->

                      <!-- hint="MM/DD/YYYY format" -->
                <v-menu
                  v-model="scheduleDialog.menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="scheduleDialog.date"
                      label="New Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="scheduleDialog.date" no-title @input="scheduleDialog.menu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <!-- <v-layout>
              <v-flex xs12>
                aaaaaaaavvvvvvvv
              </v-flex>
            </v-layout> -->
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!scheduleDialog.date" @click="scheduleEvaluation()">Schedule</v-btn>
          <v-btn color="blue darken-1" flat @click="scheduleDialog.open = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    notScheduled: null,
    scheduleDialog: {
      menu1: false,
      open: false,
      last: new Date().toISOString().substr(0, 10),
      employee: null,
      date: null
    }
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + `api/employees`);
    this.notScheduled = res.data;
  },

  methods: {
    add(id) {

    },
    async save(){

    },
    openScheduleDialog(employee){
      this.scheduleDialog.employee = employee;
      this.scheduleDialog.open = true;
      const date = new Date();
      // date.setMonth(this.scheduleDialog.last.getMonth() + 3)
      date.setMonth((new Date()).getMonth() + 3)

      this.scheduleDialog.date = date.toISOString().substring(0, 10)
    },
    async scheduleEvaluation() {

    },

  }
}
</script>

<style>

</style>
