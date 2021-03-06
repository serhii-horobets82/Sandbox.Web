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
    const serverId = localStorage.getItem("x-server-id");
    if (serverId) {
      config.headers["X-Server-ID"] = serverId;
    }
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
    const { status, data } = error.response;
    if (401 === status) {
      toast.error("Session expired");
      EventBus.$emit(EVENTS.REDIRECT_TO_LOGIN);
    } else {
      if (data && data.object === "error") {
        toast.error(data.message);
      } else toast.error(error);
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios;
