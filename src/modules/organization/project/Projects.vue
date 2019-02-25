<template>
<v-container>
  <v-layout row wrap>
  <v-flex xs6>
    <h1>Projects list</h1>
  </v-flex>
  <v-flex xs6 text-xs-right>
    <!-- <v-spacer></v-spacer> -->

    <v-btn color="success" :to="{name: 'projectEdit', params: {id: 0}}">Create project</v-btn>
  </v-flex>
  </v-layout>
  <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="project in projects" :key="project.id">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ project.name }}</div>
                  <span>ID: {{ project.id }}</span>
                </div>
              </v-card-title>

              <v-layout row wrap>
                  <v-flex v-for="team in project.team" :key="team.id">
                    <v-card color="blue-grey darken-2" class="white--text">
                      <v-card-title>
                        <div>
                          <div class="headline">{{ team.name }}</div>
                          <span>ID: {{ team.id}} </span>
                        </div>
                      </v-card-title>
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
    const response = await axios.get('https://localhost:5001/api/projects')
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
