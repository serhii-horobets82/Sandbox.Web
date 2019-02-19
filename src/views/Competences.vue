<template>
  <div class="main">
    <section class="error" v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      {{ errorMessage }}
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <section v-else>
        <h3>Total {{ list.length }} competences</h3>
        <table class="main-table">
          <tr v-for="data in list" :key="data.id">
            <td>{{ data.id }}</td>
            <td :title="data.summary">{{ data.name }}</td>
            <td>
              <table class="levels">
                <tbody>
                <tr>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(1) }"
                      :title="data.competenceLevels[1]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(2) }"
                      :title="data.competenceLevels[2]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(3) }"
                      :title="data.competenceLevels[3]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(4) }"
                      :title="data.competenceLevels[4]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(5) }"
                      :title="data.competenceLevels[5]"></td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </section>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Standard',
  data () {
    return {
      list: [],
      loading: true,
      errored: false,
      errorMessage: null
    }
  },
  mounted () {
    axios
      .get('https://evoflareapi.azurewebsites.net/api/competences')
      .then(response => {
        let data = response.data
        data.map(r => {
          const levels = {}
          r.competenceLevel.map((l) => { levels[l.level] = l.description })
          r.competenceLevels = levels
        })
        this.list = data
      })
      .catch(error => {
        console.log(error)
        this.errorMessage = error
        this.errored = true
      })
      .finally(() => (this.loading = false))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .error {

  }

  .main {
    width: 800px;
    margin: 0 auto;
  }
  .main-table {
    width: 100%;
    text-align: left;
  }
  .levels {
    width: 230px;
    td {
      height: 18px;
    }
    .yes {
      background-color: #42b983;
    }

  }
</style>
