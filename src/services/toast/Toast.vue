<template>

  <v-snackbar
    :timeout="timeout"
    :color="color"
    :bottom="true"
    :right="true"
    v-model="active"
    class="application"
    @click="dismiss"
    >

    <v-icon
      dark
      left
      v-if="icon.length > 0">
      {{ icon }}
    </v-icon>

    <span style="color: white !important;">
      {{ text }}
    </span>

  </v-snackbar>

</template>


<script>
export default {
  data() {
    return {
      active: false,
      text: '',
      icon: '',
      color: 'info',
      timeout: 5000,
      dismissible: true,
    };
  },
  methods: {
    show(options = {}) {
      if (this.active) {
        this.close();
        this.$nextTick(() => this.show(options));
        return;
      }
      Object.keys(options).forEach(field => (this[field] = options[field]));
      this.active = true;
    },
    close() {
      this.active = false;
    },
    dismiss() {
      if (this.dismissible) {
        this.active = false;
      }
    },
  },
};
</script>
