<template>
  <v-container class="px-0">
    <v-layout row wrap class="mb-3">
      <span class="title font-weight-bold">Ideas Platform</span>
    </v-layout>

    <!-- <v-container grid-list-xl class="pa-0 ma-0"> -->

    <v-layout row wrap>
      <v-flex xs6  style="padding-right: 25px;">
        <v-tabs
          class="tabs"
          v-model="tabsModel"
          color="rgb(245, 249, 252)"
          slider-color="#3DB3ED"
        >
          <v-tab class="active-class" v-for="(tab, i) in tabs" :key="i">
            {{ tab.name }}
          </v-tab>
        </v-tabs>

        <v-card v-for="i in 10" :key="i"
          class="mt-3 pa-4"
          flat
          style="border: 1px solid #E8EFF7;border-radius: 2px;">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card flat>
                <v-card-title class="pa-0">
                  <span class="mr-5" style="font-size: 13px;">{{ idea.createdBy }}</span>
                  <span style="font-size: 13px; opacity: 0.5;">{{ idea.createdDate }}</span>
                  <v-spacer></v-spacer>
                  <span style="font-size: 12px; color: #3DB3ED !important; display:inline-block; background: #EFF9FD;line-height: 14px; padding: 5px 10px; border-radius: 18px;">
                    ${{idea.price}}
                  </span>
                </v-card-title>
              </v-card>
            </v-flex>

            <v-flex xs12 class="mt-2 mb-2">
              <span style="font-size: 18px; font-weight: bold;">{{idea.name}}</span>
            </v-flex>

            <v-flex xs12>
              <span v-for="(tag, i) in idea.tags" :key="i"
                class=" px-3 mr-2"
                style="display: inline-block; background: #EFF6FD; border-radius: 2px; font-size: 12px; height: 22px; line-height: 22px">
                {{tag}}
              </span>
            </v-flex>

            <v-flex xs12 class="mt-3">
              <v-card flat >
                <v-card-title class="pa-0">

              <span class="pr-3" style="color: #ED3D3D !important; display: inline-block; ">
                <!-- <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.593 17.4707C27.5664 7.805 17.7839 -3.42495 10.593 3.74261C3.40212 -3.42495 -6.40367 7.805 10.593 17.4707Z" stroke="#ED3D3D"/>
                </svg> -->
                <svg class="mr-1" style="margin-bottom: -3px;" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.59303 16.4707C26.5664 6.805 16.7839 -4.42495 9.59303 2.74261C2.40212 -4.42495 -7.40367 6.805 9.59303 16.4707Z" fill="#ED3D3D"/>
                </svg>
                {{ idea.likes }}
              </span>

              <span class="pr-3">
                <svg class="mr-1" style="margin-bottom: -3px;" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5346 0.489359C13.456 0.481897 13.3774 0.474434 13.295 0.470703C12.1571 0.474434 11.0192 0.475678 9.88129 0.474434C9.59307 0.474434 8.00223 0.474434 6.19056 0.470703C5.72267 0.49309 5.38204 0.519208 5.26226 0.541595C1.82232 1.14231 -0.502161 4.51525 0.0929972 7.95163C0.650724 11.1791 3.25594 13.3842 6.54241 13.4028C7.42953 13.4066 8.31666 13.3916 9.20378 13.414C9.41144 13.421 9.61223 13.4899 9.78022 13.6118C10.6935 14.3207 11.5844 15.0632 12.4977 15.7721C12.8122 16.0146 13.1603 16.2348 13.5234 16.3765C14.2009 16.6377 14.7773 16.343 15.0131 15.649C15.0994 15.3933 15.151 15.1273 15.1666 14.858C15.1928 14.3468 15.1965 13.8319 15.1778 13.317C15.1666 13.0409 15.2489 12.8917 15.5072 12.7611C18.0338 11.4776 19.3589 9.10082 19.1418 6.28381C18.9097 3.30637 16.5074 0.765463 13.5346 0.489359Z" fill="#D8E3EE"/>
                </svg>
                {{ idea.comments }}
              </span>

              <span>
                <svg class="mr-1" style="margin-bottom: -3px;" width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.678 15C19.482 15 25.1337 8.35669 25.1337 8.35669C25.5757 7.88355 25.5882 7.10206 25.1476 6.62498C25.1476 6.62498 19.7753 0 12.7367 0C5.69802 0 0.325677 6.62498 0.325677 6.62498C-0.108673 7.10824 -0.110974 7.89267 0.333291 8.36401C0.333291 8.36401 5.87399 15 12.678 15ZM12.7367 12.7941C15.6522 12.7941 18.0156 10.4239 18.0156 7.5C18.0156 4.57614 15.6522 2.20588 12.7367 2.20588C9.82116 2.20588 7.45768 4.57614 7.45768 7.5C7.45768 10.4239 9.82116 12.7941 12.7367 12.7941ZM12.7367 9.85294C14.0324 9.85294 15.0829 8.79949 15.0829 7.5C15.0829 6.20051 14.0324 5.14706 12.7367 5.14706C11.4409 5.14706 10.3904 6.20051 10.3904 7.5C10.3904 8.79949 11.4409 9.85294 12.7367 9.85294Z" fill="#D8E3EE"/>
                </svg>
                {{ idea.views }}
              </span>

              <v-spacer></v-spacer>
              <v-btn class="ma-0" flat small style="border: 1px solid #E8EFF7; border-radius: 70px; color: #ABC1CF !important; font-size: 12px;">
                <svg class="mr-2" width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5555 0L18.6666 5.55556L11.5555 11.1111V8.22221C11.1772 8.20444 4.58286 7.99256 0 12C1.834 6.34947 7.59417 3.89173 11.5555 2.88889V0Z" fill="#D8E3EE"/>
                </svg>
                Share
              </v-btn>
                </v-card-title>
              </v-card>


            </v-flex>
          </v-layout>

        </v-card>
      </v-flex>

      <v-flex xs6>
        <v-card flat style="border: 1px solid #E8EFF7;border-radius: 2px;">

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
                    color: #3DB3ED !important; background-color: rgba(61,179,237, 0.2);
                    font-size: 20px; font-weight: bold">
                {{strategy.number}}
                </div>
                <div v-if="i == 1"
                  style="height: 100%; width: 100%; line-height: 54px;
                    color: #FFB800 !important; background-color: rgba(255,184,0, 0.2);
                    font-size: 20px; font-weight: bold">
                {{strategy.number}}
                </div>
                <div v-if="i == 2"
                  style="height: 100%; width: 100%; line-height: 54px;
                    color: #939ED7 !important; background-color: rgba(147,158,215, 0.2);
                    font-size: 20px; font-weight: bold">
                {{strategy.number}}
                </div>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title style="font-size: 14px;">
                  {{strategy.text}}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19.5" cy="19.5" r="18.5" fill="white" stroke="#E8EFF7"/>
                <path d="M13 19.482H25.9636" stroke="#3C88B5" stroke-linecap="round"/>
                <path d="M19.4817 13V25.9636" stroke="#3C88B5" stroke-linecap="round"/>
                </svg>

              </v-list-tile-action>
            </v-list-tile>

            <v-divider v-if="i < companyStrategy.length -1" :key="i"
              style="border-color: #E8EFF7;"
              class="mx-3"></v-divider>
          </template>
        </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- </v-container> -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tabsModel: null,
    tabs: [
      {name: 'All'},
      {name: 'My Ideas'},
      {name: 'Recently Added'},
      {name: 'Most Popular'},
      {name: 'I Liked'},
    ],
    idea: {
        id: 1,
        name: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing',
        createdBy: 'Oleksandr Storokha',
        createdDate: '23 May, 2019',
        price: 4000,
        tags: ['office', 'lunch', 'business'],
        likes: 59, comments: 11, views: 30
      },
    ideas: [

    ],
    companyStrategy: [
      {id: 1, text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.', number: 201},
      {id: 2, text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.', number: 66},
      {id: 3, text: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.', number: 34},
    ],
    items: [
      { title: "Notifications", url: "personal-notifications" },
      { title: "Profile", url: "personal-profile" },
      { title: "I Evaluate", url: "personal-i-evaluate" },
      {
        title: "Suggestions to improve",
        url: "personal-suggestions-to-improve"
      },
      { title: "PDP", url: "personal-pdp" }
      // {title: 'Notifications', url: ''},
    ]
  }),
  created() {
    if (this.$router.currentRoute.name == "personal") {
      this.$router.push({ name: "personal-profile" });
      // this.$router.push({name: 'personal-notifications'});
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  color: #3C88B5 !important;
  font-family: Muli;
}
.v-tabs__container .v-tabs__item {
  text-transform: none !important;
}

.active-tab {
  color: #3DB3ED !important;
}
</style>

