<template>
  <v-flex xs12>

  <v-layout row wrap>
    <v-flex xs12>
      <v-card flat class="ma-2">
        <v-card-title class="pt-3" primary-title style="font-weight: 600; font-size: 14px;">
          {{comment.createdBy.nameTemp}}
        </v-card-title>
        <!-- <div style="font-weight: 600; font-size: 14px;"></div> -->
        <v-card-text class="pt-0 pb-2">
          {{comment.comment}}
        </v-card-text>
        <v-card-actions class="px-3">
          <span @click="start = true" style="cursor: pointer">
            <svg class="mr-1" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.29545 2.79574H1.54531L3.39941 0.860041C3.556 0.750788 3.63121 0.555463 3.58922 0.367137C3.54722 0.178811 3.39651 0.0355813 3.2089 0.00569682C3.02129 -0.0241877 2.83473 0.0653182 2.73811 0.231566L0.130012 2.92144C0.0431867 3.01192 -0.00367216 3.13445 0.000225044 3.26081C0.00352271 3.40167 0.0694345 3.53341 0.179455 3.61905L2.75048 6.32777C2.92951 6.46048 3.17587 6.4458 3.33843 6.29273C3.501 6.13966 3.53432 5.89101 3.41795 5.6993L1.56385 3.76359H9.28927C10.2968 3.82205 11.0844 4.66993 11.0844 5.69616C11.0844 6.72239 10.2968 7.57026 9.28927 7.62872H8.31896C8.06296 7.62872 7.85543 7.83975 7.85543 8.10007C7.85543 8.36039 8.06296 8.57143 8.31896 8.57143H9.30163C10.8119 8.49961 12 7.23358 12 5.69616C12 4.15873 10.8119 2.8927 9.30163 2.82088L9.29545 2.79574Z" fill="#2FA4DE"/>
            </svg>
            <span style="color: #2FA4DE;">Reply</span>
          </span>
          <v-spacer></v-spacer>

          <span style="color: rgba(60,136,181,0.5); font-size: 13px">{{comment.createdDate | formatDateTimeHuman}}</span>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 v-if="start" class="px-4">
      <v-text-field
        ref="commentInput"
        hide-details
        v-model="text"
        @keypress.enter="saveComment()"
        placeholder="Comment here..."
      ></v-text-field>
    </v-flex>

    <!-- <v-layout row wrap> -->
      <v-flex xs12>
        <v-divider class="mx-4"></v-divider>
      </v-flex>
    <!-- </v-layout> -->
    <v-layout row wrap  :style="{'margin-left': `25px`}">
      <Comment
        v-for="c in comment.inverseParentComment" :key="c.id"
        :comment="c"
      ></Comment>
    </v-layout>
  </v-layout>
  </v-flex>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import toast from '@/services/toast'

export default {
  name: 'Comment',
  props: {
    comment: {type: Object}
  },
  data: () => ({
    start: false,
    text: null
  }),
  methods: {
    async saveComment(){
      const data = {
        comment: this.text,
        ideaId: +this.$route.params.id,
        parentCommentId: this.comment.id
      };
      const res = await axios.post(this.$backendUrl + `api/IdeaComments`, data);
      // this.comment.inverseParentComment = Vue.observable(this.comment.inverseParentComment);
      this.comment.inverseParentComment.push(res.data);
      toast.success(`Your comment has been posted.`)
      this.start = false;
      this.text = null;
    }
  }
}
</script>

<style>

</style>
