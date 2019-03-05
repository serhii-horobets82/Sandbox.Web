<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-hover>
          <v-card
            class="mx-auto"
            dark
            color="blue-grey darken-2"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
          >
            <v-card-title primary-title>
              <v-icon large left> info</v-icon>
              <span class="headline font-weight-bold">{{ $t("About.title") }}</span>
            </v-card-title>
            <v-card-text>
              <div class="text-xs-center" v-if="isLoading">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <p v-if="versionData.version">
                {{ $t("About.apiVersion") }}:
                <span class="amber--text">{{ versionData.version }}</span>
              </p>
              <p v-if="versionData.creationDate">
                {{ $t("About.apiUpdateDate") }}:
                <span class="amber--text">{{ versionData.creationDate | formatDate }}</span>
              </p>
              <p v-if="versionData.database">
                {{ $t("About.databaseInfo") }}:
                <span class="amber--text">{{ versionData.database }}</span>
              </p>
              <v-alert :value="isError" type="error">
                {{ errorMessage }}
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-btn flat dark v-on:click="handleSubmit">{{ $t("About.update") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
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
    private errorMessage: string = '';
    private versionData = {} as VersionInfo;

    private updateVersion() {
      this.isLoading = true;
      this.isError = false;
      this.versionData = {} as VersionInfo;
      versionService.getVersion().subscribe(
        data => {
          this.versionData = data;
          this.isLoading = false;
        },
        error => {
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
