<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h2 class="red--text">NOT WORKING!!!!</h2>
        <h2 v-if="$route.params.id == 0">Create Team</h2>
        <h2 v-else>Edit team (ID: {{$route.params.id}})</h2>
      </v-flex>

    </v-layout>

      <v-form>
        <!-- {{team}} -->
        <v-text-field
          v-model="team.name"
          label="Name">

        </v-text-field>

        <v-autocomplete
          :items="managers"
          color="primary"
          item-text="nameTemp"
          label="Manager"
          v-model="team.manager"
        ></v-autocomplete>

        <h3>Team members:</h3>
        <v-list>
            <v-list-tile
              v-for="(item, i) in team.teamMembers"
              :key="item.id"
              avatar
            >
              <!-- <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar> -->

              <v-list-tile-content>
                <!-- <v-list-tile-title> -->
                  <v-layout row align-center>
                    <v-flex xs5>
                      {{ item.nameTemp }}
                    </v-flex>

                    <v-flex xs5>
                      <!-- <v-icon>add</v-icon> -->
                      <span v-if="!!item.position">(Position: {{item.position.name}})</span>
                      <v-btn v-if="!item.position" outline>Assign position</v-btn>
                      <!-- <a v-if="!item.position" @click.prevent="assignPosition(item)">Assign position</a> -->
                    </v-flex>

                    <!-- <v-flex xs2>
                      <v-icon>add</v-icon>
                    </v-flex> -->
                </v-layout>
                <!-- </v-list-tile-title> -->

              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon color="red" @click="team.teamMembers.split(i, 1)">clear</v-icon>
                <!-- <v-icon color="success" @click="addEmployee(item)">add</v-icon> -->
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        <!-- <v-autocomplete
          v-for="(e, i) in team.teamMembers"
          :key="e.id"
          :items="employees"
          color="primary"
          item-text="nameTemp"
          :label="'Employee ' + i"
        ></v-autocomplete> -->

        <!-- <v-autocomplete
          :items="employees"
          color="primary"
          item-text="nameTemp"
          :label="'Employee ' + i"
          @input=""
        ></v-autocomplete> -->


        <v-btn @click="addTeamMembers()">Add</v-btn>
      </v-form>

    <v-dialog
      v-model="dialog"
      max-width="800"
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
          <!-- <v-card v-for="item in employeesFiltered"
              :key="item.id">
            <v-card-title>
              <v-layout>
                <v-flex xs5>123</v-flex>
                <v-flex xs5>123</v-flex>
                <v-flex xs2>
                  <v-btn>add</v-btn>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card> -->
          <v-list>
            <v-list-tile
              v-for="item in employeesFiltered"
              :key="item.id"
              avatar
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.nameTemp }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="success" @click="addEmployee(item)">add</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          <!-- <v-card v-for="item in employeesFiltered" :key="item.id">
            <v-card-title class="headline">
              {{item.nameTemp}}
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="addRole(role)"
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card> -->
          </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false; filter=''">Done</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

      <v-divider></v-divider>

      <v-btn color="success">Save</v-btn>
      <v-btn :to="{name:'projects'}">Back</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      filter: '',
      team: {teamMembers: []},
      managers: [],
      employees: []
    }
  },

  async created() {
    const id = +this.$route.params.id;
    // console.log(id, this.$route.params.id)
    if (id !== 0) {
      // console.log('request')
      const response = await axios.get(this.$backendUrl + 'api/teams/' + this.$route.params.id)
      const data = response.data;

      const relManagers = data.employeeRelations.map(e => e.manager).filter(e => !!e);
      data.manager = relManagers.length ? relManagers[0] : {}

      const teamMembers = data.employeeRelations
        .map(e => ({
          employee: e.employee,
          position: e.employeePosition[0]
        }))
        .filter(e => !!e.employee);

      teamMembers.forEach(m => m.employee.position = m.position)
      data.teamMembers = teamMembers.map(m => m.employee);

      this.team = response.data;
      console.log(this.team)
      // this.$set(this.team, 'teamMembers', )
    }

    const employeesResponse = await axios.get(this.$backendUrl + 'api/employees');
    this.managers = employeesResponse.data.filter(e => e.isManager);
    this.employees = employeesResponse.data.filter(e => !e.isManager);
    // const managersResponse = await axios.get(this.$backendUrl + 'api/employees/managers');
    // this.managers = managersResponse.data;
  },

  methods: {
    onMemberAdd(value){
      // this.team.teamMembers.push(value);
    },
    addTeamMembers(){
      // console.log(this.team)
      // this.team.teamMembers.push({id:0})
      this.dialog = true;
    },
    addEmployee(employee) {

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
