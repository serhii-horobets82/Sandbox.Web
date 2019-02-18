<template>
  <div class="main">
    <h3>Total {{ list.length }}</h3>
    <table class="main-table">
      <thead>

      </thead>
      <tbody>
        <tr v-for="data in list" :key="data.id">
          <td>{{ data.id }}</td>
          <td :title="data.summary">{{ data.name }}</td>
          <td>
            <table class="levels">
              <tbody>
                <tr>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(1) }" :title="data.competenceLevels[1]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(2) }" :title="data.competenceLevels[2]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(3) }" :title="data.competenceLevels[3]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(4) }" :title="data.competenceLevels[4]"></td>
                  <td :class="{ 'yes': data.competenceLevels.hasOwnProperty(5) }" :title="data.competenceLevels[5]"></td>                  
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Standard',
  props: {
  },
  data() {
    return {
      list: []
    }
  },
  async created(){
    const result = await axios.get('https://localhost:5001/api/values');
    result.data.forEach(r => {
      const levels = {};
      r.competenceLevel.forEach(l => levels[l.level] = l.description);
      r.competenceLevels = levels;
    });
    this.list = result.data;
    console.log("competences", this.list);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
