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
    <v-layout>
      <v-flex>
        <h1>360</h1>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs4 class="pr-4">
        <v-card>
          <v-layout row class="pt-1 pb-1">
            <v-flex xs12>
            <v-text-field
              class="pl-2"
              solo flat :hide-details="true"
              label="Filter"
              prepend-inner-icon="search"
              v-model="filter"
              >
            </v-text-field>
            </v-flex>

            <v-flex>
            <v-btn icon color="teal" class="mt-1 white--text" @click="openInviteDialog()">
              <v-icon>add</v-icon>
            </v-btn>
            </v-flex>
          </v-layout>
        </v-card>

        <v-card>
          <v-list>
            <v-list-tile
              v-for="e in employeesFiltered" :key="e.id"
              @click="!e.evaluation.endDate && selectEmployeeFor360(e)"
              :class="{
                'grey lighten-3': selectedEmployee && e.id === selectedEmployee.id,
                'evaluated': e.evaluation.endDate
              }"
              avatar
            >
              <v-list-tile-avatar :color="e.evaluation.endDate ? 'grey' : 'teal'">
                <!-- <img :src="item.avatar"> -->
                <span class="white--text headline">
                  {{ e.name[0] }}
                </span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ e.name }}</v-list-tile-title>
                <!-- <v-list-tile-sub-title>{{ e.employeeType.type }}</v-list-tile-sub-title> -->
              </v-list-tile-content>

              <v-list-tile-action>
                <!-- <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon> -->
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>

      </v-flex>

      <v-flex xs8>
        <v-card>
        <v-layout row class="text-xs-center">
          <v-flex v-for="(q, idx) in questionarie" :key="q.id">
            <!-- <v-divider vertical></v-divider> -->
            <v-card :class="`green lighten-${currentQuestionIndex == idx ? 2 : 4} pa-3`">
              {{q.text}}
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row v-if="currentQuestions" class="pa-4">
          <v-flex xs8>
            <h2>Q1. Contributing to the team's work</h2>
            <span>Please select the block...</span>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            <v-card flat class="pt-2 pb-2 pl-5 pr-5 blue--text" color="blue lighten-5">
              <h3>{{selectedEmployee.name}}</h3>
              <span>User type</span>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-if="currentQuestions">
          <v-flex xs12 class="pa-3" v-if="currentQuestions && !feedbackCommentsDialog.open" >

            <v-flex xs12 v-for="i of [1,2,3,4,5]" :key="i">
              <v-card class="mb-3" tile :hover="true" :class="{'blue lighten-4': currentQuestionFeedback.feedbackMarkId === i}"  @click="setFeedback(i)">
                <v-card-text style="white-space: pre;">{{ i % 2 == 1 ? currentQuestions[i].question : "Demonstrates behaviors described above and below" }}</v-card-text>
              </v-card>
            </v-flex>

          </v-flex>

          <v-flex xs12 class="pa-3" v-if="feedbackCommentsDialog.open">
            <v-card flat>
              <v-card-title class="headline pa-0">
                Suggestions to improve
              </v-card-title>
              <v-card-text class="pa-0">
                <v-card flat><v-textarea color="green" v-model="feedbackCommentsDialog.startDoing" label="Start doing"></v-textarea></v-card>
                <v-card flat><v-textarea color="red" v-model="feedbackCommentsDialog.stopDoing" label="Stop doing"></v-textarea></v-card>
                <v-card flat><v-textarea v-model="feedbackCommentsDialog.otherComments" label="Other comments"></v-textarea></v-card>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!(feedbackCommentsDialog.startDoing || feedbackCommentsDialog.stopDoing)" @click="submitFeedback()">Done</v-btn>
              </v-card-actions> -->
            </v-card>
          </v-flex>

          <v-flex>
             <!-- <v-layout> -->
              <!-- <v-spacer></v-spacer> -->

              <!-- <v-btn class="primary ma-0" block large
                v-if="currentQuestionIndex === (questionarie.length - 1)"
                :disabled="!currentQuestionFeedback.feedbackMarkId"
                @click="submitFeedback()"
                >
                Submit
              </v-btn>

              <v-btn class="primary ma-0" block large
                v-else
                :disabled="!currentQuestionFeedback.feedbackMarkId"
                @click="nextQuestion()"
                >
                Next
              </v-btn> -->
              <v-btn class="primary ma-0" block large
                v-if="feedbackCommentsDialog.open"
                :disabled="!(feedbackCommentsDialog.startDoing || feedbackCommentsDialog.stopDoing)"
                @click="submitFeedback()"
                >
                Submit
              </v-btn>
              <v-btn class="primary ma-0" block large
                v-else
                :disabled="!currentQuestionFeedback.feedbackMarkId"
                @click="nextQuestion()"
                >
                Next
              </v-btn>
            <!-- </v-layout> -->
          </v-flex>
        </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="dialog.open"
      max-width="500"
      scrollable
      @keydown.esc="dialog.open=false"
    >
      <v-card>
        <v-card-title class="headline pb-0">
          <v-layout row wrap align-center class="dialog-header">
            <v-flex xs12 class="mb-3">Invite for evaluation</v-flex>
            <v-flex xs12>
              <v-text-field solo
                hide-details
                label="Filter"
                prepend-inner-icon="search"
                v-model="dialog.filter"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 class="mt-4">

              <span class="subheading">Result</span>
            </v-flex>
          </v-layout>
        </v-card-title>

        <v-card-text class="pt-0">

          <v-list two-line>
            <v-list-tile
              v-for="item in dialogEmployeesFiltered"
              :key="item.id"
              @click="inviteForEvaluation(item)"
              avatar
            >
              <v-list-tile-avatar color="teal" class="align-center">
                <!-- <img :src="item.avatar"> -->
                <span class="white--text headline">
                  {{ item.name[0] }}
                </span>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.name }}
                </v-list-tile-title>
                <!-- <v-list-tile-subtitle>aaaaaa</v-list-tile-subtitle> -->
                <v-list-tile-sub-title v-if="item.__show">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field class="pt-1" placeholder="Reason to add" :hide-details="true"></v-text-field>

                    </v-flex>
                    <v-flex>
                      <v-btn>Invite</v-btn>
                    </v-flex>
                  </v-layout>

                </v-list-tile-sub-title>
              </v-list-tile-content>
              <!-- <v-list-tile-action>
                <v-btn color="primary" @click="inviteForEvaluation(item.id)">Invite</v-btn>
              </v-list-tile-action> -->
            </v-list-tile>
          </v-list>

        </v-card-text>

        <!-- <v-divider></v-divider> -->

        <v-card-actions class="pa-0">
          <v-btn block large @click="dialog.open = false; dialog.filter=''">Cancel</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- <v-dialog
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
    </v-dialog> -->

  </v-container>
</template>

<script>
import axios from 'axios'
import toast from '@/services/toast'

export default {
  data: () => ({
    filter: '',
    // testEmployees: [],
    // testEmployeeId: null,
    employees: [],
    selectedEmployee: null,
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
        evaluationId: e.id,
        evaluation: e
      }));
  },

  methods: {
    async openInviteDialog(){
      this.dialog.open = true;
      const res = await axios.get(this.$backendUrl + 'api/Employees');
      this.dialog.employees = res.data.map(e => ({id: e.id, name: e.nameTemp}))
    },
    inviteForEvaluation (employee) {
      this.$set(employee, '__show', true)
      // const res = await axios.get(this.$backendUrl + 'api/');
    },


    setFeedback(mark){
      this.currentQuestionFeedback.feedbackMarkId = mark;
    },
    nextQuestion() {
      if (this.currentQuestionIndex === (this.questionarie.length - 1)) {
        this.lastQuestion();
        return;
      }
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

      toast.success(`Feedback has been saved.`)
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
