<template>
  <v-menu bottom left offset-y content-class="dropdown-menu" transition="slide-y-transition">
    <template #activator="data">
      <v-btn v-on="data.on" @click="showEmployeeSelection()">
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
        <v-list-tile-action>
          <v-icon v-if="item.id == vueEmployee.id">done</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.nameTemp }} ({{ item.employeeType.type }})</v-list-tile-title>
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
