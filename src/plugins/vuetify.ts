import Vue from "vue";
import Vuetify from "vuetify";
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/src/stylus/app.styl";
import "../styles/default.styl";
import theme from "./theme";

Vue.use(Vuetify, {
  theme,
  options: {
    customProperties: true
  },
  iconfont: "fa"
});

