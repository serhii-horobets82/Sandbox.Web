<template>
  <v-container>
    <!-- <v-layout>
      <v-flex xs6>
        <span>FOR TESTING PURPOSES</span>
      </v-flex>
      <v-flex xs6>
        <v-select
          :items="testEmployees"
          item-value="id"
          item-text="nameTemp"
          label="Switch between users"
          solo
          v-model="testEmployeeId"
          @change="selectTestEmployee()"
        ></v-select>
      </v-flex>
    </v-layout> -->

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

        <v-card flat @click="selectEmployeeFor360(e)"
          :class="{'elevation-4': currentEmployee && e.id === currentEmployee.id}">
          <v-card-text>
          <v-avatar color="teal">
            <span class="white--text headline">
              {{ e.name[0] }}
            </span>
          </v-avatar>
          <br/>
          {{ e.name.split(' ')[0] }} <br/>
          {{ e.name.split(' ')[1] }}
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex xs12>
        <v-layout row wrap class="text-xs-center">
          <v-flex v-for="(q, idx) in questionarie" :key="q.id">
            <!-- <v-divider vertical></v-divider> -->
            <v-card :class="`green lighten-${currentQuestionIndex == idx ? 2 : 4}`">
              {{q.text}}
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
          <v-card>
          <template v-if="currentQuestions">

            <v-flex xs12 v-for="i of [1,2,3,4,5]" :key="i">
              <v-card tile :class="{'blue lighten-4': currentQuestionFeedback.feedbackMarkId === i}"  @click="setFeedback(i)">
                <v-card-text style="white-space: pre;">{{ i % 2 == 1 ? currentQuestions[i].question : "Demonstrates behaviors described above and below" }}</v-card-text>
              </v-card>
            </v-flex>

            <!-- <v-flex xs12><v-card tile @click="setFeedback(1)" :class="{'blue lighten-4': currentQuestionFeedback.feedbackMarkId === 1}"><v-card-text style="white-space: pre;">{{ currentQuestions[1].question }}</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card tile @click="setFeedback(2)" :class="{'blue lighten-4': currentQuestionFeedback.feedbackMarkId === 2}"><v-card-text>Demonstrates behaviors described above and below</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card tile @click="setFeedback(3)" :class="{'blue lighten-4': currentQuestionFeedback.feedbackMarkId === 3}"><v-card-text style="white-space: pre;">{{ currentQuestions[3].question }}</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card tile @click="setFeedback(4)" :class="{'blue lighten-4': currentQuestionFeedback.feedbackMarkId === 4}"><v-card-text>Demonstrates behaviors described above and below</v-card-text></v-card></v-flex>
            <v-flex xs12><v-card tile @click="setFeedback(5)" :class="{'blue lighten-4': currentQuestionFeedback.feedbackMarkId === 5}"><v-card-text style="white-space: pre;">{{ currentQuestions[5].question }}</v-card-text></v-card></v-flex> -->

            <!-- <v-flex>
              <v-card tile >
                <v-card-text>
                  <v-textarea v-model="currentQuestionFeedback.comment" label="Comment"></v-textarea>
                </v-card-text>
              </v-card>
            </v-flex> -->
            <v-layout>
              <v-spacer></v-spacer>

              <v-btn class="primary"
                v-if="currentQuestionIndex === (questionarie.length - 1)"
                :disabled="!currentQuestionFeedback.feedbackMarkId"
                @click="submitFeedback()"
                >
                Submit
              </v-btn>

              <v-btn class="primary"
                v-else
                :disabled="!currentQuestionFeedback.feedbackMarkId"
                @click="nextQuestion()"
                >
                Next
              </v-btn>
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
      @keydown.esc="dialog.open=false"
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

    <v-dialog
      v-model="feedbackCommentsDialog.open"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">
          Suggestions to improve
        </v-card-title>
        <v-card-text>
          <v-card flat><v-textarea v-model="feedbackCommentsDialog.startDoing" label="Start doing"></v-textarea></v-card>
          <v-card flat><v-textarea v-model="feedbackCommentsDialog.stopDoing" label="Stop doing"></v-textarea></v-card>
          <v-card flat><v-textarea v-model="feedbackCommentsDialog.otherComments" label="Other comments"></v-textarea></v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!(feedbackCommentsDialog.startDoing || feedbackCommentsDialog.stopDoing)" @click="submitFeedback()">Done</v-btn>
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
    // testEmployees: [],
    // testEmployeeId: null,
    employees: [],
    currentEmployee: null,
    questionarie: [],
    // currentQuestionId: 0,
    currentQuestionIndex: 0,
    currentQuestionFeedback: null,

    questionFeedbacks: [],
    // selectedQuestionMark: 0,

    dialog: {
      open: false,
      employees: [
      ],
      filter: ''
    },
    feedbackCommentsDialog: {
      open: false,
      startDoing: null,
      stopDoing: null,
      otherComments: null
    }
  }),

  async created(){
    // const res = await axios.get(this.$backendUrl + `api/employees`);
    // this.testEmployees = res.data;

    // const res = await axios.get(this.$backendUrl + `api/questionarie`);
    const res = await axios.get(this.$backendUrl + `api/EmployeeEvaluations/i-evaluate-360`);
      this.employees = res.data.map(e => ({
        id: e.evaluation.employee.id,
        name: e.evaluation.employee.nameTemp,
        evaluationId: e.id
      }));
  },

  methods: {
    async openInviteDialog(){
      this.dialog.open = true;
      const res = await axios.get(this.$backendUrl + 'api/Employees');
      this.dialog.employees = res.data.map(e => ({id: e.id, name: e.nameTemp}))
    },
    inviteForEvaluation (id) {
      // const res = await axios.get(this.$backendUrl + 'api/');
    },

    // async selectQuestion(id) {
    //   const res = await axios.get(this.$backendUrl + `api/_360questionarie/${id}/questions`);
    //   const d = {}
    //   const d1 = res.data.filter(q => q.markId == 1)
    //   d[1] = d1[0]._360question[0].question
    //   const d2 = res.data.filter(q => q.markId == 3)
    //   d[3] = d2[0]._360question[0].question
    //   const d3 = res.data.filter(q => q.markId == 5)
    //   d[5] = d3[0]._360question[0].question
    // },

    setFeedback(mark){
      this.currentQuestionFeedback.feedbackMarkId = mark;
    },
    nextQuestion() {
      this.questionFeedbacks.push(this.currentQuestionFeedback);
      this.currentQuestionIndex++;
      this.newQuestionFeedback();
    },
    lastQuestion() {
      this.questionFeedbacks.push(this.currentQuestionFeedback);

      this.feedbackCommentsDialog.startDoing = null;
      this.feedbackCommentsDialog.stopDoing = null;
      this.feedbackCommentsDialog.open = true;
    },
    async submitFeedback() {
      const data = {
        feedbacks: this.questionFeedbacks,
        startDoing: this.feedbackCommentsDialog.startDoing,
        stopDoing: this.feedbackCommentsDialog.stopDoing,
        otherComments: this.feedbackCommentsDialog.otherComments
      }
      const res360 = await axios.post(this.$backendUrl + `api/_360evaluation/feedback/${this.selectedEmployee.evaluationId}`, data);
      this.selectedEmployee = null;
    },

    // async selectTestEmployee(){
    //   const res = await axios.get(this.$backendUrl + `api/EmployeeEvaluations/i-evaluate-360`);
    //   this.employees = res.data.map(e => ({
    //     id: e.evaluation.employee.id,
    //     name: e.evaluation.employee.nameTemp,
    //     evaluationId: e.id
    //   }));
    // },

    async selectEmployeeFor360(employee) {
      this.currentQuestionIndex = 0;
      this.questionFeedbacks = [];

      this.selectedEmployee = employee;
      const res = await axios.get(this.$backendUrl + `api/_360evaluation/employee/${employee.id}/evaluator`);
      this.questionarie = res.data;

      this.newQuestionFeedback();
      // this.currentQuestionId = this.questionarie[0].id;
    },

    // private
    newQuestionFeedback(){
      this.currentQuestionFeedback = {
        evaluationId: this.selectedEmployee.evaluationId,
        questionId: this.questionarie[this.currentQuestionIndex].id,
        feedbackMarkId: 0,
        comment: null
      }
    }
  },

  computed: {
    currentQuestions() {
      // if (!this.currentQuestionId) return null;
      if (!this.questionarie) return null;

      // const q = this.questionarie.filter(r => r.id == this.currentQuestionId)[0];
      const q = this.questionarie[this.currentQuestionIndex];
      if (!q) return null;
      const qByMark = {}
      q._360questionToMark.forEach(qm => {
        qByMark[qm.markId] = {
          id: qm.id,
          markId: qm.markId,
          question: qm._360question[0].question
        }
      })

      return qByMark;
    },
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
