<template>
  <v-container fluid>
    <v-layout row class="pb-3">
      <v-flex xs12>
        <v-layout row wrap>
          <div class="title font-weight-bold" style="line-height: 48px !important;">Manage Projects</div>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openCreateProjectDialog()">Create Project</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

      Current implementation does not allow to re-assign the manager for the project.
    <v-layout row wrap class="mt-2">
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
          <td class="text-xs-right">{{ props.item.createdDate.split('T')[0] }}</td>
          <td class="text-xs-right">{{ props.item.managerFullName }}</td>
          <td>
            <v-menu bottom left :disabled="!!props.item.managerId">
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                >
                  <v-icon :disabled="!!props.item.managerId">more_horiz</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-tile
                  style="cursor: pointer;">
                  <v-list-tile-title @click="openAssignManagerDialog(props.item)"
                    style="font-size: 14px !important"
                  >Assign Manager</v-list-tile-title>
                </v-list-tile>
                <!-- <v-list-tile
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile> -->
              </v-list>
            </v-menu>
          </td>
        </template>
      </v-data-table>
    </v-layout>

    <v-dialog
      v-model="projectDialog.open"
      max-width="300"
    >
      <v-card>
        <v-card-title>
          <v-layout row align-center class="mt-2">
            <v-flex xs12 class="title font-weight-bold">Create project</v-flex>
          </v-layout>

        </v-card-title>

        <v-card-text class="pt-0">
          <v-text-field
            v-model="projectDialog.name"
            :counter="150"
            label="Name"
            required
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="createProject()"
            :disabled="!projectDialog.name"
            color="primary"
          >Create</v-btn>
          <v-btn @click="assignManagerDialog.open = false">Close</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

    <v-dialog
      v-model="assignManagerDialog.open"
      max-width="500"
      scrollable
    >

      <v-card>
        <v-card-title class="headline">
          <v-layout row align-center class="dialog-header">
            <v-flex xs6>Managers</v-flex>
            <v-flex xs6>
              <!-- <v-text-field flat
                hide-details
                label="Filter"
                prepend-inner-icon="search"
                v-model="filter"
                ></v-text-field> -->
            </v-flex>
          </v-layout>

        </v-card-title>

        <v-card-text class="py-0">
          <v-list>
            <v-list-tile
              v-for="item in assignManagerDialog.managers"
              :key="item.id"
              @click="assignManagerDialog.managerId = item.id"
              :style="assignManagerDialog.managerId == item.id ? `background-color: rgba(61, 179, 237, 0.15)` : ''"
              avatar
            >
              <v-list-tile-avatar color="teal">
                <span class="white--text headline">{{ item.name[0] }}</span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }} {{ item.surname }}</v-list-tile-title>
              </v-list-tile-content>
              <!-- <v-list-tile-action>
                <v-icon color="success" @click="addEmployee(item)">add</v-icon>
              </v-list-tile-action> -->
            </v-list-tile>
          </v-list>

          </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="assignManager()"
            :disabled="!assignManagerDialog.managerId"
            color="primary"
          >Assign</v-btn>
          <v-btn @click="assignManagerDialog.open = false">Close</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import toast from '@/services/toast'

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
    projects: [],
    projectDialog: {
      open: false,
      name: null
    },
    assignManagerDialog: {
      open: false,
      project: null,
      managerId: null,
      managers: null
    }
  }),

  async created(){
    this.loading = true;
    this.projects = await this.$http.get(`api/projects/basic`).then(r => r.data);
    this.loading = false;
  },

  methods: {
    async openCreateProjectDialog() {
      this.projectDialog.open = true;
    },
    async createProject() {
      this.projectDialog.open = false;
      const proj = await this.$http.post(`api/projects`, {name: this.projectDialog.name}).then(r => r.data);
      toast.success(`Project ${proj.name} created.`)
      this.projects.push(proj);
      this.projectDialog.name = null;
    },

    async openAssignManagerDialog(data) {
      this.assignManagerDialog.project = data;
      this.assignManagerDialog.managers = await this.$http.get(`api/employees/managers`).then(r => r.data);
      this.assignManagerDialog.open = true;
    },
    async assignManager(){
      const projectId = this.assignManagerDialog.project.id;
      const managerId = this.assignManagerDialog.managerId;

      await this.$http.post(`api/projects/${projectId}/assign-manager`, {managerId});
      const manager = this.assignManagerDialog.managers.filter(m => m.id == managerId)[0];

      const proj = this.assignManagerDialog.project;
      proj.managerFullName = manager.name + ' ' + manager.surname;
      proj.managerId = managerId;

      this.assignManagerDialog = Object.assign(this.assignManagerDialog,
        {open: false, managers: null, managerId: null, project: null})

      toast.success(`Manager ${proj.managerFullName} assigned to project ${proj.name}.`)
    }
  }
}

</script>

<style lang="scss">
.v-datatable th > .v-icon.fas {
  margin-left: 10px !important;
  margin-bottom: -5px;
}
</style>

