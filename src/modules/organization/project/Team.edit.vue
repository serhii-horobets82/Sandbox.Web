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

        <v-autocomplete
          :items="managers"
          color="primary"
          item-text="nameTemp"
          label="Manager"
          v-model="team.manager"
        ></v-autocomplete>

        <h3>Team members:</h3>
        <v-autocomplete
          v-for="(e, i) in team.teamMembers"
          :key="e.id"
          :items="employees"
          color="primary"
          item-text="nameTemp"
          :label="'Employee ' + i"
        ></v-autocomplete>

        <!-- <v-autocomplete
          :items="employees"
          color="primary"
          item-text="nameTemp"
          :label="'Employee ' + i"
          @input=""
        ></v-autocomplete> -->


        <v-btn @click="addTeamMember()">Add</v-btn>
      </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      team: {teamMembers: []},
      managers: [],
      employees: []
    }
  },

  async created() {
    const response = await axios.get(this.$backendUrl + 'api/teams/' + this.$route.params.id)
    // const data = response.data;
    // data.teamMembers =
    this.team = response.data;
    // this.$set(this.team, 'teamMembers', )

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
    addTeamMember(){
      console.log(this.team)
      this.team.teamMembers.push({id:0})
    }
  }
}
</script>

<style>

</style>
