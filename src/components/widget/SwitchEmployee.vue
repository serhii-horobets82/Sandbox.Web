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
          <v-avatar :color="getRoleMarker(item.roles).color" size="20px" class="mr-2">
            <span class="white--text">{{getRoleMarker(item.roles).label}}</span>
          </v-avatar>
          {{ item.name }} {{ item.surname }} ({{ getRoleMarker(item.roles).role }})
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import axios from "axios";
import { getRoleMarker } from "@/util";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    employees: null
  }),
  methods: {
    getRoleMarker,
    async showEmployeeSelection() {
      const res = await axios.get(this.$backendUrl + `api/demo/users`);
      this.employees = res.data;
    },
    async selectEmployee(employee) {
      this.$store
        .dispatch("auth/authRequest", {
          ...employee,
          userName: employee.email
        })
        .then(() => {
          // read profile before redirect
          return this.$store.dispatch("user/userRequest");
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.errorMessage = err;
          this.isError = true;
        });
    }
  },
  computed: {
    ...mapGetters("user", ["profile"])
  }
};
</script>

<style>
</style>
