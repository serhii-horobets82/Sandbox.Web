import Vue from "vue";

// Lib imports
import axios from "axios";
import store from "@/store";

import toast from '@/services/toast'

axios.interceptors.request.use((config: any) => {
  const token = store.getters['auth/authToken'];
  if (token) {
    config.headers.Authorization = `Bearer ${token.authToken}`;
  }
  config.headers._EmployeeId = Vue.prototype.$employee.get().id;
  return config;
}, (err: any) => {
  return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  toast.error(error)
  return Promise.reject(error);
});

Vue.prototype.$http = axios;
