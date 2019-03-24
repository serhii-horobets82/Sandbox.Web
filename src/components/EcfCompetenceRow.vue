<template>
  <v-layout row class="competenceRow">
    <!-- <v-flex xs6>
      <v-layout row class="body-1">
        {{competence.id}}  {{competence.name}}
        <v-spacer></v-spacer>
        <v-icon @click="showDetailedInfo(competence.id)">info</v-icon>
      </v-layout>
    </v-flex>
    <v-flex xs6>
      <v-layout row>
      <div v-for="i in [1,2,3,4,5]" :key="i"
        class="competenceLevelFill"
        :class="{
          'none': !competence.levels[i],
          'current': competence.levels[i] && competence.levels[i].level === competence.competenceLevel,
          'available': competence.levels[i] && competence.levels[i].level !== competence.competenceLevel,
          'roleDesired': i == competence.roleLevel
        }">

      </div>
      </v-layout>
    </v-flex> -->

    <v-flex xs12>
      <v-layout class="align-center mt-1">
        <span class="body-1">{{competence.id}}  {{competence.name}}</span>
        <v-spacer></v-spacer>
        <v-icon @click="showDetailedInfo(competence.id)" class="mr-2">info</v-icon>

      <div v-for="i in [1,2,3,4,5]" :key="i"
        class="competenceLevelFill"
        :class="{
          'none': !competence.levels[i],
          'current': competence.levels[i] && competence.levels[i].level === competence.competenceLevel,
          'available': competence.levels[i] && competence.levels[i].level !== competence.competenceLevel,
          'roleDesired': i == competence.roleLevel
        }">

      </div>
      </v-layout>
    </v-flex>

    <v-dialog v-model="open" @keydown.esc="open = false" max-width="800" scrollable>
      <v-card v-if="details">
        <v-card-title>
          <span class="headline mb-3"> {{details.id.trim()}}. {{details.name}} </span>
          {{ details.summary }}
        </v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex v-for="i in [1,2,3,4,5]" :key="i" class="ma-1">
              <div class="subheading mb-1" style="min-width: 90px">
                Level {{i}}

                <v-icon v-if="competence.roleLevel == i" color="success" class="ml-1">check</v-icon>

              </div>
              <div>{{ levels[i] || '-' }}</div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="open = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  props: ["competence", "competenceLevels"],

  data: () => ({
    open: false,
    details: null,
    levels: {}
  }),

  methods: {
    async showDetailedInfo(id){
      this.open = true;
      const res = await axios.get(this.$backendUrl + `api/competences/${id}`);
      this.details = res.data;

      const d = {}
      res.data.ecfCompetenceLevel.forEach(r => {
        d[r.level] = r.description
      })
      this.levels = d;
    }
  },

  computed: {

  }
}
</script>

<style scoped lang="scss">
  .competenceRow {
    font-size: 16px;
    margin: 5px;
  }

  .competenceLevelFill {
    min-width: 22px;
    height: 22px;
    margin: 1px;
    float:left;

    &.none {
      background-color: lightblue;
    }

    &.available {
      background-color: lightgreen;
      cursor: pointer;
    }

    &.current {
      background-color: green;
      cursor: pointer;
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
