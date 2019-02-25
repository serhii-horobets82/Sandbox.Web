import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$backendUrl = 'https://evoflareapi.azurewebsites.net/'
// Vue.prototype.$backendUrl = 'http://localhost:63332/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
