import Vue from "vue";
import VueAuthenticate from "vue-authenticate";

Vue.use(VueAuthenticate, {
  tokenName: "authToken",
  baseUrl: process.env.VUE_APP_ROOT_API,
  providers: {
    github: {
      url: "/api/externalauth/github",
      clientId: "f44f8e1ecfbcc7040436"
    },
    facebook: {
      url: "/api/externalauth/facebook",
      clientId: "416248725777348"
    }
  }
});
