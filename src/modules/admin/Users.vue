<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{$t('Users.title')}}</h2>
      </v-flex>
      <v-flex md12>
        <v-dialog v-model="confirmDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Delete user</v-card-title>
            <v-card-text>
              Are you sure you want to remove user
              <span
                class="font-weight-bold body-2"
              >{{deletedItem.lastName}} {{deletedItem.firstName}}</span> ?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="confirmDialog = false; deleteUser();">Ok</v-btn>
              <v-btn color="secondary" flat @click="confirmDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit user</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.firstName" label="First name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.lastName" label="Last name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="genderList" label="Gender" v-model="editedItem.gender"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            v-bind:search="search"
            :pagination.sync="pagination"
          >
            <template slot="headerCell" slot-scope="{ header }">
              <span class="column" v-text="header.text" />
            </template>
            <template slot="items" slot-scope="props">
              <td> <v-icon v-if="!props.item.isActive">block</v-icon></td>
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.emloyeeId }}</td>
              <td>{{ props.item.emloyeeType }}</td>
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.firstName }}</td>
              <td>{{ props.item.lastName }}</td>
              <td>{{ props.item.hiringDate | formatDateShort }}</td>
              <td>{{ props.item.gender | formatGender }}</td>
              <td>{{ props.item.age }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editUser(props.item)">edit</v-icon>
                <v-icon small @click="confirmDeleteUser(props.item)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      confirmDialog: false,
      editedItem: {},
      deletedItem: {},
      search: "",
      pagination: {
        sortBy: "employeeId",
        rowsPerPage: 25
      },
      headers: [
        { text: "Status", value: "isActive", width: "5px" },
        { text: "Id", value: "id" },
        { text: "Employee id", value: "employeeId" },
        { text: "Employee type", value: "employeeType" },
        { text: "Email", value: "email" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Hiring Date", value: "hiringDate" },
        { text: "Gender", value: "gender" },
        { text: "Age", value: "age" },

        { text: "Actions", value: "name", sortable: false }
      ],
      items: [],
      genderList: [
        { text: "Unknown", value: 0 },
        { text: "Male", value: 1 },
        { text: "Female", value: 2 }
      ]
    };
  },
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
    editUser(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async save() {
      const res = await axios.put(
        this.$backendUrl + `api/users/${this.editedItem.id}`,
        this.editedItem
      );
      this.close();
      this.getUsers();
    },
    confirmDeleteUser(user) {
      this.deletedItem = Object.assign({}, user);
      this.confirmDialog = true;
    },
    async deleteUser() {
      const res = await axios.delete(
        this.$backendUrl + `api/users/${this.deletedItem.id}`
      );
      if (res.status === 200) this.getUsers();
    }
  },

  created() {
    this.getUsers();
  }
};
</script>
