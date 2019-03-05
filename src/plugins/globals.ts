import Vue from "vue";

// using .env files
Vue.prototype.$backendUrl = process.env.VUE_APP_ROOT_API || "https://evoflareapi.azurewebsites.net/";
Vue.prototype.$appTitle = process.env.VUE_APP_TITLE;

Vue.prototype.$supportedLangs = ["en", "ru", "ua"];
