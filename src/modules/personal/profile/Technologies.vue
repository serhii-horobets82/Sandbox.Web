<template>
  <v-layout row wrap>
    <v-flex>
      <v-layout>
        <v-flex>
          <span class="title">
            <span class="profileIcon mr-1">
              <v-icon>bug_report</v-icon>
            </span>
            My Skills
          </span>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-2">
        <v-flex>
          <v-chip color="white" label>
            <v-avatar>
              JS
            </v-avatar>
            Javascript
          </v-chip>
          <v-chip outline label>
            <v-avatar>JS</v-avatar>
            Javascript
          </v-chip>
          <v-chip outline label>
            <v-avatar>JS</v-avatar>
            Javascript
          </v-chip>
          <v-chip outline label>
            <v-avatar>JS</v-avatar>
            Javascript
          </v-chip>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

}
</script>

<style scope>
.v-chip {
  height: 45px !important;
  min-width: 160px;
}
</style>
