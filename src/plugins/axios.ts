import Vue from "vue";

// Lib imports
import axios from "axios";
import store from "@/store";

axios.interceptors.request.use((config: any) => {
  const token = store.getters['auth/authToken'];
  if (token) {
    config.headers.Authorization = `Bearer ${token.authToken}`;
  }
  return config;
}, (err: any) => {
  return Promise.reject(err);
});

Vue.prototype.$http = axios;
