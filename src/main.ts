import Vue from "vue";
import axios from 'axios';

import "./registerServiceWorker";

// Import components
import "./components/index";

// Plugins import
import "./plugins";

// Application imports
import App from "./App.vue";
import i18n from "@/i18n";
import router from "@/router";
import store from "@/store";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");


