import Vue from "vue";
import config from "../config/default.json";

// use global config from file
Vue.prototype.$config = config;

// using .env files
Vue.prototype.$backendUrl = process.env.VUE_APP_ROOT_API || config.api.baseUrl;
Vue.prototype.$appTitle = process.env.VUE_APP_TITLE;
