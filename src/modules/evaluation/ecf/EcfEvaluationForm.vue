<template>
  <v-container>
    <v-layout row wrap>
      Evaluation for {{employee.nameTemp}}. Started: {{evaluation.startDate}}. {{evaluation.endDate ? 'Ended: ' + evaluation.endDate : 'In progress'}}
    </v-layout>

    <v-layout>
      Note: marks are changed automatically
    </v-layout>

    <EcfCompetenceRow v-for="competence in competences" :key="competence.id"
      :competence="competence"
      :competenceLevels="competences.levels"
      v-on:click-competence-level="evaluate"></EcfCompetenceRow>

    <!-- <v-layout row wrap v-for="competence in competences" :key="competence.id" class="competenceRow">
      <v-flex xs6>{{competence.id}}  {{competence.name}}</v-flex>
      <v-flex xs6>
        <div v-for="i in [1,2,3,4,5]" :key="i"
          class="competenceLevelFill"
          :class="competence.levels[i] ? (competence.levels[i].level === competence.competenceLevel ? 'current' : 'available') : 'none'"
          @click="evaluate(competence.evaluationId, competence.levels[i].level, competence)">

        </div>
      </v-flex>
    </v-layout> -->

    <v-layout>
      <v-flex xs12>
        <!-- <v-spacer></v-spacer> -->
        <v-btn :disabled="!evaluationComplete" @click="finishEvaluation()">Finish Evaluation</v-btn>
      </v-flex>
    </v-layout>
    <!-- <v-list>
      <v-list-tile v-for="competence in competences" :key="competence.id">
        <v-list-tile-action>
          {{competence.id}}
        </v-list-tile-action>

        <v-list-tile-content>
          <v-layout>
          <v-flex xs6>
          <v-list-tile-title>{{competence.name}}</v-list-tile-title>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2>
            <div v-for="(level, i) in competence.levels" :key="i"
            class="competenceLevelFill"
            :class="level ? level.statusClass : 'none'">

          </div></v-flex>
          </v-layout>
        </v-list-tile-content>

        <v-list-tile-action>

        </v-list-tile-action>
      </v-list-tile>
    </v-list> -->

  </v-container>
</template>

<script>
import axios from 'axios'
import EcfCompetenceRow from '@/components/EcfCompetenceRow.vue'

export default {
  components: {
    EcfCompetenceRow
  },
  data: () => ({
    evaluation: {},
    employee: {},
    competences: []
  }),

  async created() {
    const id = +this.$route.params.id;
    const res = await axios.get(this.$backendUrl + 'api/EmployeeEvaluations/ecf-evaluation/' + id)

    this.evaluation = Object.assign({}, this.evaluation, {
      id: res.data.id,
      startDate: res.data.startDate,
      endDate: res.data.endDate,
    })
    this.employee = Object.assign({}, this.employee, res.data.employee);

    const ecfEvaluationId = res.data.ecfEmployeeEvaluation[0].id;
    const competences = []
    for (let e of res.data.ecfEmployeeEvaluation[0].ecfEvaluationResult) {
      const c = {
        resultMarkId: e.id,
        id: e.competenceNavigation.id,
        name: e.competenceNavigation.name,
        competenceLevel: e.competenceLevel,
        levels: [],
        ecfEvaluationId: ecfEvaluationId
      }
      const levels = e.competenceNavigation.competenceLevel;
      for (let level of levels) {
        c.levels[level.level] = {
          // statusClass: level.level === e.competenceLevel ? 'current' : 'available',
          description: level.description,
          level: level.level
        }
      }

      competences.push(c)
    }

    this.competences = competences;
  },

  computed: {
    evaluationComplete(){
      return this.competences.every(c => !!c.competenceLevel)
    }
  },

  methods: {
    // async evaluate(evaluationId, competenceLevel, competence) {
    async evaluate(payload) {
      const competence = payload.competence;
      const competenceLevel = payload.level;
      const resultMarkId = payload.competence.resultMarkId;

      if (competence.levels[competenceLevel]) {
        competence.competenceLevel = competenceLevel;
        const data = {
          id: resultMarkId,
          evaluationId: competence.ecfEvaluationId,
          competence: competence.id,
          competenceLevel: competenceLevel
        }
        await axios.post(this.$backendUrl + 'api/EmployeeEvaluations/ecf-evaluation/' + this.evaluation.id, data)
      }
    },

    async finishEvaluation() {
      alert('Nothing happens yet!')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
