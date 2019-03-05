import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import './registerServiceWorker'
import moment from 'moment'

Vue.config.productionTip = false

// using .env files
Vue.prototype.$backendUrl = process.env.VUE_APP_ROOT_API;
Vue.prototype.$http = axios;

Vue.filter('formatDate', (value: any) => {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
