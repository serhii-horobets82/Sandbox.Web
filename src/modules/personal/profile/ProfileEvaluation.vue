<template>
  <v-layout row>
    <v-flex xs6>
      <v-card flat style="background-color: #F7FBFF">
        <!-- <v-card-title>
          Technical Competence
        </v-card-title> -->
        <v-card-text style="min-height: 150px">
          <table class="skillHeaderRow" >
            <tbody>
              <tr>
                <td style="width: 50%">
                  Current competence level
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="text-xs-center">
                  {{ `E${i}` }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="skillRow" v-for="competence in competences" :key="competence.id">
            <tbody>
              <tr>
                <td style="width: 50%">
                  {{ competence.name }} - {{competence.competenceLevel}}
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="competenceLevelFill text-xs-center"
                  style="width: 10%"
                  :class="{
                    'current': competence.levels[i] && competence.competenceLevel && i <= competence.competenceLevel
                  }">
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
          </v-layout> -->
          <!-- <EcfCompetenceRow v-for="competence in competences" :key="competence.id"
            :competence="competence"
            :competenceLevels="competence.levels"
            ></EcfCompetenceRow> -->
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs6>
      <v-card flat style="background-color: #F7FBFF">
        <v-card-text style="min-height: 150px">
          <table class="skillHeaderRow" >
            <tbody>
              <tr>
                <td style="width: 50%">
                  Required skills
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="text-xs-center">
                  {{ `E${i}` }}
                </td>
              </tr>
            </tbody>
          </table>
          <table class="skillRow" v-for="competence in competences" :key="competence.id">
            <tbody>
              <tr>
                <td style="width: 50%">
                  {{ competence.name }}
                </td>
                <td v-for="i in [1,2,3,4,5]" :key="i"
                  class="competenceLevelFill text-xs-center"
                  style="width: 10%"
                  :class="{
                    'required': competence.roleLevel === i,
                    'available': competence.levels[i] && i < competence.roleLevel
                  }">
                  <v-icon style="color: #B5D6EC" small v-if="!competence.levels[i]">block</v-icon>
                  <v-icon style="color: #B5D6EC" small v-if="competence.roleLevel === i">error_outlined</v-icon>
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
import axios from 'axios'
import EcfCompetenceRow from '@/components/EcfCompetenceRow.vue'

export default {
  components: {
    EcfCompetenceRow
  },
  data: () => ({
    competences: []
  }),

  async created(){
    const resEcf = await axios.get(this.$backendUrl + `api/employees/profile/ecf-evaluation`);
    this.competences = resEcf.data;
    console.log(this.competences)
  },

  methods: {
    add(id) {

    },
    async save(){

    },
  }
}
</script>

<style scoped lang="scss">
  .skillHeaderRow {
    width: 100%;
    border-spacing:0;
    margin-bottom: 7px;

    td {
      color: #A2C4DA;
    }
  }

  .skillRow {
    font-size: 12px;
    width: 100%;
    border-spacing:0;
    line-height:40px;
    margin-bottom: 7px;
    color: #3C88B5;
    background-color: white;

    td {
      border: 1px solid #E8EFF7;
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
      // cursor: pointer;
    }

    &.current {
      background-color: rgba(61, 179, 237, 0.15);
      // background-color: green;
      // cursor: pointer;
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
