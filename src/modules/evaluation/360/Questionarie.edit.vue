<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs4>

        <v-list two-line subheader >
          <div v-for="group in groups"  :key="group.id">
          <!-- <template v-for="group in groups"> -->
            <v-subheader inset>
              {{ group.type}}
              <v-spacer></v-spacer>
              <v-btn icon flat small class="ma-0 right" color="success" @click="addQuestion(group.id)">
                <v-icon>add</v-icon>
              </v-btn>
            </v-subheader>

              <v-list-tile
                v-for="question in questionsByGroupId[group.id]" :key="question.id"
                @click="selectQuestion(question.id)"
                :class="selectedQuestionId == question.id ? 'blue--text text--darken-1' : ''"
              >
                <v-list-tile-title>
                    {{ question.text }}
                  </v-list-tile-title>
                  <v-list-tile-action>
                    <v-btn icon flat @click="editQuestion(question)">
                        <v-icon small>create</v-icon>
                      </v-btn>
                    <!-- <v-icon small @click="editQuestion(question)">create</v-icon> -->
                  </v-list-tile-action>
              </v-list-tile>
          <!-- </template> -->
          </div>
        </v-list>

        <v-dialog
          v-model="dialog.open"
          @keydown.esc="dialog.open = false"
          max-width="600"
          scrollable
        >
          <v-card>
            <v-card-title>
              <span class="headline" v-if="!dialog.questionEdit.id">Add question</span>
              <span class="headline" v-else>Edit question</span>
            </v-card-title>

            <v-card-text>
              <v-text-field label="Question" v-model="dialog.questionEdit.text">

              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="saveQuestion()" :disabled="!dialog.questionEdit.text">Save</v-btn>
              <v-btn @click="closeDialog()">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>

      <v-flex xs8>
        <v-card v-if="selectedQuestionId">
          <v-card flat class="pa-2">
            <v-icon color="green darken-1">sentiment_very_satisfied</v-icon>
            <v-textarea label="Statements" v-model="questionsByMark[1].question"></v-textarea>
          </v-card>
          <v-card flat class="pa-2">
            <v-icon color="yellow darken-1">sentiment_satisfied</v-icon>
            <v-textarea label="Statements" v-model="questionsByMark[3].question"></v-textarea>
          </v-card>
          <v-card flat class="pa-2">
            <v-icon color="red">sentiment_very_dissatisfied</v-icon>
            <v-textarea label="Statements" v-model="questionsByMark[5].question"></v-textarea>
          </v-card>

          <v-card flat>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="saveQuestionStatements()">Save</v-btn>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    groups: [
    ],
    questionsByGroupId: {},
    dialog: {
      open: false,
      questionEdit: {},
      ref: {},
    },
    selectedQuestionId: 0,
    questionsByMark: {
      1: {question:null},
      3: {question:null},
      5: {question:null},
    },
    questionsResponse: []
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + 'api/_360questionarie/groups')
    this.groups = res.data

    const resQuestionarie = await axios.get(this.$backendUrl + 'api/_360questionarie')
    const qById = {};
    this.groups.forEach(g => qById[g.id] = [])
    resQuestionarie.data.forEach(q => qById[q._360feedbackGroupId].push(q))
    this.questionsByGroupId = qById;
  },

  methods: {
    addQuestion(id) {
      this.dialog.questionEdit = Object.assign({}, this.dialog.questionEdit, {id: 0, text: null, _360feedbackGroupId: id})
      // this.dialog.questionEdit.id = 0;
      // this.dialog.questionEdit.text = null;
      // this.dialog.questionEdit._360feedbackGroupId = id;

      this.dialog.open = true;
    },
    editQuestion(question){
      this.dialog.questionEdit = {...question};
      this.dialog.ref = question;
      this.dialog.open = true;
    },

    async saveQuestion(){
      const data = {
        ...this.dialog.questionEdit
      }
      if (data.id) {
        await axios.put(this.$backendUrl + 'api/_360questionarie/' + data.id, data);
        this.dialog.ref.text = data.text;
      } else {
        const res = await axios.post(this.$backendUrl + 'api/_360questionarie', data);
        this.questionsByGroupId[data._360feedbackGroupId].push(res.data)
      }
      this.dialog.open = false;
    },
    closeDialog(){
      this.dialog.open = false;
    },

    async selectQuestion(id) {
      this.selectedQuestionId = id;
      const res = await axios.get(this.$backendUrl + `api/_360questionarie/${id}/questions`);

      console.log(res.data)

      const result = {
        1: {question:null},
        3: {question:null},
        5: {question:null},
      }
      res.data.forEach(d => {
        const t = {
          question: d._360question.length ? d._360question[0].question : null,
          questionToMarkId: d.id
        }
        result[d.markId] = t;
      })

      this.questionsByMark = result;
      return ;

      // if (!res.data.length){
      //   const data = {
      //     1: {_360question: []},
      //     3: {_360question: []},
      //     5: {_360question: []},
      //   }
      //   this.questionsByMark = data;
      //   return ;
      // }
      // // current implementation expect single aggregated statement per mark
      // const data = {}
      // data[1] = getOne(res.data, 1);
      // data[3] = getOne(res.data, 3);
      // data[5] = getOne(res.data, 5);
      // this.questionsByMark = data;

      // function getOne(qs, mark){
      //   const result = qs.find(d => d.markId == mark);
      //   if (result) {
      //     const q = result;
      //     return q;
      //   }
      //   return {_360question: []};
      // }
    },

    async saveQuestionStatements(){
      const data = []

      data.push(this.questionsByMark[1])
      data.push(this.questionsByMark[3])
      data.push(this.questionsByMark[5])
      console.log(data)

      const res = await axios.post(this.$backendUrl + `api/_360questionarie/${this.selectedQuestionId}/questions`, data);
    }
  }
}

</script>

<style>

</style>
