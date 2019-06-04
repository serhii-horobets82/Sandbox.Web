<template>

  <!-- <v-container>
    <v-layout>
      <v-flex> -->
        <v-card flat>
          <v-card-title class="pb-0">
            <span class="title">Current Certificates</span>
          <!-- <v-layout>
            <v-flex>
              <h3>Pending Certificates</h3>
            </v-flex>
          </v-layout> -->
          </v-card-title>
          <v-card-text class="pt-0">
            <v-layout row wrap>
              <v-flex>
                <v-list>
                  <v-list-tile v-for="cert in certificates" :key="cert.id" class="my-3">
                    <v-list-tile-avatar>
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 32.9341H32L1 2.02808V32.9341ZM9.84773 12.2164L21.7787 24.1116H9.84773V12.2164ZM1.96866 4.36158L8.87908 11.2507V25.0802H22.7503L29.6558 31.9645H1.96866V4.36158Z" fill="#3C88B5" stroke="#3C88B5"/>
                        <path d="M31.9796 2H8.96814L31.9806 24.9427V2H31.9796ZM25.2775 16.8931L17.0439 8.68472H25.2775V16.8931ZM31.011 22.6102L26.2461 17.8599V7.71606H16.0733L11.3123 2.96866H31.0119V22.6102H31.011Z" fill="#3C88B5" stroke="#3C88B5"/>
                      </svg>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{cert.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>Some dates... Could be from pdp. What to do if part of Evaluation</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>

                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>

              <v-flex>
                <v-btn>+ Add Certificate</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      <!-- </v-flex>
    </v-layout>

  </v-container> -->
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    certificates: []
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + `api/Certificates/profile`);
    this.certificates = [res.data[0], res.data[1]];
  },

  methods: {
    add(id) {

    },
    async save(){

    },
  }
}
</script>

<style>

</style>
