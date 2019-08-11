<template>
  <v-container style="background-color: #F7FBFF;">
    <v-layout>
      <v-flex>
        <!-- 360 Team Review -->
        <h2 class="headline mb-3">360 Team Review</h2>

      </v-flex>
      <v-flex>
        <v-select
          :items="periods"
          v-model="period"
          label="Periods"
          item-text="text"
          item-value="value"
          @change="reloadData()"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mb-4">
      <v-flex xs3 v-for="item in projects" :key="'project-' + item.id">
        <v-card @click="load(item)"
          class="mr-2 px-4 py-3" :class="{'selected-project': selectedProjectId}"
          :elevation="1">
          <!-- <span class="body-2">
            {{item.name}}
          </span>
          <span class="body-1">
            {{item.team.length}} Teams
          </span> -->
          <h4>{{item.name}}</h4>
          <span>
            {{item.teams.length}} Teams
          </span>
          <!-- <v-card-title>
            {{item.name}}
          </v-card-title>
          <v-card-text>{{item.team.length}} Teams</v-card-text> -->
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-for="team in teams" :key="'team-' + team.id">
      <v-flex xs12>
        <h4 class="mb-3 mt-2">{{team.name}}</h4>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs4>Employee whom evaluating</v-flex>
          <v-flex xs4>Evaluated</v-flex>
          <v-flex xs4>Not Evaluated</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap
          v-for="row in byTeam[team.id]" :key="'row-' + row.employeeId"
          class="ma-3">
          <v-flex xs4>
            <v-avatar
              size="24"
              color="green"
            >
              <span class="white--text">{{employeeById[row.employeeId].name.toUpperCase()[0]}}</span>
            </v-avatar>

            {{employeeById[row.employeeId].name}} {{employeeById[row.employeeId].surname}}
          </v-flex>
          <v-flex xs4>
            <v-avatar
              v-for="id in row.evaluatedIds" :key="row.employeeId +'-evaluated-' + id"
              size="24"
              color="green"
            >
              <span class="white--text" :title="employeeById[id].name+' '+employeeById[id].surname">
                {{employeeById[id].name.toUpperCase()[0]}}
              </span>
            </v-avatar>
          </v-flex>
          <v-flex xs4>
            <v-avatar
              v-for="id in row.notEvaluatedIds" :key="row.employeeId +'-notevaluated-' + id"
              size="24"
              color="green"
            >
              <span class="white--text" :title="employeeById[id].name+' '+employeeById[id].surname">
                {{employeeById[id].name.toUpperCase()[0]}}
              </span>
            </v-avatar>
          </v-flex>

        </v-layout>
      </v-flex>
      <!-- <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs4 v-for="employeeRel in byTeam[team.id]" :key="employeeRel.id">
            <v-card class="mr-3 mb-3 ">
              <v-card-title>
                <v-avatar color="teal" size="46" class="mr-3">
                  <span class="white--text headline">
                    {{ employeeRel.manager ? employeeRel.manager.nameTemp[0] : employeeRel.employee.nameTemp[0] }}
                  </span>
                </v-avatar>
                {{employeeRel.manager ? employeeRel.manager.nameTemp : employeeRel.employee.nameTemp}}

                <v-spacer></v-spacer>
                <div>
                  Status: {{ getStatus(employeeRel.employee || employeeRel.manager) }}
                </div>
              </v-card-title>
              <v-card-text class="pt-0 pb-0 ">
                <v-divider></v-divider>
                <div class="mt-3 mb-3">
                  <v-layout class="mb-2">
                    <div style="color:#3DB3ED">
                      {{ getEvaluationProgress(employeeRel.employee || employeeRel.manager).evaluated }} Members evaluated
                    </div>
                    <v-spacer></v-spacer>
                    <div style="color:#ED3D3D">
                      {{ getEvaluationProgress(employeeRel.employee || employeeRel.manager).left }} Pending
                    </div>
                  </v-layout>
                  <v-avatar size="36" style="background-color: #DAEBF5;  margin-left: -7px; border: 3px solid white" v-for="i in 6" :key="i">
                    <span style="color:  #A2C4DA;">
                      OS
                    </span>
                  </v-avatar>
                </div>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions class="pa-0">
                <v-btn flat block large class="caption" >View Details</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    periods: null,
    period: null,
    employeeById: null,
    projects: [],
    selectedProjectId: null,
    projectEmployees: [],
    byTeam: {},
    teams: [],
  }),

  async created(){
    this.periods = await this.$http.get(`api/_360evaluation/periods`).then(_ => _.data);
    this.period = this.periods[0].value;
    this.projects = await this.$http.get(`api/projects/my-basic`).then(_ => _.data);
    const employees = await this.$http.get(`api/Employees`).then(_ => _.data);
    this.employeeById = this.toDictionary(employees, e => e.id);
  },

  methods: {
    async load(project){
      this.selectedProjectId = project.id;
      this.teams = project.teams;
      const res = await axios.get(this.$backendUrl + `api/_360evaluation/by-project/${project.id}?periodStart=${this.period}`);
      const byTeam = {};
      // // const teams = [];
      // res.data.forEach(e => {
      //   if (!byTeam[e.teamId]) {
      //     byTeam[e.teamId] = []
      //     // teams.push(e.team);
      //   }
      //   byTeam[e.teamId].push(e);
      // })
      this.byTeam = res.data;
      // // this.teams = teams;
      // // this.projectEmployees = res.data;
    },
    async reloadData(){
      if (this.selectedProjectId){
        await this.load(this.projects.filter(p => p.id == this.selectedProjectId)[0]);
      }
    },
    toDictionary(array, lambda) {
      const dict = {};
      array.forEach(a => {
        try {
          dict[lambda(a)] = a;
        } catch {}
      })
      return dict;
    },
    add(id) {

    },
    async save(){

    },
    getStatus(employee) {
      if (!employee.employeeEvaluationEmployee[0]) {
        return 'None'
      }

      return employee.employeeEvaluationEmployee[0].endDate ? 'Ended' : 'In Progress'
    },
    getEvaluationProgress(employee) {
      if (!employee.employeeEvaluationEmployee[0]) {
        return {}
      }

      if (employee.employeeEvaluationEmployee[0].endDate) {
        return {
          total: 107,
          evaluated: 87,
          left: 25
        }
      } else {
        const e = employee.employeeEvaluationEmployee[0]._360employeeEvaluation;
        return {
          total: e.length,
          evaluated: e.filter(ev => ev.endDate).length,
          left: e.filter(ev => !ev.endDate).length
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-card {
  color: #3C88B5
}
.v-card.theme--light.v-sheet {
  border: 1px solid #E8EFF7;
  box-shadow: none !important;
}
.v-btn {
  color: #3C88B5
}
</style>
