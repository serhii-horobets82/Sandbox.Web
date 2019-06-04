<template>
  <v-container>
    <!-- <v-layout> -->
    <!-- <v-layout row>
        Employee name
    </v-layout>-->

    <v-layout row wrap align-center>
      <v-flex xs12 class>
        <!-- <v-card>
            <v-layout>
        <v-flex>-->
        <v-avatar class="mr-2" color="accent darken-5">
          <v-icon large class="material-icons-outlined" color="blue darken-2">lightbulb</v-icon>
        </v-avatar>
        <!-- <v-icon style="font-size: 60px" color="teal darken-2">perm_identity</v-icon> -->
        <span class="headline">
          Good morning,
          <span class="font-weight-bold">{{profile.firstName}}</span> !
        </span>
        <v-divider vertical></v-divider>
        <!-- </v-flex>
        </v-layout>-->

        <!-- <v-card-title class="headline" v-if="employee">
              {{ employee.nameTemp }} ({{ employee.employeeType.type }})
            </v-card-title>
            <v-card-text style="height: 150px" class="text-xs-center">
              <v-icon style="font-size: 100px" color="teal darken-2">perm_identity</v-icon>
        </v-card-text>-->
        <!-- </v-card> -->
      </v-flex>

      <!-- <v-flex xs6>
          <v-card>
            <v-card-title>
              Teams/Projects
            </v-card-title>
            <v-card-text style="min-height: 150px">
              <v-card v-for="item in teamsByProjectId" :key="item.id">
                <v-card-title>
                  Project: {{ item.projectName }}
                </v-card-title>

                <v-card-text>
                  Teams:
                  <ul>
                  <li v-for="team in item.teams" :key="team.teamId">
                    {{team.teamName}}
                  </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
      </v-flex>-->

      <v-flex xs8 class="mt-4">
        <Certifications></Certifications>
      </v-flex>

      <v-flex xs12 class="mt-4">
        <Pdp></Pdp>
      </v-flex>

      <v-flex xs12 class="mt-4">
        <!-- <Pdp></Pdp> -->
        <span class="title">
          <!-- <span class="profileIcon mr-1">
              <v-icon>bug_report</v-icon>
          </span>-->
          Ideas Platform
        </span>
      </v-flex>

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
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  components: {
    EcfCompetenceRow,
    ProfileEvaluation,
    Certifications,
    Pdp,
    Technologies,
    Review360
  },
  computed: {
    ...mapGetters("user", ["profile", "userIsAdmin", "userIsManager"])
  },
  data: () => ({
    employee: null,
    teamsByProjectId: {},
    competences: []
  }),

  async created() {
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
  },

  methods: {
    add(id) {},
    async save() {}
  }
};
</script>

<style lang="scss" scope>
* {
  color: #3c88b5;
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
