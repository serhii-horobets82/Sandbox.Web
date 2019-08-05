<template>
  <v-container style="max-width: 800px;">
    <v-layout>
      <v-flex v-if="project">
        <h2 v-if="$route.params.id != 0" class="red--text">EDIT IS NOT WORKING PROPERLY!!!!</h2>

        <div class="title font-weight-bold" v-if="$route.params.id == 0">
          Project: {{ project.name }} - Create Team
        </div>
        <div class="title font-weight-bold" v-else>
          Project: {{ project.name }} - Edit team {{ team.name }}
        </div>
      </v-flex>

    </v-layout>

    <v-layout row wrap class="mt-3">
      <v-flex xs12>

      <v-form>
        <!-- {{team}} -->
        <v-text-field
          v-model="team.name"
          label="Name">

        </v-text-field>

        <v-autocomplete v-for="(managerRelation, i) in team.employeeRelationManager" :key="managerRelation.id"
          :items="managers"
          color="primary"
          item-text="nameTemp"
          item-value="id"
          label="Manager (default: inherited from Project)"
          v-model="team.employeeRelationManager[i].managerId"
        ></v-autocomplete>

        <h3>
          Team members:
          <v-btn @click="addTeamMembers()"><v-icon>add</v-icon>Add</v-btn>
        </h3>
        <v-list>
          <v-list-tile
            v-for="(item, i) in team.employeeRelationEmployee"
            :key="item.employeeId"
            avatar
          >
            <v-list-tile-avatar color="teal">
              <span class="white--text headline">{{ employeesById[item.employeeId].nameTemp[0] }}</span>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-container>
              <v-layout align-center>
                <v-flex xs5>
                  {{ employeesById[item.employeeId].nameTemp }}
                </v-flex>

                <v-flex xs5>
                  <!-- <v-icon>add</v-icon> -->
                  <span v-if="!!item.positionId">(Position: {{ positionsById[item.positionId].name}})</span>
                  <v-btn v-if="!item.positionId" outline @click="positionsDialog = true; currentEmployeeRelation = item">Assign position</v-btn>
                  <!-- <a v-if="!item.position" @click.prevent="assignPosition(item)">Assign position</a> -->
                </v-flex>
              </v-layout>
              </v-container>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon color="red" @click="team.employeeRelationEmployee.split(i, 1)">clear</v-icon>
              <!-- <v-icon color="success" @click="addEmployee(item)">add</v-icon> -->
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-form>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="dialog"
      max-width="600"
      scrollable
    >
      <v-card>
        <v-card-title class="headline">
          <v-layout row align-center class="dialog-header">
            <v-flex xs6>Employees</v-flex>
            <v-flex xs6>
              <v-text-field flat
                hide-details
                label="Filter"
                prepend-inner-icon="search"
                v-model="filter"
                ></v-text-field>
            </v-flex>
          </v-layout>

        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-tile
              v-for="item in employeesFiltered"
              :key="item.id"
              avatar
            >
              <v-list-tile-avatar color="teal">
                <span class="white--text headline">{{ item.nameTemp[0] }}</span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.nameTemp }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="success" @click="addEmployee(item)">add</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false; filter=''">Done</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="positionsDialog"
        max-width="800"
        scrollable
        @keydown.esc="positionsDialog = false"
      >

        <v-card>
          <v-card-title class="headline">
            <v-layout row align-center class="dialog-header">
              <v-flex xs6>Positions</v-flex>
              <!-- <v-flex xs6>
                <v-text-field flat
                  hide-details
                  label="Filter"
                  prepend-inner-icon="search"
                  v-model="filter"
                  ></v-text-field>
              </v-flex> -->
            </v-layout>

          </v-card-title>

          <v-card-text>

              <v-card v-for="item in positions" :key="item.id">
                <v-card-title class="headline">
                  {{item.name}}
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="assignPosition(item); positionsDialog = false;">
                    Select
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="positionsDialog = false">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-divider class="my-3"></v-divider>

      <v-layout row wrap>
        <!-- <v-flex xs12> -->
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveTeam()">Save</v-btn>
          <v-btn :to="{name:'projects'}">Back</v-btn>
        <!-- </v-flex> -->
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import toast from '@/services/toast'

