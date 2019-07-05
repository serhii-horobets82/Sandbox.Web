<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{$t('Salary.title')}}</h2>
      </v-flex>
      <v-flex xs6>
        <v-card flat>
          <v-card-actions>
            <span class="body-2 font-weight-bold text-uppercase pr-2">{{$t('Salary.sortBy')}}</span>
            <v-select
              append-icon
              flat
              hide-details
              prepend-inner-icon="unfold_more"
              outline
              dense
              single-line
              v-model="sortByColumn"
              :items="sortByColumns"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn round color="primary">
              <v-icon small left>add</v-icon>
              {{$t('Salary.addEmployee')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-data-iterator
          :items="items"
          item-key="name"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          content-tag="v-layout"
          row
          wrap
        >
          <template v-slot:item="props">
            <v-flex xs6 sm6 md6 lg6>
              <v-card>
                <v-card-title>
                  <h4>{{ props.item.name }}</h4>
                </v-card-title>
               
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Calories:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Fat:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Carbs:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Protein:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Sodium:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Calcium:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Iron:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </template>
        </v-data-iterator>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    sortByColumns: [
      { value: 0, text: "Active employee" },
      { value: 1, text: "Hiring date" }
    ],
    sortByColumn: 0,
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    items: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      }
    ]
  })
};
</script>

<style>
</style>
