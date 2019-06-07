import Vue from "vue";
import axios from "axios";
import config from "../config/default.json";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

// use global config from file
Vue.prototype.$config = config;

// using .env files
Vue.prototype.$backendUrl = process.env.VUE_APP_ROOT_API || config.api.baseUrl;
Vue.prototype.$appTitle = process.env.VUE_APP_TITLE;

Vue.prototype.$employee = {
  _vm: new Vue({ data: {} }),
  set(employee: any) {
    sessionStorage.setItem("employee", JSON.stringify(employee));
  },
  get() {
    let data: any = sessionStorage.getItem("employee");
    if (data == null) {
      data = { id: 1, nameTemp: "John Manager", employeeType: { type: "MANAGER" } };
      this.set(data);
      return data;
    }
    return JSON.parse(data);
  }
};

Vue.prototype.$chatManager = {
  _manager: new ChatManager({
    instanceLocator: "v1:us1:4d442e23-a1b2-4ea1-9f4f-9ed558e9e367",
    userId: "admin@evoflare.com",
    tokenProvider: new TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4d442e23-a1b2-4ea1-9f4f-9ed558e9e367/token"
    })
  }),
  get() {
    return this._manager;
  }
};

// set base url
axios.defaults.baseURL = Vue.prototype.$backendUrl;
