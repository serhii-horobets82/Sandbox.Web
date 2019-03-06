<template>
  <v-layout row wrap class="competenceRow">
    <v-flex xs6>{{competence.id}}  {{competence.name}}</v-flex>
    <v-flex xs6>
      <div v-for="i in [1,2,3,4,5]" :key="i"
        class="competenceLevelFill"
        :class="{
          'none': !competence.levels[i],
          'current': competence.levels[i] && competence.levels[i].level === competence.competenceLevel,
          'available': competence.levels[i] && competence.levels[i].level !== competence.competenceLevel,
          'roleDesired': i == competence.roleLevel
        }">

      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["competence", "competenceLevels"],

}
</script>

<style scoped lang="scss">
  .competenceRow {
    font-size: 16px;
    margin: 5px;
  }

  .competenceLevelFill {
    width: 22px;
    height: 22px;
    margin: 1px;
    float:left;

    &.none {
      background-color: lightblue;
    }

    &.available {
      background-color: lightgreen;
      cursor: pointer;
    }

    &.current {
      background-color: green;
      cursor: pointer;
    }

    &.roleDesired {
      border-color: green;
      border-style: solid;
      border-width: 2px;
      padding: 2px;
      background-clip: content-box;
    }
  }
</style>
