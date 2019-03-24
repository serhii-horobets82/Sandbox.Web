<template>
<v-container>
  <v-layout row wrap class="align-center">
    <v-flex xs6>
      <h1>Projects list</h1>
    </v-flex>
    <v-flex xs6 text-xs-right>
      <v-btn color="success" :to="{name: 'projectEdit', params: {id: 0}}">Create project</v-btn>
    </v-flex>
  </v-layout>

  <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="project in projects" :key="project.id">
            <v-card>
              <v-card-title primary-title  class="headline">
                {{ project.name }}
                <span> (Project ID: {{ project.id }})</span>
                <v-spacer></v-spacer>
                <v-btn :to="{name: 'teamEdit', params: {projectId: project.id, id:0}}"> <v-icon>add</v-icon> Add Team</v-btn>
                <v-btn :to="{name: 'projectEdit', params: {id:project.id}}">Edit</v-btn>
              </v-card-title>

              <v-layout row wrap>
                  <v-flex xs12 md6 lg4 v-for="team in project.team" :key="team.id">
                    <v-card color="blue-grey darken-2" class="white--text">
                      <v-card-title class="headline">
                        {{ team.name }}

                        <v-spacer></v-spacer>
                        <v-btn :to="{name: 'teamEdit', params: {projectId: project.id, id: team.id}}" icon>
                          <v-icon color="white">edit</v-icon>
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

                            <!-- <v-list-tile-action>
                              <v-btn icon ripple>
                                <v-icon color="grey lighten-1">info</v-icon>
                              </v-btn>
                            </v-list-tile-action> -->
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              <!-- <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
</v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projects: []
    }
  },

  async created() {
    try {
    const response = await axios.get(this.$backendUrl + 'api/projects')
    console.log(response)
    this.projects = response.data;
    }
    catch (e){
      console.log(e)
    }
  }
}
</script>

<style>

</style>
