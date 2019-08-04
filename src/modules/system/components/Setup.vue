<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{$t('System.Setup.title')}}</h2>
        <v-dialog v-model="confirmDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Reset database</v-card-title>
            <v-card-text>Are you sure you want to reset current DB instance ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="confirmDialog = false; reset();">Ok</v-btn>
              <v-btn color="secondary" flat @click="confirmDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" width="300">
          <v-card dark color="primary">
            <v-card-text >
              <span style="color:white"
              >You will logout from application after reset finished.</span>
             <div style="color:white">Please stand by ...</div>
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs2 class="pr-2">
        <v-select
          :items="configList"
          label="Predefined config"
          item-text="description"
          item-value="id"
          v-model="selectedConfig"
        ></v-select>
      </v-flex>
      <v-flex xs2 class="px-2">
        <v-text-field append-icon="public" v-model="organizationName" label="Organization name"></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn
          :disabled="dialog"
          :loading="dialog"
          class="primary"
          @click="confirmReset"
        >{{$t('System.Setup.reset')}}</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-4">
      <v-flex xs12>
        <h2>Re-create the 360 feedback data</h2>
      </v-flex>
      <v-flex xs12>
        <v-btn color="primary" @click="recreate360Data()">RECREATE</v-btn>
        {{recreate360Message}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import toast from "@/services/toast";
import { config } from "rxjs";
export default {
  data() {
    return {
      organizationName: "Noname company",
      defaultPassword : "qwerty",
      adminEmail : "goroserg@gmail.com",
      selectedConfig: "DefaultConfig",
      configList: [],
      dialog: false,
      confirmDialog: false,
      recreate360Message: null,
    };
  },
  created() {
    this.getSetupConfigurations();
  },
  methods: {
    confirmReset() {
      this.confirmDialog = true;
    },
    getSetupConfigurations() {
      return new Promise((resolve, reject) => {
        axios
          .get(this.$backendUrl + "api/setup")
          .then(res => {
            this.configList = res.data;
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    async reset() {
      this.dialog = true;
      let data = {
        id: this.selectedConfig,
        adminEmail : this.adminEmail,
        organizationName : this.organizationName,
        defaultPassword : this.defaultPassword
      }
      const res = await axios
        .post(this.$backendUrl + `api/setup`, data)
        .then(res => {
          this.dialog = false;
          this.$router.push("/logout");
        })
        .catch(err => {
          console.log(err);
          toast.error(err);
          this.dialog = false;
        });
    },

    async recreate360Data() {
      if (confirm('This is going to drop the existing data from your DB and fill with pseudo-random feedbacks. Proceed?')) {
        this.recreate360Message = 'Wait for it...';
        await this.$http.post(`api/setup/seed-360-feedback`);
        this.recreate360Message = 'Done!';
      }
    },
  }
};
</script>
