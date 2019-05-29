<template>
  <div>
    <v-icon small @click="showDetailedInfo(competence.id)" class="mr-2">info</v-icon>

    <v-dialog v-model="open" @keydown.esc="open = false" max-width="800" scrollable>
      <v-card v-if="details">
        <v-card-title>
          <span class="headline mb-3"> {{details.id.trim()}}. {{details.name}} </span>
          {{ details.summary }}
        </v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex v-for="i in [1,2,3,4,5]" :key="i" class="ma-1">
              <div class="subheading mb-1" style="min-width: 90px">
                E{{i}}

                <v-icon v-if="competence.competenceLevel == i" color="success" class="ml-1">check</v-icon>

              </div>
              <div>{{ levels[i] || '-' }}</div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="open = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['competence'],

  data: () => ({
    open: false,
    details: null,
    levels: [],
  }),

  async created(){

  },

  methods: {
    async showDetailedInfo(id){
      this.open = true;
      const res = await axios.get(this.$backendUrl + `api/competences/${id}`);
      this.details = res.data;

      const d = {}
      res.data.ecfCompetenceLevel.forEach(r => {
        d[r.level] = r.description
      })
      this.levels = d;
    }
  }
}
</script>

<style>

</style>
