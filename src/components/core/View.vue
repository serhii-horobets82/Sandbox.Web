<template>
  <v-content style="padding-top: 80px !important;">
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
export default {

}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
