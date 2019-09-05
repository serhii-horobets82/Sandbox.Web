import Vue from "vue";

// Lib imports
import axios from "axios";
import store from "@/store";
import { EventBus } from "@/event-bus";
import { EVENTS } from "@/constants";

import toast from "@/services/toast";

axios.interceptors.request.use(
  (config: any) => {
    const token = store.getters["auth/authToken"];

    if (token) {
      config.headers.Authorization = `Bearer ${token.authToken}`;
    }

    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status) {
      toast.error("Session expired");
      EventBus.$emit(EVENTS.REDIRECT_TO_LOGIN);
      return Promise.reject(error);
    } else {
      toast.error(error);
      return Promise.reject(error);
    }
  }
);

Vue.prototype.$http = axios;
