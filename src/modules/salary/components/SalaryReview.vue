<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <img v-show="false" class="ma-0 pa-0" src="/img/misc/salary-review.png" />
      </v-flex>
      <v-flex xs12>
        <h2>{{$t('Salary.title')}}</h2>
      </v-flex>
      <v-flex xs6>
        <v-card flat class="accent">
          <v-card-actions>
            <span class="form-label pr-2">{{$t('Salary.sortBy')}}</span>
            <v-select
              height="26"
              append-icon
              class="form-select primary lighten-1"
              flat
              hide-details
              prepend-inner-icon="fa-sort"
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
      <v-flex xs7>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="employees"
          :pagination.sync="pagination"
          select-all
          item-key="id"
          class="elevation-1"
        >
          <template v-slot:headers="props">
            <tr>
              <th>
                <v-checkbox
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  hide-details
                  @click.stop="toggleAll"
                ></v-checkbox>
              </th>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['form-label column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
              </td>
              <td class="text-xs-center">{{ props.item.hiringDate | formatDateShort }}</td>
              <td class="text-xs-left font-weight-bold">{{ props.item.name }}</td>
              <td class="text-xs-leftt font-weight-bold">{{ props.item.surname }}</td>
              <td class="text-xs-left">{{ props.item.level }}</td>
              <td class="text-xs-center">{{ props.item.peDate | formatDateShort }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
let row = {
  name: "Oleksandr",
  surname: "Storokha",
  level: "Tech Lead",
  peDate: "01.03.2010"
};
let rows = Array(100).fill(row);

import axios from "axios";

export default {
  async created() {
    const res = await axios.get(this.$backendUrl + `api/employees`);
    this.employees = res.data.map(e => ({
      ...row,
      hiringDate: e.hiringDate,
      name: e.name,
      surname: e.surname,
      level: e.employeeType.type,
      id: e.id
    }));
  },
  data: () => ({
    sortByColumns: [
      { value: 0, text: "Active Employee" },
      { value: 1, text: "Hiring date" }
    ],
    sortByColumn: 0,
    pagination: {
      sortBy: "name"
    },
    selected: [],
    headers: [
      {
        text: "Hiring date",
        value: "hiringDate",
        sortable: false,
        align: "right"
      },
      { text: "Name", value: "name" },
      { text: "Surname", value: "surname" },
      { text: "Level", value: "level" },
      { text: "Pe date", value: "peDate" }
    ],
    employees: []
  }),
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.employees.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<style>
</style>
