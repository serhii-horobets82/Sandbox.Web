<template>
  <v-container>
  <v-layout>
    <v-flex>
      <h1 v-if="$route.params.id == 0">Create project</h1>
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
      v-model="name"
      :counter="150"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
<!--
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field> -->
<!--
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->

    <v-btn
      :disabled="!valid"
      color="success"
      @click="create"
    >
      Create
    </v-btn>

    <v-btn :to="{name: 'projects'}">
      Cancel
    </v-btn>

  </v-form>
  <!-- </v-layout> -->
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
