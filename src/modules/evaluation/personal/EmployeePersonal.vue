<template>
  <v-container>


    <v-layout>
      {{ employee.nameTemp }} - Personal page
    </v-layout>
    <v-layout>
      <v-flex xs8>
      <v-card>
        <v-card-title>
          I evaluate:
        </v-card-title>
        <v-card-text>
          <v-layout row wrap v-for="item in evaluatees" :key="item.id">
            <v-flex xs4>{{item.employee.nameTemp}}</v-flex>
            <v-flex xs4>
              {{item.endDate ? 'Last evaluation: ' + item.endDate : 'Evaluation in progress'}}
            </v-flex>
            <v-flex xs4>
             <router-link :to="{name: 'ecfEvaluationForm', params: {id: item.id}}">View</router-link>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      employee: {},
      evaluatees: []
    }
  },

  async created(){
    const id = this.$route.params.id;
    const res = await axios.get(this.$backendUrl + 'api/employees/' + id);
    this.employee = Object.assign({}, this.employee, res.data);

    ///api/EmployeeEvaluations/5/whom-evaluate
    const resEvaluatee = await axios.get(this.$backendUrl + 'api/EmployeeEvaluations/' + id + '/whom-evaluate');
    this.evaluatees = resEvaluatee.data;

  }
}
</script>

<style>

</style>
