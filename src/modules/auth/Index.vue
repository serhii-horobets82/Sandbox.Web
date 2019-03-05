<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    :rules="[v => !!v || 'Login is required']"
                    required
                    v-model="credentials.userName"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    v-model="credentials.password"
                    required
                    :rules="[v => !!v || 'Password is required']"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on">Demo</v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in demoUsers"
                      :key="index"
                      @click="setDemoCredential(item)">
                      <v-list-tile-title prepend-icon="person">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="handleSubmit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Credentials} from "@/models/credentials.interface";

  @Component
  export default class LoginForm extends Vue {
    private valid: boolean = true;

    private isBusy: boolean = false;
    private errors: string = "";
    private credentials = {} as Credentials;

    private demoUsers: any[] = [
      {title: "Admin", userName: "admin@evoflare.com", password: "qwerty"},
      {title: "Manager", userName: "manager@evoflare.com", password: "qwerty"},
      {title: "User", userName: "user@evoflare.com", password: "qwerty"}
    ]

    private created() {
    }

    private setDemoCredential(credentials) {
      this.credentials = credentials;
    }

    get form() {
      return this.$refs.form as Vue;
    }

    private handleSubmit() {
      if (this.form.validate()) {
        this.isBusy = true;
        this.$store
          .dispatch("auth/authRequest", this.credentials)
          .then(result => {
            this.$router.push("/dashboard/home");
          })
          .catch(err => {
            this.errors = err;
          })
          .then(() => {
            this.isBusy = false;
          });
      }
    }
  }
</script>
