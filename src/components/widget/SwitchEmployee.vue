<template>
  <v-menu
    bottom
    left
    offset-y
    content-class="dropdown-menu"
    transition="slide-y-transition"
    max-height="450"
  >
    <template #activator="data">
      <v-btn
        v-on="data.on"
        flat
        class="toolbar-items"
        color="secondary"
        @click="showEmployeeSelection()"
      >
        <v-icon color="secondary" left>label</v-icon>
        {{profile.fullName}}
      </v-btn>
    </template>

    <v-list dense>
      <v-list-tile v-for="item in employees" :key="item.id" @click="selectEmployee(item)">
        <v-list-tile-avatar>
          <v-icon v-if="item.id == profile.employeeId" color="primary">done</v-icon>
        </v-list-tile-avatar>
          <v-list-tile-title>
            <v-avatar :color="getMapTypeToRole(item.type).color" size="20px" class="mr-2">
              <span class="white--text">{{getMapTypeToRole(item.type).label}}</span>
            </v-avatar>
            {{ item.name }} {{ item.surname }} ({{item.typeName}})
          </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import axios from "axios";
import { getMapTypeToRole } from "@/util";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    employees: null
  }),
  methods: {
    getMapTypeToRole,
    async showEmployeeSelection() {
      const res = await axios.get(this.$backendUrl + `api/demo/users`);
      this.employees = res.data;
    },
    async selectEmployee(employee) {
      this.$store.dispatch("auth/authRequest", {
        ...employee,
        userName: employee.email
      }).then(() => {
          this.$router.push("/");
        })
    }
  },
  computed: {
    ...mapGetters("user", ["profile"])
  }
};
</script>

<style>
</style>
