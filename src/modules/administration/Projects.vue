<template>
  <v-container fluid>
    <v-layout row style="padding-bottom: 32px;">
      <v-flex xs12>
        <span class="title font-weight-bold">Manage Projects</span>
        <v-spacer></v-spacer>
        <v-btn color="primary">Create Project</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-data-table
        :headers="headers"
        :items="projects"
        :loading="loading"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.createdDate }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    pagination: {rowsPerPage: -1},
    headers: [
      {text: 'Id', value:'id', sortable: true},
      {text: 'Project', value: 'name', sortable: true},
      {text: 'Created Date', value: 'createdDate', sortable: true},
      {text: 'Assigned Manager', sortable: false},
      {text: '', sortable: false},
    ],
    projects: []
  }),

  async created(){
    this.loading = true;
    const response = await this.$http.get(`api/projects`);
    this.projects = response.data;
    this.loading = false;
  },

  methods: {

  }
}

</script>

<style lang="scss">
.v-datatable th > .v-icon.fas {
  margin-left: 10px !important;
  margin-bottom: -5px;
}
</style>

