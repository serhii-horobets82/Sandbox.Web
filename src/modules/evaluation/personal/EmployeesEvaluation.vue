<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <h1>Employees</h1>
      </v-flex>
    </v-layout>

    <v-container>
      <v-layout row wrap v-for="e in tableData" :key="e.id">
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
      </v-layout>
    </v-container>

    <v-dialog
      v-model="dialog.open"
      max-width="800"
      scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">Start evaluation process</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-autocomplete
                  :items="selectedEmployeeEvaluators.technical"
                  color="primary"
                  item-text="nameTemp"
                  item-value="id"
                  label="Technical Evaluator"
                  v-model="selectedEmployee.technicalEvaluatorId"
                  required
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider></v-divider>
          <v-container>
            <v-layout>
              <v-flex xs12>
                <span class="headline">360 feedback evaluators</span>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-list subheader>
                  <v-subheader inset>Peers</v-subheader>

                  <v-list-tile
                    v-for="item in selectedEmployeeEvaluators['360peers']"
                    :key="item.id"
                    avatar
                  >
                    <v-list-tile-avatar color="teal">
                      <!-- <v-avatar color="teal"> -->
                      <span class="white--text headline">
                        {{item.nameTemp[0] }}
                      </span>
                      <!-- </v-avatar> -->
                      <!-- <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon> -->
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nameTemp }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <!-- <v-icon color="grey lighten-1">info</v-icon> -->
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-subheader inset>Customers</v-subheader>

                  <v-list-tile
                    v-for="item in selectedEmployeeEvaluators['360customers']"
                    :key="item.id"
                    avatar
                  >
                    <v-list-tile-avatar>
                      <!-- <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon> -->
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <!-- <v-icon color="grey lighten-1">info</v-icon> -->
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!canStartEvaluation" @click="startEvaluation()">Start</v-btn>
          <v-btn color="blue darken-1" flat @click="closeEvaluationDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: {
        open: false,
        buttonDisabled: true,
      },
      // dialog: false,
      employees: [],
      evaluationsByEmployeeId: null,
      selectedEmployee: {},
      selectedEmployeeEvaluators: {
        technical: [],
        "360peers": [],
        "360customers": [],
        "360subordinates": [],
      }
    }
  },

  async created() {
    const response = await axios.get(this.$backendUrl + 'api/employees')
    this.employees = response.data;

    this.evaluationsByEmployeeId = await this.loadEmployeeEvaluations();
  },

  computed: {
    tableData(){
      if (!this.employees.length || !this.evaluationsByEmployeeId) {
        return []
      }
      const data = []
      for (let e of this.employees) {
        const evaluation = this.evaluationsByEmployeeId[e.id];
        const status = evaluation
          ? (evaluation.endDate || 'In Progress')
          : 'None'

        const d = {
          id: e.id,
          evaluationId: evaluation ? evaluation.id : 0,
          name: e.nameTemp,
          evaluationStatus: status,
          employeeTypeId: e.employeeTypeId
        }
        data.push(d)
      }
      return data;
    },

    canStartEvaluation(){
      return !!this.selectedEmployee.employeeId
        && !!this.selectedEmployee.technicalEvaluatorId;
    }
  },

  methods: {
    async loadEmployeeEvaluations(){
      const evalResponse = await axios.get(this.$backendUrl + 'api/employeeEvaluations')
      const byId = {}
      evalResponse.data.forEach(r => byId[r.employeeId] = r)
      return byId;
    },
    async startEvaluationDialog(employee){
      this.dialog.open = true;
      this.selectedEmployee = Object.assign({}, this.selectedEmployee, {
        employeeId: employee.id,
        technicalEvaluatorId: 0,
        name: employee.nameTemp
      })
      const resp = await axios.get(this.$backendUrl + 'api/employees?typeId=' + employee.employeeTypeId)
      this.selectedEmployeeEvaluators.technical = resp.data;

      const res = await axios.get(this.$backendUrl + `api/EmployeeEvaluations/${employee.id}/evaluators`);
      this.selectedEmployeeEvaluators['360peers'] = res.data.peers;
      this.selectedEmployeeEvaluators['360customers'] = res.data.customers;
    },

    async startEvaluation(){
      if (confirm(`This will start employee evaluation process for ${this.selectedEmployee.name}. Do you want to proceed?`)){
        this.selectedEmployee._360employeeEvaluation =
          []
          .concat(this.selectedEmployeeEvaluators['360peers'].map(e => ({ evaluatorEmployeeId: e.id, _360feedbackGroupId: 2 })))
          // .concat(this.selectedEmployeeEvaluators['360customers'].map(e => ({ evaluatorEmployeeId: e.id, _360feedbackGroupId: 3 })))
          // .concat(this.selectedEmployeeEvaluators['360subordinates'].map(e => ({ evaluatorEmployeeId: e.id, _360feedbackGroupId: 4 })))

        await axios.post(this.$backendUrl + 'api/employeeEvaluations', this.selectedEmployee)

        this.dialog.open = false;

        this.evaluationsByEmployeeId = await this.loadEmployeeEvaluations();
      }
    },

    closeEvaluationDialog(){
      this.selectedEmployee = {}
      this.dialog.open = false;
    }
  }
}
</script>

<style>

</style>
