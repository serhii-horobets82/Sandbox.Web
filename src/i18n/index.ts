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

const numberFormats = {
  'en': {
    currency: {
      style: 'currency', currency: 'USD', useGrouping: true, minimumFractionDigits : 0
    }
  },
  'ua': {
    currency: {
      style: 'currency', currency: 'UAH', currencyDisplay: 'symbol'
    }
  },
  'ja': {
    currency: {
      style: 'currency', currency: 'JPY', currencyDisplay: 'symbol'
    }
  }
}

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  numberFormats,
  fallbackLocale: "en",
  messages
});

export default i18n;
