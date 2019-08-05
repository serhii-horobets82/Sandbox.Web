<template>
<v-container fluid>
  <v-layout row wrap class="align-center">
    <v-flex xs6>
      <div class="title font-weight-bold" style="line-height: 48px !important;">Manage Projects</div>
    </v-flex>
    <v-flex xs6 text-xs-right>
      <v-layout row wrap justify-space-between>
        <!-- <v-select
          :items="filters"
          label="Filter"
          item-text="name"
          item-value="id"
          v-model="filter"
        > -->
        <!--
          @change="loadProjects()"
          :disabled="true" -->
        <!-- </v-select> -->
      </v-layout>
    </v-flex>
  </v-layout>

  <v-layout row wrap>

  <!-- <v-card> -->
      <v-flex xs12 v-for="project in projects" :key="'project-'+project.id">
        <v-card class="mb-4 pb-3">
          <v-card-title primary-title class="title">
            {{ project.name }}
            <!-- <span> (Project ID: {{ project.id }})</span> -->
            <v-spacer></v-spacer>
            <v-btn :to="{name: 'project-positions', params: {projectId:project.id, projectName: project.name}}">Manage Positions</v-btn>
            <v-btn :to="{name: 'teamEdit', params: {projectId: project.id, id:0}}"> <v-icon>add</v-icon> Add Team</v-btn>
            <v-btn :to="{name: 'projectEdit', params: {id:project.id}}">Edit</v-btn>
          </v-card-title>

          <v-container fluid grid-list-lg class="pa-0">
          <v-layout row wrap>
            <v-flex xs12 md6 lg4 v-for="team in project.team" :key="team.id">
              <v-card flat color="rgb(245, 249, 252)" class="white--text" >
                <v-card-title class="subheading pb-0">
                  {{ team.name }}

                  <v-spacer></v-spacer>
                  <v-btn :to="{name: 'teamEdit', params: {projectId: project.id, id: team.id}}" icon>
                    <v-icon >edit</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <!-- ID: {{ team.id }} -->
                  <v-list two-line>
                    <v-list-tile
                      v-for="item in team.employeeRelations"
                      :key="item.id"
                      avatar
                    >
                      <v-list-tile-avatar color="teal">
                        <span class="white--text headline" v-if="item.manager">{{ item.manager.nameTemp[0] }}</span>
                        <span class="white--text headline" v-if="item.employee">{{ item.employee.nameTemp[0] }}</span>
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title v-if="item.manager">{{ item.manager.nameTemp }}</v-list-tile-title>
                        <v-list-tile-title v-if="item.employee">{{ item.employee.nameTemp }}</v-list-tile-title>
                        <v-list-tile-sub-title v-if="item.manager">{{item.manager.employeeType.type}} - {{ item.position ? item.position.name : '...' }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title v-if="item.employee">{{item.employee.employeeType.type}} - {{ item.position ? item.position.name : '...' }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          </v-container>

        </v-card>
      </v-flex>

    <!-- </v-card> -->

  </v-layout>
</v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filters: [
        {id: 1, name: 'Mine'},
        {id: 2, name: 'All'},
      ],
      filter: 2,
      projects: []
    }
  },

  async created() {
    await this.loadProjects();
  },

  methods: {
    async loadProjects(){
      const response = await axios.get(this.$backendUrl + `api/projects${this.filter === 1 ? '?only-mine' : ''}`)
      this.projects = response.data;
    }
  }
}
</script>

<style>

</style>
