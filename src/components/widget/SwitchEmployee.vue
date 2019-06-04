<template>
  <v-menu bottom left offset-y content-class="dropdown-menu" transition="slide-y-transition" max-height="450">
    <template #activator="data">
      <v-btn v-on="data.on" flat @click="showEmployeeSelection()">
        {{ vueEmployee.nameTemp }} ({{ vueEmployee.employeeType.type }})
      </v-btn>
      <!-- <v-btn icon v-on="data.on" @click="showEmployeeSelection()" class="toolbar-items">
        <v-icon color="tertiary">fa arrows-alt-h</v-icon>
      </v-btn> -->
    </template>

    <v-list>
      <v-list-tile
        v-for="item in employees"
        :key="item.id"
        @click="selectEmployee(item)"
      >
        <v-list-tile-avatar size="30" style="min-width: 40px">
          <v-icon v-if="item.id == vueEmployee.id" color="primary">done</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <!-- <v-list-tile-title></v-list-tile-title> -->
          <v-list-tile-sub-title>{{ item.nameTemp }} ({{ item.employeeType.type }})</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    employees: null
  }),

  async created(){
  },

  methods: {
    async showEmployeeSelection() {
      const res = await axios.get(this.$backendUrl + `api/employees`);
      this.employees = res.data;
    },
    async selectEmployee(employee){
      this.$employee.set(employee);
      window.location.reload();
    },
  },

  computed: {
    vueEmployee() {
      return this.$employee.get();
    }
  }
}
</script>

<style>

</style>
