<template>
  <v-container>
  <v-layout>
    <v-flex>
      <h1 v-if="$route.params.id == 0">Create Position</h1>
      <h1 v-else>Edit project (ID: {{$route.params.id}})</h1>
    </v-flex>

  </v-layout>
  <!-- <v-layout> -->
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <v-text-field
      v-model="position.name"
      :counter="150"
      label="Name"
      required
    ></v-text-field>

    <v-btn @click="dialog = true">Add Role</v-btn>
<!--
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field> -->
    <!-- <v-select
      v-model="position"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->
<!--

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->

    <v-dialog
      v-model="dialog"
      max-width="800"
      scrollable
    >
      <v-card>
        <v-card-title class="headline">
          <v-layout row align-center class="dialog-header">
            <v-flex xs6>Roles</v-flex>
            <v-flex xs6>
              <v-text-field flat
                hide-details
                label="Filter"
                prepend-inner-icon="search"
                v-model="rolesFilter"
                ></v-text-field>
            </v-flex>
          </v-layout>

        </v-card-title>
        <v-card-text>
      <v-card v-for="role in rolesFiltered" :key="role.id">
        <v-card-title class="headline">{{role.name}}</v-card-title>

        <v-card-text>
          {{ role.summary }}
        </v-card-text>

        <v-card-text>
          {{ role.description }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false; rolesFilter=''">Done</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="create"
    >
      Create
    </v-btn>

    <v-btn :to="{name: 'positions'}">
      Cancel
    </v-btn>

  </v-form>
  <!-- </v-layout> -->
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      valid: {},
      dialog: false,
      position: {},
      roles: [],
      rolesFilter: ''
    }
  },

  async created(){
    const rolesResponse = await axios.get('https://localhost:5001/api/ecfroles');
    this.roles = rolesResponse.data;
  },

  computed: {
    rolesFiltered(){
      return this.roles.filter(r => r.name.toLowerCase().includes(this.rolesFilter))
    }
  },

  methods: {
    create(){

    }
  }

}
</script>

<style>
  .dialog-header .v-text-field {
    /* margin-top: 0; */
    padding-top: 0;
  }
</style>
