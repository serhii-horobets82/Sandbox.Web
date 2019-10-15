<template>
  <v-app id="login" class="primary">
    <v-navigation-drawer fixed permanent left app width="600">
      <v-layout fluid fill-height align-center justify-center>
        <v-card flat>
          <v-card-title>
            <h2>{{$t('Auth.signIn')}}</h2>
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text class="pa-2">
              <v-text-field
                class="mb-4"
                outline
                prepend-inner-icon="person"
                name="login"
                :label="$t('Auth.email')"
                type="text"
                :rules="[requireRule, emailRule]"
                hide-details
                required
                v-model="credentials.userName"
              ></v-text-field>
              <v-text-field
                id="password"
                class="mb-4"
                outline
                prepend-inner-icon="lock"
                name="password"
                :label="$t('Auth.password')"
                v-model="credentials.password"
                hide-details
                required
                :rules="[requireRule]"
                type="password"
              ></v-text-field>
              <!-- <v-checkbox :label="$t('Auth.rememberMe')" v-model="credentials.rememberMe"></v-checkbox> -->
            </v-card-text>
            <v-card-actions>
              <v-menu offset-y max-height="450">
                <template #activator="data">
                  <v-btn
                    :disabled="demoUsersCredentilas.length === 0"
                    v-on="data.on"
                    block
                  >{{$t('Auth.demo')}}</v-btn>
                </template>
                <v-list dense>
                  <v-list-tile
                    v-for="(item, index) in demoUsersCredentilas"
                    :key="index"
                    @click="setDemoCredential(item)"
                  >
                    <v-list-tile-title>
                      <v-avatar :color="getRoleMarker(item.roles).color" size="20px" class="mr-2">
                        <span class="white--text">{{getRoleMarker(item.roles).label}}</span>
                      </v-avatar>
                      {{ item.name }} {{ item.surname }} ({{ getRoleMarker(item.roles).role }})
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-spacer></v-spacer>
              <v-btn color="primary" block :disabled="!valid" @click="handleSubmit">
                {{ $t('Auth.signInBtn')
                }}
              </v-btn>
            </v-card-actions>
            <!-- <v-divider></v-divider>
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
            </v-card-actions>-->
            <v-alert :value="isError" type="error">{{ errorMessage }}</v-alert>
          </v-form>
        </v-card>
      </v-layout>
    </v-navigation-drawer>

    <v-content>
      <div class="version">
        <div v-if="versionInfo.version" class="tertiary--text">v {{versionInfo.version}}</div>
        <div v-if="versionInfo.database" class="tertiary--text">DB: {{versionInfo.database}}</div>
        <div
          v-if="versionInfo.organization"
          class="tertiary--text"
        >{{versionInfo.organization}} ({{versionInfo.databaseType}})</div>

        <v-menu offset-y max-height="450">
          <template #activator="data">
            <v-btn :disabled="demoDatabases.length === 0 || domainMatched" v-on="data.on">Switch database</v-btn>
          </template>
          <v-list dense>
            <v-list-tile
              v-for="(item, index) in demoDatabases"
              :key="index"
              @click="switchDatabase(item)"
            >
              <v-list-tile-action>
                <v-icon
                  v-if="currentInstance && item.id === currentInstance.id"
                  color="primary"
                >done</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{ item.name }} ({{ item.type }})</v-list-tile-title>
              <v-list-tile-action>
                <v-btn class="ml-4" icon title="Recreate database" @click="initDatabase(item)">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-menu>
        <div
          v-if="currentInstance && currentInstance.id"
          class="black--text"
        >Current instance: {{currentInstance.name}} ({{currentInstance.type}})</div>
      </div>
      <v-dialog v-model="progressDialog" width="300">
        <v-card dark color="primary">
          <v-card-text>
            <div style="color:white">In progress ...</div>
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { getRoleMarker } from "@/util";
import { Component, Vue } from "vue-property-decorator";
import { Credentials } from "@/models/credentials.interface";
import { versionService } from "@/services/version.service";
import { randomInt } from "@/util";
import {
  VersionInfo,
  DatabaseInstance,
  DatabaseSetupParams
} from "@/models/version.interface";

