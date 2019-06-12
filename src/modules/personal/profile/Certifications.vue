<template>
  <!-- <v-container>
    <v-layout>
  <v-flex>-->
  <v-card flat>
    <v-card-title class="pl-4 pb-1">
      <h3>{{$t('Profile.currCerts')}}</h3>
      <v-spacer></v-spacer>
      <v-btn color="info--text" flat>
        <v-icon small left class="mr-1">add</v-icon>
        {{$t('Profile.addCert')}}
      </v-btn>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-text>
      <v-layout row wrap>
        <v-flex>
          <v-list>
            <v-list-tile v-for="cert in certificates" :key="cert.id" class="my-3">
              <v-list-tile-avatar>
                <icon-cert height="40" width="40" iconColor="#3C88B5"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <h3>{{cert.name}}</h3>
                </v-list-tile-title>
                <v-list-tile-sub-title>Some dates... Could be from pdp. What to do if part of Evaluation</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action></v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
  <!-- </v-flex>
    </v-layout>

  </v-container>-->
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    certificates: []
  }),

  async created() {
    const res = await axios.get(this.$backendUrl + `api/Certificates/profile`);
    this.certificates = [res.data[0], res.data[1]];
  },

  methods: {
    add(id) {},
    async save() {}
  }
};
</script>

<style>
</style>
