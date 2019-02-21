<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="../assets/logo.png" alt="" width="136" height="26">
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/competences">Competences</router-link>
        |
        <router-link to="/about">About</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav.vue',
};
</script>

<style scoped>

</style>