@Component({
  methods: {
    getRoleMarker
  }
})
export default class LoginForm extends Vue {
  private valid: boolean = true;
  private domainMatched: boolean = false;
  private progressDialog: boolean = false;
  private isError: boolean = false;
  private rememberMe: boolean = false;
  private currentInstance: DatabaseInstance = {} as DatabaseInstance;

  private versionInfo = {} as VersionInfo;

  private isBusy: boolean = false;
  private errorMessage: string = "";
  private credentials = {} as Credentials;
  private demoUsersCredentilas = [] as Credentials[];
  private demoDatabases = [] as DatabaseInstance[];

  private socials: any = [
    {
      name: "facebook",
      icon: "fab fa-facebook-f",
      color: "#3b5998"
    },
    {
      name: "twitter",
      icon: "fab fa-twitter",
      color: "#55acee"
    },
    {
      name: "linkedin",
      icon: "fab fa-linkedin",
      color: "#0077b5"
    },
    {
      name: "instagram",
      icon: "fab fa-instagram",
      color: "#e4405f"
    },
    {
      name: "github",
      icon: "fab fa-github",
      color: "#00405d"
    },
    {
      name: "google",
      icon: "fab fa-google",
      color: "#ea4335"
    }
  ];
  created() {
    this.fetchData();

    versionService.getDatabases().subscribe(
      data => {
        this.demoDatabases = data;
        // first find by hostname
        this.currentInstance = data.find(
          s => s.domainPrefix === location.hostname
        ) as DatabaseInstance;
        // use only this instance
        if (this.currentInstance) {
          this.domainMatched = true;
          localStorage.setItem("x-server-id", this.currentInstance.id);
        } else {
          let instanceId = localStorage.getItem("x-server-id");
          this.currentInstance = data.find(
            s => s.id === instanceId
          ) as DatabaseInstance;
        }
      },

      error => {}
    );
  }
  fetchData() {
    this.demoUsersCredentilas = [] as Credentials[];
    versionService.getVersion().subscribe(
      data => {
        this.versionInfo = data;
      },
      error => {
        this.versionInfo = {} as VersionInfo;
      },
      () => {
        this.getDemoUsers();
      }
    );
  }
  getDemoUsers() {
    versionService.getDemoUsers().subscribe(
      data => {
        this.demoUsersCredentilas = data;
      },
      error => {}
    );
  }
  // rule for require field
  requireRule(value: string) {
    return !!value || this.$t("Auth.requireField");
  }

  auth(provider: string) {
    this.isBusy = true;
    let vm = this;
    this.$auth
      .authenticate(provider)
      .then(function(token: any) {
        vm.$store
          .dispatch("auth/OAuthRequest", token)
          .then(() => {
            let { redirect } = vm.$route.query;
            vm.$router.push((redirect as string) || "/dashboard/home");
          })
          .catch(err => {
            vm.errorMessage = err;
            vm.isError = true;
          })
          .then(() => {
            vm.isBusy = false;
          });
      })
      .catch(function(err: any) {
        vm.errorMessage = err;
        vm.isError = true;
      });
  }

  // rule for email validation
  emailRule(value: string) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || this.$t("Auth.invalidEmail");
  }

  setDemoCredential(credentials: Credentials) {
    this.credentials = credentials;
  }

  switchDatabase(database: DatabaseInstance) {
    this.currentInstance = database;
    localStorage.setItem("x-server-id", database.id);
    this.fetchData();
  }

  initDatabase(database: DatabaseInstance) {
    const data: DatabaseSetupParams = {
      id: "DefaultConfig",
      forceRecreate: true,
      adminEmail: "admin@example.com",
      organizationDomain: database.domainPrefix || "example.com",
      organizationName: database.name,
      randomData: {
        users: randomInt(0, 30),
        managers: randomInt(0, 5),
        hrs: randomInt(0, 3)
      }
    };
    this.progressDialog = true;
    versionService.initDatabase(data).subscribe(
      data => {
        this.versionInfo = data;
      },
      error => {
        this.versionInfo = {} as VersionInfo;
        this.progressDialog = false;
      },
      () => {
        this.getDemoUsers();
        this.progressDialog = false;
      }
    );
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
          // read profile before redirect
          return this.$store.dispatch("user/userRequest");
        })
        .then(() => {
          let { redirect } = this.$route.query;
          this.$router.push((redirect as string) || "/");
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

<style lang="stylus" scoped>
h2 {
  font-size: 36px;
}

.version {
  text-align: right;
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>

