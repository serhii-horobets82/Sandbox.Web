<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap>
      <v-flex xs12>
        <v-img
          :src="require('../../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Evoflare
        </h1>
      </v-flex>
      <v-flex xs12>

        <v-card
          class="mx-auto text-xs-center"
          color="blue-grey darken-2"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="value"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item">
                  ${{ item.value }}
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="display-1 font-weight-thin">Progress</div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn block flat>Go to Report</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Home extends Vue {
    value = [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
      440,
      540,
      640,
      1000,
    ];
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
