<template>
  <v-layout row>
    <v-flex xs6>
      <v-card flat style="background-color: #F7FBFF">
        <!-- <v-card-title>
          Technical Competence
        </v-card-title>-->
        <v-card-text style="min-height: 150px; margin-top: 7px;">
          <table class="skillHeaderRow">
            <tbody>
              <tr>
                <td style="width: 50%">Current level - Junior</td>
                <td v-for="i in [1,2,3,4,5]" :key="i" class="text-xs-center">{{ `E${i}` }}</td>
              </tr>
            </tbody>
          </table>
          <table class="skillRow" v-for="competence in competences" :key="competence.id">
            <tbody>
              <tr>
                <td style="width: 50%">{{ competence.name }} - {{competence.competenceLevel}}</td>
                <td
                  v-for="i in [1,2,3,4,5]"
                  :key="i"
                  class="competenceLevelFill text-xs-center"
                  style="width: 10%"
                  :class="{
                    'current': competence.levels[i] && competence.competenceLevel && i <= competence.competenceLevel
                  }"
                >
                  <v-icon style="color: #B5D6EC" small v-if="!competence.levels[i]">block</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <v-layout style="line-height:40px;" row v-for="competence in competences" :key="competence.id">
            <v-flex xs6>{{ competence.name }}</v-flex>
            <v-flex xs6>
              <table style="width: 100%; border-spacing:0">
                <tbody>
                  <tr style="width: 100%">
                    <td v-for="i in [1,2,3,4,5]" :key="i"
                      class="competenceLevelFill text-xs-center"
                      style="width: 20%"
                      :class="{
                        'current': competence.levels[i] && competence.levels[i].level === competence.competenceLevel,
                        'available': competence.levels[i] && competence.levels[i].level !== competence.competenceLevel,
                      }">
                      <v-icon small v-if="!competence.levels[i]">block</v-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-flex>
          </v-layout>-->
          <!-- <EcfCompetenceRow v-for="competence in competences" :key="competence.id"
            :competence="competence"
            :competenceLevels="competence.levels"
          ></EcfCompetenceRow>-->
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs6>
      <v-card flat style="background-color: #F7FBFF">
        <v-card-text style="min-height: 150px"  v-if="grades">
          <table class="skillHeaderRow">
            <tbody>
              <tr>
                <td style="width: 50%">
                  <v-btn-toggle v-model="gradeId">
                    <v-btn flat :value="2" small>
                      Junior
                    </v-btn>
                    <v-btn flat :value="3" small>
                      Middle
                    </v-btn>
                  </v-btn-toggle>
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="text-xs-center">
                  {{ `E${i}` }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="skillRow"
            v-for="competence in grades[gradeId].rows"
            :key="competence.id">
            <tbody>
              <tr>
                <td style="width: 50%">
                  <v-layout>
                    {{ competence.name }}
                    <v-spacer></v-spacer>
                    <CompetenceInfo :competence="competence"></CompetenceInfo>
                  </v-layout>
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="competenceLevelFill text-xs-center"
                  style="width: 10%"
                  :class="{
                    'required': competence.competenceLevel === i,
                    'available': competence.levels[i - 1],// && i < competence.competenceLevel
                    'selected': i == competence.competenceLevel
                  }"
                  >
                  <v-icon style="color: #B5D6EC" small v-if="!competence.levels[i - 1]">block</v-icon>
                  <v-tooltip bottom v-if="competence.levels[i - 1] && competence.levels[i - 1].certificates">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        small
                        v-on="on">assignment</v-icon>
                    </template>
                    <span>{{competence.levels[i-1].certificates.map(c=>c.name).join('; ')}}</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import EcfCompetenceRow from "@/components/EcfCompetenceRow.vue";

export default {
  components: {
    EcfCompetenceRow
  },
  data: () => ({
    competences: [],
    grades: null,
    gradeId: null
  }),

  async created() {
    const resEcf = await axios.get(
      this.$backendUrl + `api/employees/profile/ecf-evaluation`
    );
    this.competences = resEcf.data;

    this.gradeId = 2;
    const roleId = 2;
    const res = await axios.get(this.$backendUrl + `api/RoleGrades/${roleId}/competences`);
    this.grades = res.data;
  },

  methods: {
    add(id) {},
    async save() {}
  }
};
</script>

<style scoped lang="scss">
.skillHeaderRow {
  width: 100%;
  border-spacing: 0;
  margin-bottom: 7px;

  td {
    color: #a2c4da;
  }
}

.skillRow {
  font-size: 12px;
  width: 100%;
  border-spacing: 0;
  line-height: 40px;
  margin-bottom: 7px;
  color: #3c88b5;
  background-color: white;

  td {
    border: 1px solid #e8eff7;
  }
  td:first-child {
    padding-left: 20px;
  }
}

.competenceRow {
  font-size: 16px;
  margin: 5px;
}

  .competenceLevelFill {
    border-spacing: 0;
    // min-width: 22px;
    // height: 22px;
    // margin: 1px;
    // float:left;

    // &.none {
    //   background-color: lightblue;
    // }

    &.available, &.required {
      background-color: rgba(61, 179, 237, 0.15);
      // background-color: #E3F2FD;
      // background-color: lightgreen;
      cursor: pointer;
    }

    &.current {
      background-color: rgba(61, 179, 237, 0.15);
      // background-color: green;
      // cursor: pointer;
    }
    &.selected {
      background-color: #3C88B5;
    }

    &.roleDesired {
      border-color: green;
      border-style: solid;
      border-width: 2px;
      padding: 2px;
      background-clip: content-box;
    }
  }
</style>
