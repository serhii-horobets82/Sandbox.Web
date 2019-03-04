<template>
  <v-card>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">About</div>
                <Spinner/>
                <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark>Listen now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>

</template>

<script lang="ts">
  import Spinner from '@/components/Spinner.vue';
  import {Component, Vue} from 'vue-property-decorator';
  import {mapGetters} from 'vuex';
  import {dashboardService} from '../services/dashboard.service';

  @Component({
    computed: mapGetters({
      version: 'version',
    }),
    components: {
      Spinner,
    },
  })
  export default class DashboardHome extends Vue {

    private isBusy: boolean = false;
    private homeData = {} as any;

    get name() {
      return this.homeData.firstName + ' ' + this.homeData.lastName;
    }

    private created() {
      this.isBusy = true;
      dashboardService.getHomeDetails().then((resp: any) => {
        this.homeData = resp.data;
        this.isBusy = false;
      });
    }
  }
</script>
