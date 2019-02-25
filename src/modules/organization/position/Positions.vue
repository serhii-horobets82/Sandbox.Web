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
          <v-flex xs12 md6 lg4 v-for="i of 10" :key="i">
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Unlimited music now</div>
                  <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
