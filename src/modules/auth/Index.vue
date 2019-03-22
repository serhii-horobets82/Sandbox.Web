<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm6 md6 lg4>
        <material-card
          color="info"
          :title="$t('Auth.signIn')"
        >
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-text-field
                prepend-icon="person"
                name="login"
                :label="$t('Auth.email')"
                type="text"
                :rules="[requireRule, emailRule]"
                required
                v-model="credentials.userName"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                :label="$t('Auth.password')"
                v-model="credentials.password"
                required
                :rules="[requireRule]"
                type="password"
              ></v-text-field>
              <v-checkbox :label="$t('Auth.rememberMe')" v-model="credentials.rememberMe"></v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-menu offset-y>
                <template #activator="data">
                  <v-btn v-on="data.on" block>{{$t("Auth.demo")}}</v-btn>
                </template>
                <v-list>
                  <v-list-tile
                    v-for="(item, index) in $config.demo.users"
                    :key="index"
                    @click="setDemoCredential(item)">
                    <v-list-tile-title prepend-icon="person">{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-spacer></v-spacer>
              <v-btn color="primary" block :disabled="!valid" @click="handleSubmit">{{ $t("Auth.signIn") }}</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-subheader>Sign In using your account with</v-subheader>
            <v-card-actions class="white justify-center">
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                round
                icon
                @click="auth(social.name)"
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-alert :value="isError" type="error">
              {{ errorMessage }}
            </v-alert>
        </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Credentials} from "@/models/credentials.interface";

  @Component
  export default class LoginForm extends Vue {
    private valid: boolean = true;
    private isError: boolean = false;
    private rememberMe: boolean = false;

    private isBusy: boolean = false;
    private errorMessage: string = "";
    private credentials = {} as Credentials;

    private socials: any = [
      {
        name: 'facebook',
        icon: 'fab fa-facebook-f',
        color: '#3b5998'
      },
      {
        name: 'twitter',
        icon: 'fab fa-twitter',
        color: '#55acee'
      },
      {
        name: 'linkedin',
        icon: 'fab fa-linkedin',
        color: '#0077b5'
      },
      {
        name: 'instagram',
        icon: 'fab fa-instagram',
        color: '#e4405f'
      },
      {
        name: 'github',
        icon: 'fab fa-github',
        color: '#00405d'
      },
      {
        name: 'google',
        icon: 'fab fa-google',
        color: '#ea4335'
      }
    ];

    // rule for require field
    requireRule(value: string) {
      return !!value || this.$t("Auth.requireField")
    }

    auth(provider: string) {
      this.isBusy = true;
      let vm = this;
      this.$auth.authenticate(provider).then(function (token: any) {
        vm.$store
          .dispatch("auth/OAuthRequest", token)
          .then(() => {
            let {redirect} = vm.$route.query;
            vm.$router.push(redirect as string || "/dashboard/home");
          })
          .catch(err => {
            vm.errorMessage = err;
            vm.isError = true;
          })
          .then(() => {
            vm.isBusy = false;
          });
      }).catch(function (err: any) {
        vm.errorMessage = err;
        vm.isError = true;
      })
    }

    // rule for email validation
    emailRule(value: string) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || this.$t("Auth.invalidEmail");
    }

    setDemoCredential(credentials: Credentials) {
      this.credentials = credentials;
    }

    // get valid form object
    get form() {
      return this.$refs.form as Vue & { validate: () => boolean };
    }

    private handleSubmit() {
      if (this.form.validate()) {
        this.isBusy = true;
        this.$store
          .dispatch("auth/authRequest", this.credentials)
          .then(() => {
            let {redirect} = this.$route.query;
            this.$router.push(redirect as string || "/dashboard/home");
          })
          .catch(err => {
            this.errorMessage = err;
            this.isError = true;
          })
          .then(() => {
            this.isBusy = false;
          });
      }
    }
  }
</script>