export default {
  data() {
    return {
      dialog: false,
      filter: '',
      project: null,
      positionsDialog: false,

      team: {},
      managers: [],

      employees: [],
      positions: [],

      employeesById: {},
      positionsById: {},

      currentEmployeeRelation: null
    }
  },

  async created() {
    await this.loadDictionaryData()

    const id = +this.$route.params.id;
    const projectId = +this.$route.params.projectId;
    this.project = await this.$http.get(`api/projects/${projectId}`).then(d => d.data);

    if (id !== 0) {
      const response = await axios.get(this.$backendUrl + 'api/teams/' + this.$route.params.id)
      const data = response.data;

      const team = {
        id: data.id,
        name: data.name,
        projectId: data.projectId,
        employeeRelationManager: data.employeeRelations.filter(r => !!r.managerId),
        employeeRelationEmployee: data.employeeRelations.filter(r => !!r.employeeId)
      }
      if (team.employeeRelationManager.length === 0){
        team.employeeRelationManager.push({id: 0, managerId: 0, projectId: projectId, teamId: data.id})
      }

      this.team = team;
      console.log(this.team)

      // this.$set(this.team, 'teamMembers', )
    } else {
      const team = {
        id: 0,
        name: '',
        projectId: projectId,
        employeeRelationManager: [{id: 0, managerId: 0, projectId: projectId, teamId: 0}],
        employeeRelationEmployee: []
      }
      this.team = team;
    }

    // const managersResponse = await axios.get(this.$backendUrl + 'api/employees/managers');
    // this.managers = managersResponse.data;
  },

  methods: {
    async loadDictionaryData(){
      const employeesResponse = await axios.get(this.$backendUrl + 'api/employees');
      this.managers = employeesResponse.data.filter(e => e.isManager);
      this.employees = employeesResponse.data.filter(e => !e.isManager);

      const allEmployeesById = {}
      employeesResponse.data.forEach(r => allEmployeesById[r.id] = r)
      this.employeesById = allEmployeesById

      const positionsResponse = await axios.get(this.$backendUrl + 'api/positions');
      this.positions = positionsResponse.data;
      const positionsById = {}
      positionsResponse.data.forEach(r => positionsById[r.id] = r)
      this.positionsById = positionsById
    },

    onMemberAdd(value){
      // this.team.teamMembers.push(value);
    },
    addTeamMembers(){
      // console.log(this.team)
      // this.team.teamMembers.push({id:0})
      this.dialog = true;
    },
    addEmployee(employee) {
      this.team.employeeRelationEmployee.push({
        id: 0,
        employeeId: employee.id,
        // projectId: this.team.projectId,
        teamId: this.team.id
      })
    },
    async saveTeam(){
      const data = {
        id: this.team.id,
        name: this.team.name,
        projectId: this.team.projectId,
        employeeRelations: []
      }
      this.team.employeeRelationManager.forEach(m => {
        if (m.managerId) {
          data.employeeRelations.push({
            id: m.id,
            managerId: m.managerId,
            // employeeId
            // teamId // is EF smart enough to populate this?
            // projectId: this.project.id,
            positionId: m.positionId
          });
        }
      });

      this.team.employeeRelationEmployee.forEach(m => data.employeeRelations.push({
        id: m.id,
        // managerId: m.managerId,
        employeeId: m.employeeId,
        // teamId // is EF smart enough to populate this?
        // projectId: this.project.id,
        positionId: m.positionId
      }))
      data.employeeRelations.forEach(r => r.projectId = this.project.id)

      if (data.id) {
        await axios.put(this.$backendUrl + 'api/teams/' + data.id, data)
      } else {
        await axios.post(this.$backendUrl + 'api/teams', data)
      }
      toast.success(`Project ${this.project.name}: Team ${data.name} saved successfully!`);
      this.$router.push({name: 'projects'});
      // console.log('Going to save this:', data)
    },
    assignPosition(position){
      this.currentEmployeeRelation.positionId = position.id;
    }
  },

  computed: {
    employeesFiltered() {
      const filter = this.filter.toLowerCase()
      return this.employees.filter(e => e.nameTemp.toLowerCase().includes(filter))
    }
  }
}
</script>

<style>

</style>
