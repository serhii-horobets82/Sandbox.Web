<template>
  <v-layout>
    <v-flex>
      <v-layout>
        <v-flex xs12>
          <span class="title">
            <!-- <span class="profileIcon mr-1">
              <v-icon>bug_report</v-icon>
            </span>-->
            Ideas Platform
          </span>
          <v-spacer></v-spacer>
          <!-- <v-btn color="primary" style="color:white !important">+ Create Idea</v-btn> -->
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 class="mr-1 mt-4">
          <v-card flat style="border: 1px solid #E8EFF7">
            <v-layout row wrap>
              <v-flex>
                <v-card flat style="min-height: 62px; line-height: 62px;">
                  <v-tabs  slider-color="#3DB3ED" :height="62" v-model="tabsModel" >
                    <v-tab ripple key="1">
                      My Ideas
                    </v-tab>
                    <v-tab ripple key="2">
                      Most Popular
                    </v-tab>
                    <v-tab ripple key="3">
                      I liked
                    </v-tab>

                    <v-tab-item
                      v-for="(currentTabData, i) in [1,2,3]"
                      :key="i+1">
                      <v-divider></v-divider>
                      <v-card flat class="px-2">
                        <v-layout row>
                          <v-flex xs12>
                            <v-list two-line class="pa-0" >
                              <template v-for="(item, i) in ideasFiltered">
                              <v-list-tile :key="item.id+'-idea'" style="margin: 8px 0px;">
                                <v-list-tile-content>
                                  <v-list-tile-title style="font-size: 14px">
                                    {{ item.name }}
                                  </v-list-tile-title>
                                  <v-list-tile-sub-title style="line-height: 34px;">
                                    <span @click="like(item)" style="cursor: pointer;">
                                      <svg style="margin-bottom: -1px" width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.06269 12C19.7927 4.75072 12.4559 -3.67174 7.06269 1.70393C1.66951 -3.67174 -5.68483 4.75072 7.06269 12Z" fill="#ED3D3D"/>
                                      </svg>
                                      <span style="color: #ED3D3D; font-size: 12px;" class="ml-1 mr-3">
                                        {{item.ideaLike.length}}
                                      </span>
                                    </span>

                                    <span>
                                      <svg style="margin-bottom: -1px" width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.1509 0.0139918C10.092 0.00839506 10.033 0.00279835 9.97127 0C9.11783 0.00279835 8.2644 0.00373109 7.41096 0.00279831C7.1948 0.00279831 6.00168 0.00279835 4.64292 0C4.292 0.0167901 4.03653 0.0363786 3.9467 0.0531687C1.36674 0.503703 -0.376621 3.03341 0.0697479 5.6107C0.488043 8.03127 2.44196 9.6851 4.90681 9.69909C5.57215 9.70189 6.23749 9.69069 6.90283 9.70748C7.05858 9.71272 7.20917 9.76439 7.33517 9.8558C8.02016 10.3875 8.68831 10.9444 9.3733 11.476C9.60912 11.6579 9.8702 11.823 10.1425 11.9294C10.6506 12.1253 11.083 11.9042 11.2598 11.3837C11.3245 11.1919 11.3632 10.9924 11.3749 10.7904C11.3946 10.4071 11.3974 10.0209 11.3834 9.63473C11.3749 9.42765 11.4367 9.31571 11.6304 9.21777C13.5254 8.25514 14.5192 6.47259 14.3563 4.35983C14.1823 2.12675 12.3805 0.22107 10.1509 0.0139918Z" fill="#C1D9E8"/>
                                      </svg>
                                      <span style="color: #C1D9E8; font-size: 12px;" class="ml-1 mr-2">
                                        {{item.ideaComment.length}}
                                      </span>
                                    </span>
                                    <span class="mr-2" style="display:inline-block;height: 4px; width: 4px;border: 2px solid #C1D9E8;margin-bottom:3px;border-radius: 4px;"></span>
                                    <span class="mr-2" style="font-size: 12px; color:#3C88B5">
                                      {{item.createdDate | formatDateHuman}}
                                    </span>
                                    <span class="mr-2" style="display:inline-block;height: 4px; width: 4px;border: 2px solid #C1D9E8;margin-bottom:3px;border-radius: 4px;"></span>


                                    <span style="font-size: 12px; color: #3DB3ED; display:inline-block; background: #EFF9FD;line-height: 14px; padding: 5px 10px; border-radius: 18px;">
                                      ${{item.price || ' ---'}}
                                    </span>
                                  </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                  <router-link style="line-height: 0;"
                                    :to="{name: 'ideas-platform-view', params: {id: item.id}}"
                                  >
                                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="19.5" cy="19.5" r="18.5" fill="white" stroke="#E8EFF7"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6039 25.7699C20.6039 25.7699 25.7399 20.628 25.7821 20.5848C26.0726 20.2922 26.0726 19.727 25.7821 19.4344L20.6039 14.2195C20.3133 13.9268 19.8414 13.9268 19.5518 14.2195C19.2612 14.5117 19.2612 14.9863 19.5518 15.2791L23.49 19.2454H14.8393C14.428 19.2454 14.0952 19.5807 14.0952 19.9947C14.0952 20.4085 14.428 20.744 14.8393 20.744H23.49L19.5518 24.7103C19.2612 25.003 19.2612 25.4771 19.5518 25.7699C19.8416 26.0626 20.3133 26.0626 20.6039 25.7699Z" fill="#3C88B5"/>
                                    <path d="M20.6039 25.7699C20.6039 25.7699 25.7399 20.628 25.7821 20.5848C26.0726 20.2922 26.0726 19.727 25.7821 19.4344L20.6039 14.2195C20.3133 13.9268 19.8414 13.9268 19.5518 14.2195C19.2612 14.5117 19.2612 14.9863 19.5518 15.2791L23.49 19.2454H14.8393C14.428 19.2454 14.0952 19.5807 14.0952 19.9947C14.0952 20.4085 14.428 20.744 14.8393 20.744H23.49L19.5518 24.7103C19.2612 25.003 19.2612 25.4771 19.5518 25.7699C19.8416 26.0626 20.3133 26.0626 20.6039 25.7699" stroke="white" stroke-width="0.5"/>
                                  </svg>

                                  </router-link>
                                </v-list-tile-action>
                              </v-list-tile>
                              <v-divider v-if="i < currentTabData.length -1" style="border-color: #E8EFF7"></v-divider>
                              </template>

                            </v-list>
                          </v-flex>

                        </v-layout>
                            <v-divider></v-divider>
                        <v-layout row wrap>
                          <v-flex class="text-xs-center" style="line-height: 40px;">
                            <router-link style=" color: #3DB3ED !important; text-decoration: none;" :to="{name: 'ideas-platform-list'}">Show All</router-link>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>

                </v-card>

                <v-divider style="border-color:#E8EFF7"></v-divider>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs6 class="mr-1 mt-4">
          <v-card flat style="border: 1px solid #E8EFF7">
            <v-layout row wrap align-center>
              <v-flex>
                <v-card flat style="min-height: 62px; line-height: 62px;">
                  <v-card-title class="py-0 mx-2">
                    Company strategy
                    <v-spacer></v-spacer>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8.5" cy="8.5" r="8.5" fill="#E8EFF7"/>
                      <path d="M7.76562 10.8848C7.76172 10.7441 7.75977 10.6387 7.75977 10.5684C7.75977 10.1543 7.81836 9.79688 7.93555 9.49609C8.02148 9.26953 8.16016 9.04102 8.35156 8.81055C8.49219 8.64258 8.74414 8.39844 9.10742 8.07812C9.47461 7.75391 9.71289 7.49609 9.82227 7.30469C9.93164 7.11328 9.98633 6.9043 9.98633 6.67773C9.98633 6.26758 9.82617 5.9082 9.50586 5.59961C9.18555 5.28711 8.79297 5.13086 8.32812 5.13086C7.87891 5.13086 7.50391 5.27148 7.20312 5.55273C6.90234 5.83398 6.70508 6.27344 6.61133 6.87109L5.52734 6.74219C5.625 5.94141 5.91406 5.32812 6.39453 4.90234C6.87891 4.47656 7.51758 4.26367 8.31055 4.26367C9.15039 4.26367 9.82031 4.49219 10.3203 4.94922C10.8203 5.40625 11.0703 5.95898 11.0703 6.60742C11.0703 6.98242 10.9824 7.32812 10.8066 7.64453C10.6309 7.96094 10.2871 8.3457 9.77539 8.79883C9.43164 9.10352 9.20703 9.32812 9.10156 9.47266C8.99609 9.61719 8.91797 9.7832 8.86719 9.9707C8.81641 10.1582 8.78711 10.4629 8.7793 10.8848H7.76562ZM7.70117 13V11.7988H8.90234V13H7.70117Z" fill="#3C88B5"/>
                    </svg>
                  </v-card-title>
                </v-card>

                <v-divider style="border-color:#E8EFF7"></v-divider>
                <v-list two-line class="py-0 px-2">
                  <template v-for="(strategy, i) in companyStrategy">
                    <v-list-tile style="padding-top: 5px; padding-bottom: 5px" :key="strategy.id">
                      <v-list-tile-avatar size="54" class="mr-2">
                        <div v-if="i == 0"
                          style="height: 100%; width: 100%; line-height: 54px;
                            color: #3DB3ED; background-color: rgba(61,179,237, 0.2);
                            font-size: 20px; font-weight: bold">
                        {{strategy.number}}
                        </div>
                        <div v-if="i == 1"
                          style="height: 100%; width: 100%; line-height: 54px;
                            color: #FFB800; background-color: rgba(255,184,0, 0.2);
                            font-size: 20px; font-weight: bold">
                        {{strategy.number}}
                        </div>
                        <div v-if="i == 2"
                          style="height: 100%; width: 100%; line-height: 54px;
                            color: #939ED7; background-color: rgba(147,158,215, 0.2);
                            font-size: 20px; font-weight: bold">
                        {{strategy.number}}
                        </div>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title style="font-size: 14px;">
                          {{strategy.text}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-divider v-if="i < companyStrategy.length -1"
                      style="border-color: #E8EFF7;"
                      class="mx-3"></v-divider>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
                            <v-divider></v-divider>
                        <v-layout row wrap>
                          <v-flex class="text-xs-center" style="line-height: 40px; color: #3DB3ED">
                            + Create Idea
                          </v-flex>
                        </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    tabsModel: null,
    tab: null,
    ideasTab: null,
    ideas: null,
    companyStrategy: [
      {id: 1, text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.', number: 201},
      {id: 2, text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.', number: 66},
      {id: 3, text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.', number: 34},
    ]
  }),

  async created(){
    const res = await axios.get(this.$backendUrl + `api/ideas`);
    this.ideas = res.data;
    // const resTags = await axios.get(this.$backendUrl + `api/ideaTags`);
    // const byId = resTags.data.reduce((obj, curr) => {obj[curr.id] = curr.name; return obj;}, {})
    // this.tagsById = Object.assign({}, this.tagsById, byId);
  },

  methods: {
    async like(idea) {
      const currentEmployeeId = 2;
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
    add(id) {

    },
    async save(){

    },
  },

  computed: {
    ideasFiltered() {
      const currentEmployeeId = 2;
      if (this.ideas == null) return [];
      switch(this.tabsModel){
        case 0:
          return this.ideas.filter(i => i.createdById == currentEmployeeId);
        case 1:
          return this.ideas;
        case 2:
          return this.ideas.filter(i => i.ideaLike.some(l => l.employeeId == currentEmployeeId));
        default:
          return this.ideas;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: Muli;
}

</style>
