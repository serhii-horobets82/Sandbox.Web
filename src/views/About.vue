<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout>
      <v-flex xs12>
        <material-card color="green" :title="$t('About.title')">
          <v-container>
            <v-layout wrap>

              <v-flex xs12 lg4>
                <material-stats-card
                  color="info"
                  icon="info"
                  :title="$t('About.apiVersion')"
                  :value="versionData.version"
                />
              </v-flex>
              <v-flex xs12 lg4>
                <material-stats-card
                  color="orange"
                  icon="cloud"
                  :title="$t('About.databaseInfo')"
                  :small-value="versionData.database | splitStr(',',1)"
                />
              </v-flex>
              <v-flex xs12 sm lg4>
                <material-stats-card
                  color="red"
                  icon="update"
                  :title="$t('About.apiUpdateDate')"
                  :small-value="versionData.creationDate | formatDate"
                />
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn class="mx-0 font-weight-light" color="success" v-on:click="handleSubmit"
                >{{ $t("About.update") }}
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <div class="text-xs-center" v-if="isLoading">
                  <v-progress-linear color="green" ></v-progress-linear>
                </div>
                <material-notification class="mb-3" color="error" dismissible :value="isError">
                  {{ errorMessage }}
                </material-notification>
              </v-flex>
            </v-layout>
          </v-container>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {versionService} from "@/services/version.service";
  import {VersionInfo} from "@/models/version.interface";

  @Component({})
  export default class About extends Vue {
    private isLoading: boolean = false;
    private isError: boolean = false;
    private errorMessage: string = "";
    private versionData = {} as VersionInfo;

    private updateVersion() {
      this.isLoading = true;
      this.isError = false;
      versionService.getVersion().subscribe(
        data => {
          this.versionData = data;
          this.isLoading = false;
        },
        error => {
          this.versionData = {} as VersionInfo;
          this.errorMessage = error;
          this.isLoading = false;
          this.isError = true;
        }
      );
    }

    private handleSubmit() {
      this.updateVersion();
    }

    private created() {
      this.updateVersion();
    }
  }
</script>
