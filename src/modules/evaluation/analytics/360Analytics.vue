<template>
  <v-container flex>
    <v-layout>
      <v-flex>
        <h2 class="headline mb-3">360 Analytics</h2>
        Data description = [ Kind, Righteous, Hardworker, SemiHardworker ]
        <br>
        Ctrl + F -> true
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="table"
          :loading="loading"
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
          <template v-slot:items="props" v-slot:headers="head">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.name }} {{ props.item.surname }}</td>
            <td>{{ props.item[0] }}</td>
            <td>{{ props.item[1] }}</td>
            <td>{{ props.item[2] }}</td>
            <td>{{ props.item[3] }}</td>
            <!-- <td class="text-xs-right">{{ analytics[head[5]] }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td> -->
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    headers: [],
    pagination: {rowsPerPage: -1},
    analytics: null,
    employees: [],
    table: [],
    loading: true,
  }),

  async created(){
    this.loading = true;
    const resAnalytics = await this.$http.get(`api/_360evaluation/analytics`);
    const res = await this.$http.get(`api/employees`);
    this.loading = false;
    this.employees = res.data;
    this.headers = [
      {text: 'Id'},
      {text: 'Name'},
      ...Object.keys(resAnalytics.data).map(d => ({text: d.split('T')[0], value: d})).reverse()
    ]
    console.log(this.headers)
    this.analytics = resAnalytics.data;
    const t = this.employees.map(e => {
      const row = {id: e.id, name: e.name, surname: e.surname};
      Object.keys(resAnalytics.data).reverse().forEach((r, i) => {
        console.log(r,resAnalytics.data[r], e.id, resAnalytics.data[r][e.id])
        row[i] = resAnalytics.data[r][e.id];
      })
      return row;
    });
    this.table = t;
    console.log(this.table)
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
