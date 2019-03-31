import Vue from "vue";
import axios from "axios";
import config from "../config/default.json";

// use global config from file
Vue.prototype.$config = config;

// using .env files
Vue.prototype.$backendUrl = process.env.VUE_APP_ROOT_API || config.api.baseUrl;
Vue.prototype.$appTitle = process.env.VUE_APP_TITLE;

Vue.prototype.$employee = {
  _vm: new Vue({data: {

  }}),
  set(employee: any) {
    sessionStorage.setItem('employee', JSON.stringify(employee));
  },
  get() {
    let data: any = sessionStorage.getItem('employee');
    if (data == null) {
      data = {id: 1, nameTemp: 'John Manager', employeeType: {type: 'MANAGER'}};
      this.set(data);
      return data;
    }
    return JSON.parse(data);
  }
}




// set base url
axios.defaults.baseURL = Vue.prototype.$backendUrl;
