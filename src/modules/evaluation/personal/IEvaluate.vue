<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs4>
        <v-text-field
          label="Filter"
          prepend-inner-icon="search"
          v-model="filter"
          >
        </v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <!-- <v-flex xs4> -->
        <v-btn @click="openInviteDialog()">
          <v-icon>add</v-icon>
          Add user for evaluation
        </v-btn>
      <!-- </v-flex> -->
    </v-layout>

    <v-layout row wrap>
      <v-flex xs1 v-for="e in employeesFiltered" :key="e.id" class="text-xs-center">
        <v-avatar color="teal">
          <span class="white--text headline">
            {{ e.name[0] }}
          </span>
        </v-avatar>
        <br/>
        {{ e.name.split(' ')[0] }} <br/>
        {{ e.name.split(' ')[1] }}
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex xs12>
        <v-layout row wrap class="text-xs-center">
          <v-flex v-for="q in questions" :key="q.id">
            <!-- <v-divider vertical></v-divider> -->
            <v-card @click="selectQuestion(q.id)" class="green lighten-3">
              {{q.text}}
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
          <v-card>
          <template v-if="questionsByMark">
            <v-flex xs12><v-card @click="setFeedback(1)"><v-card-text>{{ questionsByMark[1] }}</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card @click="setFeedback(2)"><v-card-text>Demonstrates behaviors described above and below</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card @click="setFeedback(3)"><v-card-text>{{ questionsByMark[3] }}</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card @click="setFeedback(4)"><v-card-text>Demonstrates behaviors described above and below</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card @click="setFeedback(5)"><v-card-text>{{ questionsByMark[5] }}</v-card-text></v-card></v-flex>

            <v-layout>
              <v-spacer></v-spacer>
              <v-btn class="primary" :disabled="!selectedQuestionMark">Submit</v-btn>
            </v-layout>
          </template>
          </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="dialog.open"
      max-width="600"
      scrollable
    >
      <v-card>
        <v-card-title class="headline">
          <v-layout row align-center class="dialog-header">
            <v-flex xs6>Invite Employees for evaluation</v-flex>
            <v-flex xs6>
              <v-text-field flat
                hide-details
                label="Filter"
                prepend-inner-icon="search"
                v-model="dialog.filter"
                ></v-text-field>
            </v-flex>
          </v-layout>

        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-tile
              v-for="item in dialogEmployeesFiltered"
              :key="item.id"
              avatar
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="primary" @click="inviteForEvaluation(item.id)">Invite</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.open = false; dialog.filter=''">Done</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    filter: '',
    employees: [
      {id: 1, name: 'Some person'},
      {id: 2, name: 'John doe'},
      {id: 3, name: 'Aba babar'},
      {id: 4, name: 'Misk Nkfi'},
    ],
    questions: [
      {id: 1, text: 'Q1. Contributing to team work'},
      {id: 2, text: 'Q2. Contributing to team work'},
      {id: 3, text: 'Q3. Contributing to team work'},
      {id: 4, text: 'Q4. Contributing to team work'},
      {id: 5, text: 'Q5. Contributing to team work'},
    ],
    questionsByMark: {

    },
    selectedQuestionMark: 0,
    dialog: {
      open: false,
      employees: [
        {id: 1, name: 'Some person'},
        {id: 2, name: 'John doe'},
        {id: 3, name: 'Aba babar'},
        {id: 4, name: 'Misk Nkfi'},
      ],
      filter: ''
    }
  }),

  async created(){

  },

  methods: {
    add(id) {

    },
    async save(){

    },

    async openInviteDialog(){
      this.dialog.open = true;
      const res = await axios.get(this.$backendUrl + 'api/Employees');
      this.dialog.employees = res.data.map(e => ({id: e.id, name: e.nameTemp}))
    },
    inviteForEvaluation (id) {
      // const res = await axios.get(this.$backendUrl + 'api/');
    },

    async selectQuestion(id) {
      const res = await axios.get(this.$backendUrl + `api/_360questionarie/${id}/questions`);
      const d = {}
      const d1 = res.data.filter(q => q.markId == 1)
      d[1] = d1[0]._360question[0].question
      const d2 = res.data.filter(q => q.markId == 3)
      d[3] = d2[0]._360question[0].question
      const d3 = res.data.filter(q => q.markId == 5)
      d[5] = d3[0]._360question[0].question
    },
    setFeedback(mark){
      this.selectedQuestionMark = mark;
    },

    async submitFeedback(){
      // const res = await axios.post(this.$backendUrl + `api/`);
      this.selectedQuestionMark = 0;
    }
  },

  computed: {
    employeesFiltered(){
      if (this.filter) {
        const f = this.filter.toLowerCase();
        return this.employees.filter(e => e.name.toLowerCase().includes(f))
      }
      return this.employees;
    },
    dialogEmployeesFiltered(){
      if (this.dialog.filter) {
        const f = this.dialog.filter.toLowerCase();
        return this.dialog.employees.filter(e => e.name.toLowerCase().includes(f))
      }
      return this.dialog.employees;
    },
  }
}
</script>

<style>

</style>
