<template>
  <v-container>
  <v-layout row wrap>
  <v-flex xs6>
    <h1>Positions</h1>
  </v-flex>
  <v-flex xs6 text-xs-right>
    <!-- <v-spacer></v-spacer> -->

    <v-btn color="success" :to="{name: 'positionEdit', params: {id: 0}}">Create position</v-btn>
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
                <div>
                  <div class="headline">{{ position.name }}</div>
                  <span>ID: {{ position.id }}</span>
                </div>
              </v-card-title>
              <v-card-text>
                <v-card v-for="item in position.positionRole" :key="item.id">
                  <v-card-title>{{ item.role.name }}</v-card-title>
                  <v-card-text>
                      <v-list dense>
                          <!-- <v-subheader>Recent chat</v-subheader> -->
                          <v-list-tile
                            v-for="competence in item.role.ecfRoleCompetence"
                            :key="competence.id"
                          >

                            <v-list-tile-content>
                              <!-- <v-list-tile-title v-text="item.title"></v-list-tile-title> -->
                              <v-list-tile-title>{{ competence.competence.name }}</v-list-tile-title>
                              </v-list-tile-content>

                            <v-list-tile-action>
                              {{ competence.competenceLevel }}
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>

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

export default {
  data() {
    return {
      positions: [],
      items: [
          { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
        ],
    }
  },

  async created() {
    const response = await axios.get(this.$backendUrl + 'api/positions')
    this.positions = response.data;
  }
}
</script>

<style>

</style>
