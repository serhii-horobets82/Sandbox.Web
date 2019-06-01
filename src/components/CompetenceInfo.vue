<template>
  <div>
    <v-icon small  @click="showDetailedInfo(competence.id)" color="primary" class=" mr-2">info</v-icon>

    <v-dialog v-model="open" @keydown.esc="open = false" max-width="800" scrollable>
      <v-card v-if="details">
        <v-card-title>
          <span class="headline mb-3"> {{details.id.trim()}}. {{details.name}} </span>
          {{ details.summary }}
        </v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex>
              <v-card v-for="i in [5,4,3,2,1]" :key="i" class="py-2" style="min-height: 30px">
              <v-layout row wrap align-center >
                <v-flex xs1 class="text-xs-center">
                  <v-icon v-if="competence.competenceLevel == i" color="success" class="ml-1">check</v-icon>
                  E{{i}}
                </v-flex>
                 <v-flex xs11>
                   <span >{{ levels[i] && levels[i].description ? levels[i].description : '-' }}</span>

                    <div v-if="levels[i] && levels[i].competenceCertificates">
                      <div v-for="cert in levels[i].competenceCertificates" :key="cert.id">
                        <v-icon>assignment</v-icon>
                        {{ cert.certificate.name }}
                      </div>
                    </div>
                 </v-flex>
              </v-layout>
              </v-card>

            </v-flex>
            <!-- <v-flex v-for="i in [1,2,3,4,5]" :key="i" class="ma-1">
              <div class="subheading mb-1" style="min-width: 90px">
                E{{i}}

                <v-icon v-if="competence.competenceLevel == i" color="success" class="ml-1">check</v-icon>

              </div>
              <div>{{ levels[i] && levels[i].description ? levels[i].description : '-' }}</div>
              <div v-if="levels[i] && levels[i].competenceCertificates">
                <div v-for="cert in levels[i].competenceCertificates" :key="cert.id">
                  <v-icon>assignment</v-icon>
                  {{ cert.certificate.name }}
                </div>
              </div>
            </v-flex> -->
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
        d[r.level] = {
          description: r.description,
          competenceCertificates: r.competenceCertificate
        }
      })
      this.levels = d;
    }
  }
}
</script>

<style>

</style>
