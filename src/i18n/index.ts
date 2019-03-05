/**
 * Vue i18n
 *
 * @library
 *
 * http://kazupon.github.io/vue-i18n/
 */

// Lib imports
import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "@/i18n/lang";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages
});

export default i18n;
