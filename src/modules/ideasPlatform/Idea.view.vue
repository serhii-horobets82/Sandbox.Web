<template>
  <v-container >
    <!-- <v-layout row wrap class="mb-3">
      <span class="title font-weight-bold" style="line-height: 48px !important;">Create New Idea</span>

    </v-layout> -->
    <v-layout row wrap>
      <v-flex xs12>
        <router-link :to="{name:'ideas-platform'}" style="text-decoration: none;color:rgba(60,136,181, 0.5)">
          <svg class="mr-2" style="margin-bottom: -2px;" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.39606 12.7699C6.39606 12.7699 1.26009 7.62798 1.21795 7.58482C0.927351 7.29215 0.927351 6.72697 1.21795 6.43443L6.39606 1.2195C6.68665 0.926834 7.15856 0.926834 7.4482 1.2195C7.7388 1.51168 7.7388 1.98634 7.4482 2.27912L3.50998 6.24535L12.1607 6.24535C12.572 6.24535 12.9048 6.5807 12.9048 6.9947C12.9048 7.40845 12.572 7.74404 12.1607 7.74404L3.50998 7.74404L7.4482 11.7103C7.7388 12.003 7.7388 12.4771 7.4482 12.7699C7.15844 13.0626 6.68665 13.0626 6.39606 12.7699Z" fill="#3C88B5" fill-opacity="0.5"/>
            <path d="M6.39606 12.7699C6.39606 12.7699 1.26009 7.62798 1.21795 7.58482C0.927351 7.29215 0.927351 6.72697 1.21795 6.43443L6.39606 1.2195C6.68665 0.926834 7.15856 0.926834 7.4482 1.2195C7.7388 1.51168 7.7388 1.98634 7.4482 2.27912L3.50998 6.24535L12.1607 6.24535C12.572 6.24535 12.9048 6.5807 12.9048 6.9947C12.9048 7.40845 12.572 7.74404 12.1607 7.74404L3.50998 7.74404L7.4482 11.7103C7.7388 12.003 7.7388 12.4771 7.4482 12.7699C7.15844 13.0626 6.68665 13.0626 6.39606 12.7699" stroke="white" stroke-width="0.5"/>
          </svg>
          Back to Idea Platform
        </router-link>
      </v-flex>
    </v-layout>

    <v-layout v-if="idea" row wrap class="mt-4" style="margin: 0 168px">
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12>
            <div>Strategy: {{ idea.strategy }}</div>
            <div class="mt-1" style="font-weight: 600; font-size: 18px;">{{ idea.name }}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-4 mb-3">
          <!-- <v-flex> -->
            <span v-for="(r, i) in idea.ideaTagRef" :key="i"
              class=" px-3 mr-2"
              style="display: inline-block; background: #EFF6FD; border-radius: 2px; font-size: 12px; height: 22px; line-height: 22px">
              {{ tagsById[r.tagId] }}
            </span>
            <span v-if="!idea.ideaTagRef.length">No tags...</span>
            <v-spacer></v-spacer>
            <span style="font-size: 12px; color: #3DB3ED !important; display:inline-block; background: #EFF9FD;line-height: 14px; padding: 5px 10px; border-radius: 18px;">
              ${{idea.price || ' ---'}}
            </span>
          <!-- </v-flex> -->
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap class="mt-2">
          <v-list style="background: #F7FBFF;">
            <v-list-tile avatar>
              <v-list-tile-avatar color="rgb(181,214,236, 0.5)">
                <span class="headline" style="color: #A2C4DA;">
                  {{ idea.createdBy.nameTemp[0] }}
                </span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title style="font-size: 14px; font-weight: bold">By {{ idea.createdBy.nameTemp }}</v-list-tile-title>
                <v-list-tile-sub-title style="font-size: 13px;color: #3C88B5;">{{ idea.createdDate | formatDateHuman }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-layout>

        <v-layout row wrap class="mb-4">
          <v-flex xs12 style="margin-top: -25px; white-space: pre-line;">
            <!-- <span> -->

              {{ idea.description }}
            <!-- </span> -->
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap class="my-4">
          <span @click="like(idea)" class="pr-3"
            style="color: #ED3D3D !important; display: inline-block; cursor: pointer"
          >
            <!-- <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.593 17.4707C27.5664 7.805 17.7839 -3.42495 10.593 3.74261C3.40212 -3.42495 -6.40367 7.805 10.593 17.4707Z" stroke="#ED3D3D"/>
            </svg> -->
            <svg class="mr-1" style="margin-bottom: -3px;" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
              d="M9.59303 16.4707C26.5664 6.805 16.7839 -4.42495 9.59303 2.74261C2.40212 -4.42495 -7.40367 6.805 9.59303 16.4707Z"
              :fill="idea.ideaLike.some(l => l.employeeId == employeeId) ? '#ED3D3D' : '#C1D9E8'"/>
            </svg>
            <span
              :style="{color: idea.ideaLike.some(l => l.employeeId == employeeId) ? '#ED3D3D' : '#C1D9E8'}"
              >
              {{ idea.ideaLike.length }}
            </span>
          </span>

          <span class="pr-3">
            <svg class="mr-1" style="margin-bottom: -3px;" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5346 0.489359C13.456 0.481897 13.3774 0.474434 13.295 0.470703C12.1571 0.474434 11.0192 0.475678 9.88129 0.474434C9.59307 0.474434 8.00223 0.474434 6.19056 0.470703C5.72267 0.49309 5.38204 0.519208 5.26226 0.541595C1.82232 1.14231 -0.502161 4.51525 0.0929972 7.95163C0.650724 11.1791 3.25594 13.3842 6.54241 13.4028C7.42953 13.4066 8.31666 13.3916 9.20378 13.414C9.41144 13.421 9.61223 13.4899 9.78022 13.6118C10.6935 14.3207 11.5844 15.0632 12.4977 15.7721C12.8122 16.0146 13.1603 16.2348 13.5234 16.3765C14.2009 16.6377 14.7773 16.343 15.0131 15.649C15.0994 15.3933 15.151 15.1273 15.1666 14.858C15.1928 14.3468 15.1965 13.8319 15.1778 13.317C15.1666 13.0409 15.2489 12.8917 15.5072 12.7611C18.0338 11.4776 19.3589 9.10082 19.1418 6.28381C18.9097 3.30637 16.5074 0.765463 13.5346 0.489359Z" fill="#D8E3EE"/>
            </svg>
            {{ idea.ideaComment.length }}
          </span>

          <span>
            <svg class="mr-1" style="margin-bottom: -3px;" width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.678 15C19.482 15 25.1337 8.35669 25.1337 8.35669C25.5757 7.88355 25.5882 7.10206 25.1476 6.62498C25.1476 6.62498 19.7753 0 12.7367 0C5.69802 0 0.325677 6.62498 0.325677 6.62498C-0.108673 7.10824 -0.110974 7.89267 0.333291 8.36401C0.333291 8.36401 5.87399 15 12.678 15ZM12.7367 12.7941C15.6522 12.7941 18.0156 10.4239 18.0156 7.5C18.0156 4.57614 15.6522 2.20588 12.7367 2.20588C9.82116 2.20588 7.45768 4.57614 7.45768 7.5C7.45768 10.4239 9.82116 12.7941 12.7367 12.7941ZM12.7367 9.85294C14.0324 9.85294 15.0829 8.79949 15.0829 7.5C15.0829 6.20051 14.0324 5.14706 12.7367 5.14706C11.4409 5.14706 10.3904 6.20051 10.3904 7.5C10.3904 8.79949 11.4409 9.85294 12.7367 9.85294Z" fill="#D8E3EE"/>
            </svg>
            {{ idea.ideaView.length }}
          </span>
        </v-layout>

        <v-layout row wrap class="mb-3">
          <v-text-field style="border: 1px solid #E8EFF7; background-color: white !important;"
            outline
            hide-details
            v-model="comment"
            @keypress.enter="enterComment()"
            placeholder="Type your comment here..."
          ></v-text-field>
        </v-layout>

        <v-layout row wrap style="background-color: white !important; border: 1px solid #E8EFF7; border-radius: 2px;">
          <v-flex xs12>

          <v-card flat>

            <span class="mx-4 mt-4 mb-3" style="display: block; font-weight: 600; font-size: 14px;">
              Comments (save is working, UI update is not for some reason...)</span>

            <v-divider></v-divider>

            <Comment v-for="c in comments" :key="c.id" :comment="c"></Comment>
          </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from "vuex";
import toast from '@/services/toast'
import Comment from './Comment.vue';

export default {
  components: {Comment},

  data: () => ({
    id: null,
    idea: null,
    tagsById: {},
    comment: null,
    employeeId: 0,
    comments: null,
  }),

  async created(){
    this.employeeId = this.profile.employeeId;
    this.id = +this.$route.params.id;
    const res = await this.$http.get(`api/ideas/${this.id}`);
    this.idea = Object.assign({}, this.idea, res.data);
    const resTag = await this.$http.get(`api/ideaTags`);
    this.tagsById = Object.assign({}, this.tagsById, resTag.data.reduce((obj, curr) => {obj[curr.id] = curr.name; return obj;}, {}));
    this.comments = res.data.ideaComment;
  },

  methods: {
    async like(idea) {
      const currentEmployeeId = this.employeeId;
      const like = idea.ideaLike.filter(l => l.employeeId == currentEmployeeId);
      if (like.length) {
        const res = await axios.delete(this.$backendUrl + `api/Ideas/${idea.id}/like`);
        idea.ideaLike.splice(idea.ideaLike.indexOf(like[0]), 1);
      } else {
        const newLike = {id: 0, ideaId: idea.id, employeeId: currentEmployeeId};
        idea.ideaLike.push(newLike);
        const res = await axios.post(this.$backendUrl + `api/Ideas/${idea.id}/like`);
        newLike.id = res.data.id;
      }
    },
    async enterComment(){
      const comment = {comment: this.comment, ideaId: this.id}
      const res = await this.$http.post(`api/IdeaComments`, comment);
      toast.success(`Your comment has been posted.`)
      this.comments.push(res.data);
      this.comment = null;
    }
  },
  computed: {
    ...mapGetters("user", ["profile"]),
  }
}
</script>

<style lang="scss" scoped>
* {
  // color: #3C88B5;
  font-family: Muli;
}

</style>
