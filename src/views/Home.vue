<template>
  <div class="home">
    <img alt="Evoflare logo" src="../assets/logo.png">
    <Heading msg="Welcome to Evoflare"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Heading from '@/components/Heading.vue' // @ is an alias to /src

@Component({
  components: {
    Heading
  }
})
export default class Home extends Vue {}
</script>
