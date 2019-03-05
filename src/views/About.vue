<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-hover>
          <v-card class="mx-auto"
                  dark
                  color="blue-grey darken-2"
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title primary-title>
              <v-icon large left> info</v-icon>
              <span class="headline font-weight-bold">About</span>

            </v-card-title>
            <v-card-text>
              <div class="text-xs-center" v-if="isLoading">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <p v-if="versionData.version">API version: <span class="amber--text">{{versionData.version}}</span></p>
              <p v-if="versionData.creationDate">Last API update: <span class="amber--text">{{versionData.creationDate | formatDate}}</span>
              </p>
              <p v-if="versionData.database">Database: <span class="amber--text">{{versionData.database}}</span></p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat dark v-on:click="handleSubmit">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {versionService} from '@/services/version.service';

  @Component({})
  export default class About extends Vue {

    private isLoading: boolean = false;
    private versionData = {} as any;

    private updateVersion() {
      this.isLoading = true;
      versionService.getVersion().then((resp: any) => {
        this.versionData = resp.data;
        this.isLoading = false;
      });
    }

    private handleSubmit() {
      this.updateVersion();
    }

    private created() {
      this.updateVersion();
    }
  }
</script>
