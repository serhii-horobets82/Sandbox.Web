<template>
  <v-container class="text">
    <v-layout row wrap align-start>
      <!-- <v-flex xs2>
        <v-list subheader two-line v-if="isAuthenticated && profile" class="accent">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title class="title">Good morning,</v-list-tile-sub-title>
              <v-list-tile-title
                style="height: 30px"
                class="headline font-weight-bold"
              >{{profile.lastName}}!</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs10 class="pt-4">
        <span class="title">Lorem ipsun dolor sit ame lorem ipsum dolor sit ame dolor</span>
      </v-flex> -->

      <v-flex xs8 class="pr-2">
        <Certifications></Certifications>
      </v-flex>
      <v-flex xs4 class="pl-2">
        <v-card class="text-xs-center" color="primary" flat>
          <v-card-text>
            <v-rating small :length="ratingLength" v-model="rating" hover></v-rating>
          </v-card-text>
          <v-card-text class="title white--text">Lorem ipsum dolor sit ame lorem</v-card-text>
          <v-card-text>
            <v-btn large class="white" round outline>
              <span class="white--text title font-weight-bold">Review my colleagues</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 class="mt-4">
        <IdeasPlatform></IdeasPlatform>
      </v-flex>

      <v-flex xs12 class="mt-4">
        <Pdp></Pdp>
      </v-flex>
      <!--
      <v-flex xs12 class="my-4">
        <v-list subheader class="accent">
          <v-list-tile>
            <v-list-tile-content class="pl-0">
              <v-list-tile-title
                style="height: 30px"
                class="headline font-weight-bold"
              >Ideas Platform</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>

      <v-flex xs12 sm6>
        <v-card flat>
          <v-card-title>
            <span class="title">My ideas</span>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="pl-4">
        <v-card flat>
          <v-card-title>
            <span class="title">Company strategy</span>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs12 class="my-4">
        <v-list subheader class="accent">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title style="height: 30px" class="headline font-weight-bold">My Review</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>-->

      <v-flex xs12 class="mt-4">
        <Review360></Review360>
      </v-flex>

      <v-flex xs12 class="mt-4">
        <Technologies></Technologies>
      </v-flex>

      <v-flex xs12 class="mt-4">
        <ProfileEvaluation></ProfileEvaluation>
      </v-flex>

      <!-- <v-flex xs6>
          <v-card>
            <v-card-title>
              OKR
            </v-card-title>
            <v-card-text style="height: 150px">

            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              OKR Progress
            </v-card-title>
            <v-card-text style="height: 150px">

            </v-card-text>
          </v-card>
      </v-flex>-->
    </v-layout>
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import axios from "axios";
import EcfCompetenceRow from "@/components/EcfCompetenceRow.vue";
import ProfileEvaluation from "./profile/ProfileEvaluation.vue";
import Certifications from "./profile/Certifications.vue";
import Pdp from "./profile/Pdp.vue";
import Technologies from "./profile/Technologies.vue";
import Review360 from "./profile/360.vue";
import IdeasPlatform from "./profile/IdeasPlatform.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EcfCompetenceRow,
    ProfileEvaluation,
    Certifications,
    Pdp,
    Technologies,
    Review360,
    IdeasPlatform
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("user", ["profile"])
  },
  data: () => ({
    rating: 0,
    ratingLength: 3,
    employee: null,
    teamsByProjectId: {},
    competences: []
  }),
  watch: {
    profile: {
      handler(val) {
        this.getData(); // hack to reload data withod page reload
      },
      immediate: true
    }
  },
  async created() {
  },

  methods: {
    add(id) {},
    async save() {},
    async getData() {
      if(!this.profile) return; // wait for profile
      const res = await axios.get(this.$backendUrl + `api/employees/profile`);
      this.employee = res.data;

      this.employee.employeeRelationsEmployee.forEach(r => {
        const d = {
          teamId: r.teamId,
          teamName: r.team.name
        };
        let t = this.teamsByProjectId[r.projectId];
        if (!t) {
          t = {
            id: r.id,
            projectId: r.projectId,
            projectName: r.project.name,
            teams: []
          };
          this.teamsByProjectId[r.projectId] = t;
        }
        t.teams.push(d);
      });
    }
  }
};
</script>

<style lang="scss" scope>
.text {
  * {
    color: #3c88b5;
  }
}

.title {
  font-size: 18px !important;
  font-weight: 600;
  font-family: "Montserrat";
}
.profileIcon {
  display: inline-block;
  background-color: rgba(61, 179, 237, 0.21);

  width: 42px;
  height: 42px;
  border-radius: 42px;
  line-height: 42px;
  text-align: center;

  .v-icon {
    color: #3db3ed;
  }
}
</style>
