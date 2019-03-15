<template>
  <v-container>
  <v-layout>
    <v-flex>
      <h1 v-if="$route.params.id == 0">Create project</h1>
      <h1 v-else>Edit project (ID: {{$route.params.id}})</h1>
    </v-flex>
  </v-layout>

  <v-layout>
    <v-flex xs8>
      <span class="headline">Info</span>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="project.name"
          :counter="150"
          label="Name"
          required
        ></v-text-field>

        <v-textarea
          v-model="project.description"
          label="Description"></v-textarea>

        <v-btn
          :disabled="!valid"
          color="success"
          @click="save"
        >
          Save
        </v-btn>

        <v-btn :to="{name: 'projects'}">
          Cancel
        </v-btn>

      </v-form>
    </v-flex>

    <v-flex xs4>
      <v-layout row class="align-center">
        <span class="headline">Customers</span>
        <v-spacer></v-spacer>
        <v-btn @click="openCustomerDialog()" icon color="success">
          <v-icon >add</v-icon>
        </v-btn>
      </v-layout>

      <v-layout>
        <v-flex xs12>
        <v-list subheader>
          <!-- <v-subheader>Recent chat</v-subheader> -->
          <v-list-tile
            v-for="(item, i) in project.customerContact"
            :key="item.id"
            avatar
          >
            <v-list-tile-avatar color="teal">
              <span class="white--text headline">{{ item.name[0] }}</span>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.email }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon @click="openCustomerDialog(item)">edit</v-icon>
              <v-icon @click="removeCustomer(i)">remove</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        </v-flex>
      </v-layout>

      <v-dialog
        v-model="customerDialog.open"
        max-width="600px"
        @keypress.esc="customerDialog.open = false"
        >
        <v-card>
          <v-card-title>
            <span class="headline">{{ customerDialog.customer.id ? 'Edit customer info' : 'Add customer info' }}</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="customerDialog.customer.name" label="Name"></v-text-field>
            <v-text-field v-model="customerDialog.customer.email" label="Email"></v-text-field>
            <v-text-field v-model="customerDialog.customer.phone" label="Phone"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addUpdateCustomerInfo()" color="success">
              {{ customerDialog.customer.id ? 'Update' : 'Add' }}
            </v-btn>
            <v-btn @click="customerDialog.open = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: false,
    customerDialog: {
      open: false,
      customer: {}
    },
    project: {},
  }),

  async created(){
    const id = +this.$route.params.id;
    if (id != 0) {
      const res = await axios.get(this.$backendUrl + `api/projects/${id}`);
      this.project = Object.assign({}, this.project, res.data)
    } else {
      this.project = Object.assign({}, this.project, {id: 0, customerContact: []})
    }
  },

  methods: {
    openCustomerDialog(customer){
      if (customer) {
        const data = {
          ...customer,
          ref: customer
        }
        this.customerDialog.customer = Object.assign({}, this.customerDialog.customer, data)
      }
      else {
        const data = {
          id: 0,
          name: null,
          email: null,
          ref: null
        }
        this.customerDialog.customer = Object.assign({}, this.customerDialog.customer, data)
      }
      this.customerDialog.open = true;
    },
    removeCustomer(index) {
      if (confirm('You are going to delete customer contact. Ok?')) {
        this.project.customerContact.splice(i, 1);
      }
    },
    addUpdateCustomerInfo(){
      const edited = this.customerDialog.customer;
      if (edited.id) {
        const original = edited.ref;
        original.name = edited.name;
        original.email = edited.email;
        original.phone = edited.phone;
      } else {
        this.project.customerContact.push(edited);
      }
      this.customerDialog.open = false;
    },
    async save(){
      if (+this.project.id == 0) {
        const res = await axios.post(this.$backendUrl + `api/projects`, this.project);
      } else {
        const res = await axios.put(this.$backendUrl + `api/projects/${this.project.id}`, this.project);
      }

      this.$router.push({name: 'projects'});
    },
  }
}
</script>

<style>

</style>
