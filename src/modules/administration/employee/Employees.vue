<template>
  <v-container>
    <v-layout row align-center class="mb-2">
      <h3>Employees</h3>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" :to="{name:'administration-employeeEdit', params:{id: 0}}">Create</v-btn>
    </v-layout>

    <v-data-table
      :headers="headers"
      :items="employees"
      :search="search"
      class="elevation-1"
      :pagination.sync="pagination"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.isManager }}</td>
        <td class="text-xs-right">

          <v-btn icon :to="{name: 'administration-employeeEdit', params: {id: props.item.id}}">
            <v-icon small>edit</v-icon>
          </v-btn>
          <!-- <v-btn>Delete</v-btn> -->
        </td>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      search: null,
      pagination: {rowsPerPage: -1},
      headers: [{
        text: 'ID',
        sortable: true,
        align: 'left',
        value: 'id'
      },{
        text: 'Name',
        sortable: true,
        align: 'left',
        value: 'name'
      },{
        text: 'Type',
        sortable: true,
        align: 'right',
        value: 'type'
      },{
        text: 'Is manager?',
        sortable: false,
        align: 'right'
      },{
        text: 'Actions',
        sortable: false,
        align: 'right'
      },
      ],
      employees: []
    }
  },

  async created(){
    const res = await axios.get(this.$backendUrl + 'api/employees')

    this.employees = res.data.map(e => ({
      id: e.id,
      name: e.nameTemp,
      isManager: e.isManager,
      type: e.employeeType.type
    }));
  }
}
</script>

<style>

</style>
