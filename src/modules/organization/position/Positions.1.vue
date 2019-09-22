<template>
  <v-container>
  <v-layout row wrap class="align-center">
    <v-flex xs6>
      <h1>Positions for Project: {{ project.name }}</h1>
    </v-flex>
    <v-flex xs6 text-xs-right>
      <v-btn color="success" :to="{name: 'project-positionEdit', params: {id: 0, projectId: $route.params.projectId }}">Create position</v-btn>
    </v-flex>
  </v-layout>
  <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12 md6 lg4 v-for="position in positions" :key="position.id">
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>

                <div class="headline">{{ position.name }}</div>
                <!-- <span>ID: {{ position.id }}</span> -->
                <v-spacer></v-spacer>
                <v-btn icon flat color="white" v-if="false" :to="{name: 'project-positionEdit', params: {id: position.id, projectId: $route.params.projectId }}">
                  <v-icon>edit</v-icon>
                </v-btn>

              </v-card-title>
              <v-card-text>
                <v-card v-for="item in position.positionRole" :key="item.id" class="mb-1">
                  <v-card-title>
                      <span class="subheading">{{ item.role.name }}</span>

                      <v-spacer></v-spacer>
                      <v-btn flat icon @click="expandCollapse(item)">
                        <v-icon >
                          {{item.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
                        </v-icon>
                      </v-btn>
                  </v-card-title>

                  <v-divider v-if="item.expanded"></v-divider>
                  <v-card-text v-if="item.expanded">
                    <EcfCompetenceRow v-for="competence in (getRoleCompetences(item.role) || [])" :key="competence.id"
                      :competence="competence"
                      :competenceLevels="competence.levels"
                      ></EcfCompetenceRow>
                      <!-- <v-list dense>
                        <v-list-tile
                          v-for="competence in item.role.ecfRoleCompetence"
                          :key="competence.id"
                        >

                          <v-list-tile-content>
                            <v-list-tile-title>{{ competence.competence.name }}</v-list-tile-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                            {{ competence.competenceLevel }}
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list> -->

                  </v-card-text>
                </v-card>

              </v-card-text>
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
import EcfCompetenceRow from '@/components/EcfCompetenceRow.vue'

export default {
  components: {
    EcfCompetenceRow
  },

  data() {
    return {
      positions: null,
      project: {},
    }
  },

  async created() {
    const projectId = this.$route.params.projectId;
    const res = await axios.get(this.$backendUrl + `api/projects/${projectId}`);
    this.project = res.data;
    const response = await axios.get(this.$backendUrl + `api/positions/project/${projectId}`)
    this.positions = response.data;
  },

  methods: {
    getRoleCompetences(role){
      const competences = []
      for (let c of role.ecfRoleCompetence) {
        const item = {
          id: c.competence.id,
          name: c.competence.name,
          levels: [],
          roleLevel: c.competenceLevel
        }

        for (let level of c.competence.competenceLevel) {
          item.levels[level.level] = {
            description: level.description,
            level: level.level
          }
        }

        competences.push(item)
      }
      return  competences
    },

    expandCollapse(item) {
      if (item.expanded == undefined) {
        this.$set(item, 'expanded', true)
      }
      else {
        item.expanded = !item.expanded
      }
    }
  }
}
</script>

<style>

</style>
