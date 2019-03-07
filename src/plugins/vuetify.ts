import Vue from "vue";
import Vuetify from "vuetify";
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/src/stylus/app.styl";
import theme from "./theme";
import VueAuthenticate from "vue-authenticate";

Vue.use(Vuetify, {
  iconfont: "fa",
  theme
});

Vue.use(VueAuthenticate, {
  tokenName: 'authToken',
  baseUrl: process.env.VUE_APP_ROOT_API,
  providers: {
    github: {
      clientId: '',
    },
    facebook: {
      url: '/api/externalauth/facebook',
      clientId: '416248725777348',
      redirectUri: 'http://localhost:8080/auth/callback'
    }
  }
})


