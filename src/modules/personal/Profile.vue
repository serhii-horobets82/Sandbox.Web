<template>
  <v-container>
    <!-- <v-layout> -->
      <!-- <v-layout row>
        Employee name
      </v-layout> -->

      <v-layout row wrap>
        <v-flex xs6>
          <v-card>
            <v-card-title class="headline" v-if="employee">
              {{ employee.nameTemp }} ({{ employee.employeeType.type }})
            </v-card-title>
            <v-card-text style="height: 150px" class="text-xs-center">
              <v-icon style="font-size: 100px" color="teal darken-2">perm_identity</v-icon>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Teams/Projects
            </v-card-title>
            <v-card-text style="min-height: 150px">
              <v-card v-for="item in teamsByProjectId" :key="item.id">
                <v-card-title>
                  Project: {{ item.projectName }}
                </v-card-title>

                <v-card-text>
                  Teams:
                  <ul>
                  <li v-for="team in item.teams" :key="team.teamId">
                    {{team.teamName}}
                  </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <ProfileEvaluation></ProfileEvaluation>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              OKR
            </v-card-title>
            <v-card-text style="height: 150px">

            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              OKR Progress
            </v-card-title>
            <v-card-text style="height: 150px">

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import axios from 'axios'
import EcfCompetenceRow from '@/components/EcfCompetenceRow.vue'
import ProfileEvaluation from './profile/ProfileEvaluation.vue'

export default {
  components: {
    EcfCompetenceRow,
    ProfileEvaluation
  },
  data: () => ({
    employee: null,
    teamsByProjectId: {},
    competences: []
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + `api/employees/profile`);
    this.employee = res.data;

    this.employee.employeeRelationsEmployee.forEach(r => {
      const d = {
        teamId: r.teamId,
        teamName: r.team.name
      }
      let t = this.teamsByProjectId[r.projectId];
      if (!t) {
        t = {
          id: r.id,
          projectId: r.projectId,
          projectName: r.project.name,
          teams: []
        }
        this.teamsByProjectId[r.projectId] = t
      }
      t.teams.push(d)
    })

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
