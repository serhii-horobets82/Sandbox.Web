<template>
  <v-progress-linear :indeterminate="true"></v-progress-linear>
</template>

<script>
    export default {
      mounted: function () {
        this.$store.dispatch("auth/authLogout").then(() => {
          this.$router.push("/");
        });
      }
    }
</script>
