<template>
  <v-container >
    <v-layout row wrap class="mb-3">
      <span class="title font-weight-bold" style="line-height: 48px !important;">Create New Idea</span>
      <v-spacer></v-spacer>
      <v-btn style="background: #3C88B5; border-radius: 60px; color: white; padding: 0 32px" class="mr-3">Post Idea</v-btn>
      <svg style="margin-top: 3px;" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 43C33.598 43 43 33.598 43 22C43 10.402 33.598 1 22 1C10.402 1 1 10.402 1 22C1 33.598 10.402 43 22 43Z" stroke="#DEE7F2"/>
      <path d="M24.0369 26.927V18.5422C24.0369 18.1727 23.7374 17.8732 23.3679 17.8732C22.9983 17.8732 22.6988 18.1727 22.6988 18.5422V26.927C22.6988 27.2967 22.9983 27.596 23.3679 27.596C23.7374 27.596 24.0369 27.2967 24.0369 26.927ZM20.9881 26.927V18.5422C20.9881 18.1727 20.6887 17.8732 20.3191 17.8732C19.9496 17.8732 19.6501 18.1727 19.6501 18.5422V26.927C19.6501 27.2967 19.9496 27.596 20.3191 27.596C20.6887 27.596 20.9881 27.2967 20.9881 26.927ZM27.033 17.8732C26.6634 17.8732 26.3639 18.1727 26.3639 18.5422V28.6693C26.3639 28.9407 26.1434 29.162 25.8722 29.162H17.8157C17.544 29.162 17.323 28.9407 17.323 28.6693V18.5422C17.323 18.1727 17.0235 17.8732 16.654 17.8732C16.2845 17.8732 15.985 18.1727 15.985 18.5422V28.6693C15.985 29.6784 16.8063 30.5 17.8157 30.5H25.872C26.8809 30.5 27.7018 29.6784 27.7018 28.6693V18.5422C27.702 18.1724 27.4025 17.8732 27.033 17.8732ZM28.5182 15.7887H25.4893V14.169C25.4893 13.7995 25.1898 13.5 24.8203 13.5H18.8669C18.4974 13.5 18.1979 13.7995 18.1979 14.169V15.7887H15.169C14.7995 15.7887 14.5 16.0882 14.5 16.4577C14.5 16.8273 14.7995 17.1268 15.169 17.1268H28.5182C28.8877 17.1268 29.1872 16.8273 29.1872 16.4577C29.1872 16.0882 28.8877 15.7887 28.5182 15.7887ZM24.1513 15.7887H19.5359V14.838H24.151V15.7887H24.1513Z" fill="#3C88B5"/>
      </svg>
    </v-layout>

    <v-divider></v-divider>

    <v-layout row wrap class="mt-4" style="margin: 0 168px">
      <v-flex xs12>
        <v-select
          :items="[]"
          label="Standard"
          outline
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          label="Title"
          v-model="idea.name"
          outline
          hide-details
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="idea.description"
          outline
          hide-details
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import toast from '@/services/toast'

export default {
  data: () => ({
    id: null,
    idea: null,
  }),

  async created(){
    this.id = +this.$route.params.id;
    if (this.id === 0) {
      this.idea = {
        name: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing',
        description: `New York (CNN Business)America's business leaders are growing more worried that the United States will enter a recession by the end of 2020. Their primary fear: protectionist trade policy.

That is the topline finding of a report released Monday by the National Association for Business Economics. The survey, based on responses by 53 economists, is a leading barometer of where the US business community thinks the economy is headed.
"Increased trade protectionism is considered the primary downwide risk to growth by a majority of the respondents," Gregory Daco, chief US economist for Oxford Economics, said in a statement. The report found what it called a "surge" in recession fears among the economists.
The report comes as the United States ratchets up its trade war with China and has gone after other major trading partners, including Mexico and India.
The risk of recession happening soon remains low but will "rise rapidly" next year. The survey's respondents said the risk of recession starting in 2019 is only 15% but 60% by the end of 2020. About a third of respondents forecast a recession will begin halfway through next year.
According to the survey, the median forecast for gross domestic product growth in the last quarter of 2020 was 1.9%. That would be a big drop from the most recent estimate of current US economic growth — 3.1% in the first three months of 2019.
The United States is probably somewhere in the last stages of an epic run of economic growth that began in 2009. Dramatic and coordinated responses by the Federal Reserve, Congress and the Obama administration helped pull the country up from the Great Recession.`
      };
    } else {
      const res = await axios.get(this.$backendUrl + `api/idea/${this.id}`);
      this.idea = res.data;
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
.v-text-field--outline > .v-input__control > .v-input__slot {
  border: 1px solid #E8EFF7;
  background-color: white !important;
}
</style>
