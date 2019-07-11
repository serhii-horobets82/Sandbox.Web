<template>
  <v-container >
    <!-- <v-layout row wrap class="mb-3">
      <span class="title font-weight-bold" style="line-height: 48px !important;">Create New Idea</span>

    </v-layout> -->

    <v-layout row wrap class="mt-4" style="margin: 0 168px">
      <v-flex xs12>
        <v-layout row wrap>
          <div>Strategy: {{ idea.strategy }}</div>
          <div class="mt-1" style="font-weight: 600; font-size: 18px;">{{ idea.name }}</div>
        </v-layout>
        <v-layout row wrap class="mt-4 mb-3">
          <span v-for="(tag, i) in idea.tags" :key="i"
            class=" px-3 mr-2"
            style="display: inline-block; background: #EFF6FD; border-radius: 2px; font-size: 12px; height: 22px; line-height: 22px">
            {{ tag }}
          </span>
          <v-spacer></v-spacer>
          <span style="font-size: 12px; color: #3DB3ED !important; display:inline-block; background: #EFF9FD;line-height: 14px; padding: 5px 10px; border-radius: 18px;">
            ${{idea.price}}
          </span>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap class="mt-2">
          <v-list style="background: #F7FBFF;">
            <v-list-tile avatar>
              <v-list-tile-avatar color="rgb(181,214,236, 0.5)">
                <span class="headline" style="color: #A2C4DA;">
                  {{ idea.createdBy[0] }}
                </span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title style="font-size: 14px; font-weight: bold">By {{ idea.createdBy }}</v-list-tile-title>
                <v-list-tile-sub-title style="font-size: 13px;color: #3C88B5;">{{ idea.createdDate }}</v-list-tile-sub-title>
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
            {{ idea.comments.length }}
          </span>

          <span>
            <svg class="mr-1" style="margin-bottom: -3px;" width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.678 15C19.482 15 25.1337 8.35669 25.1337 8.35669C25.5757 7.88355 25.5882 7.10206 25.1476 6.62498C25.1476 6.62498 19.7753 0 12.7367 0C5.69802 0 0.325677 6.62498 0.325677 6.62498C-0.108673 7.10824 -0.110974 7.89267 0.333291 8.36401C0.333291 8.36401 5.87399 15 12.678 15ZM12.7367 12.7941C15.6522 12.7941 18.0156 10.4239 18.0156 7.5C18.0156 4.57614 15.6522 2.20588 12.7367 2.20588C9.82116 2.20588 7.45768 4.57614 7.45768 7.5C7.45768 10.4239 9.82116 12.7941 12.7367 12.7941ZM12.7367 9.85294C14.0324 9.85294 15.0829 8.79949 15.0829 7.5C15.0829 6.20051 14.0324 5.14706 12.7367 5.14706C11.4409 5.14706 10.3904 6.20051 10.3904 7.5C10.3904 8.79949 11.4409 9.85294 12.7367 9.85294Z" fill="#D8E3EE"/>
            </svg>
            {{ idea.views }}
          </span>
        </v-layout>

        <v-layout row wrap class="mb-3">
          <v-text-field style="border: 1px solid #E8EFF7; background-color: white !important;"
            outline
            hide-details
            placeholder="Type your comment here..."
          ></v-text-field>
        </v-layout>

        <v-layout row wrap style="background-color: white !important; border: 1px solid #E8EFF7; border-radius: 2px;">
          <v-card flat>

            <span class="mx-4 mt-4 mb-3" style="display: block; font-weight: 600; font-size: 14px;">Comments</span>

            <v-divider></v-divider>

            <Comment v-for="c in idea.comments" :key="c.id" :comment="c"></Comment>
          </v-card>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import toast from '@/services/toast'
import Comment from './Comment.vue';

export default {
  components: {Comment},
  data: () => ({
    id: null,
    idea: null,
  }),

  async created(){
    this.idea = {
      strategy: 'AALorem ipsum is placeholder text commonly used in the graphic, print, and publishing.',
      name: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing',
      description: `New York (CNN Business)America's business leaders are growing more worried that the United States will enter a recession by the end of 2020. Their primary fear: protectionist trade policy.

That is the topline finding of a report released Monday by the National Association for Business Economics. The survey, based on responses by 53 economists, is a leading barometer of where the US business community thinks the economy is headed.
"Increased trade protectionism is considered the primary downwide risk to growth by a majority of the respondents," Gregory Daco, chief US economist for Oxford Economics, said in a statement. The report found what it called a "surge" in recession fears among the economists.
The report comes as the United States ratchets up its trade war with China and has gone after other major trading partners, including Mexico and India.
The risk of recession happening soon remains low but will "rise rapidly" next year. The survey's respondents said the risk of recession starting in 2019 is only 15% but 60% by the end of 2020. About a third of respondents forecast a recession will begin halfway through next year.
According to the survey, the median forecast for gross domestic product growth in the last quarter of 2020 was 1.9%. That would be a big drop from the most recent estimate of current US economic growth — 3.1% in the first three months of 2019.
The United States is probably somewhere in the last stages of an epic run of economic growth that began in 2009. Dramatic and coordinated responses by the Federal Reserve, Congress and the Obama administration helped pull the country up from the Great Recession.`,
      tags: ['office', 'lunch', 'business'],
      price: 4000,
      createdBy: 'Oleksandr Storokha',
      createdDate: '23 May, 2019',
      likes: 46,
      views: 30,
      comments: [
        {
          id: 1,
          comment: `New York (CNN Business)America's business leaders are growing more worried that the United States will enter a recession by the end of 2020. Their primary fear: protectionist trade policy.`,
          createdBy: 'Oleksandr Storokha',
          createdDate: '04.09.2018',
          comments: [
            {
              id: 2,
              comment: `Yep :)`,
              createdBy: 'Oleksandr Storokha',
              createdDate: '04.09.2018',
            }
          ]
        },
        {
          id: 3,
          comment: `Their primary fear: protectionist trade policy.`,
          createdBy: 'Oleksandr Storokha',
          createdDate: '04.09.2018',
        }
      ],
    }

  },

  methods: {
    add(id) {

    },
    async save(){
      if (this.id === 0) {
        const res = await axios.post(this.$backendUrl + `api/idea`, this.idea);
      } else {
        const res = await axios.put(this.$backendUrl + `api/idea/${this.id}`, this.idea);
      }
      toast.success(`Idea has been ${this.id === 0 ? 'created': 'saved'}.`)
      this.$router.push({name: 'ideas-platform'})
    },
  }
}
</script>

<style lang="scss" scoped>
* {
  // color: #3C88B5;
  font-family: Muli;
}

</style>
