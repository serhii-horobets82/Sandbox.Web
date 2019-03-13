<template>
  <div>
    <div class="text-md-center">
      <v-card>
        <v-card-title>
          User list
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.email }}</td>
            <td class="text-xs-right">{{ props.item.firstName }}</td>
            <td class="text-xs-right">{{ props.item.lastName }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editUser(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteUser(props.item)"
              >
                delete
              </v-icon>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      pagination: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Email", value: "email" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      items: []
    };
  },

  computed: {},

  methods: {
    getUsers() {
      return new Promise((resolve, reject) => {
        axios
          .get(this.$backendUrl + "api/users")
          .then(res => {
            this.items = res.data;
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    editUser (item) {
    },

    deleteUser (item) {
    },
  },

  created() {
    this.getUsers();
  }
};
</script>
