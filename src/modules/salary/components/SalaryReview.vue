<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{$t('Salary.title')}}</h2>
      </v-flex>
      <v-flex xs6>
        <v-card flat>
          <v-card-actions>
            <span class="subheading text-uppercase">{{$t('Salary.sortBy')}}</span>
            <v-select
              append-icon
              flat
              hide-details
              prepend-inner-icon="unfold_more"
              outline
              single-line
            ></v-select>
            <v-btn icon>
              <v-icon color="secondary">arrow_back</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="secondary">arrow_forward</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat>{{$t('OKR.chartReset')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
