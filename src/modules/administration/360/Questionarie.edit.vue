<template>
  <v-container fluid>
    <v-layout row class="pb-3">
      <v-flex xs12>
        <v-layout row wrap>
          <div class="title font-weight-bold" style="line-height: 48px !important;">360 Feedback Questionarie</div>
        </v-layout>
      </v-flex>
    </v-layout>
      <v-container grid-list-md fluid class="pa-0">

    <v-layout row wrap>
      <v-flex xs4>

        <v-list two-line subheader >
          <div v-for="group in groups" :key="group.type">
          <!-- <template v-for="group in groups"> -->
            <v-subheader>
              {{ group.type }}
              <v-spacer></v-spacer>
              <v-btn icon flat small class="ma-0 right" color="success" @click="addQuestion(group)">
                <v-icon>add</v-icon>
              </v-btn>
            </v-subheader>

              <v-list-tile
                v-for="question in questionsByGroupId[group.isForManager]" :key="question.id"
                @click="selectQuestion(question.id)"
                :class="selectedQuestionId == question.id ? 'blue--text text--darken-1' : ''"
              >
                <v-list-tile-title class="ml-4">
                    {{ question.name }}
                  </v-list-tile-title>
                  <v-list-tile-action>
                    <v-btn icon flat @click.stop="editQuestion(question)">
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
              <v-text-field label="Question" ref="dialogQuestionEditName" v-model="dialog.questionEdit.name">

              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="saveQuestion()" :disabled="!dialog.questionEdit.name">Save</v-btn>
              <v-btn @click="closeDialog()">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>

      <v-flex xs8 v-if="selectedQuestionId">
        <v-card
          flat class="pa-2 mb-2"
          v-for="statement in statements" :key="statement.id"
        >
          <v-textarea :label="`Statements for mark ${statement.mark}`" v-model="statement.text"></v-textarea>
        </v-card>
        <v-btn color="primary" @click="saveQuestionStatements()" block >Save</v-btn>
      </v-flex>
      <v-flex xs8 v-else>
        Click on the Question on the left to edit the statements.
      </v-flex>
    </v-layout>
      </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'
import toast from '@/services/toast'

export default {
  data: () => ({
    groups: [
      {'type': 'General Questions', isForManager: false},
      {'type': 'Additional Questions for Manager', isForManager: true},
    ],
    questionsByGroupId: {},
    dialog: {
      open: false,
      questionEdit: {},
      ref: {},
    },
    selectedQuestionId: 0,
    statements: null
  }),

  async created(){
    const resQuestionarie = await this.$http.get(`api/_360questionarie`).then(_ => _.data);
    // false for General, true for Manager
    const qByGroup = { false: [], true: [] };
    resQuestionarie.forEach(q => qByGroup[q.isForManager].push(q))
    this.questionsByGroupId = qByGroup;
  },

  methods: {
    addQuestion(group) {
      this.dialog.questionEdit = Object.assign(
        {},
        this.dialog.questionEdit,
        {id: 0, name: null, isForManager: group.isForManager});

      this.dialog.open = true;
      this.$nextTick(this.$refs.dialogQuestionEditName.focus)
    },
    editQuestion(question){
      this.dialog.questionEdit = {...question};
      this.dialog.ref = question;
      this.dialog.open = true;
      this.$nextTick(this.$refs.dialogQuestionEditName.focus)
    },

    async saveQuestion(){
      const data = {
        ...this.dialog.questionEdit
      }
      if (data.id) {
        await this.$http.put(`api/_360questionarie/${data.id}`, data);
        this.dialog.ref.name = data.name;
        toast.success(`Question has changed name to ${data.name}.`)
      } else {
        const res = await this.$http.post(`api/_360questionarie`, data);
        this.questionsByGroupId[data.isForManager].push(res.data)
        toast.success(`Question ${res.name} added.`)
      }
      this.dialog.open = false;
    },
    closeDialog(){
      this.dialog.open = false;
    },

    async selectQuestion(id) {
      this.selectedQuestionId = id;
      const res = await this.$http.get(`api/_360questionarie/${id}/questions`).then(_ => _.data);
      this.statements = res;
    },

    async saveQuestionStatements(){
      const res = await this.$http.post(`api/_360questionarie/${this.selectedQuestionId}/questions`, this.statements);
      toast.success(`Question statements saved successfully.`)
    }
  }
}

</script>

<style>

</style>
