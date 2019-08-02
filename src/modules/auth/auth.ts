import { Credentials } from "@/models/credentials.interface";
import { Token } from "@/models/token.interface";
import { authService } from "@/services/auth.service";
import { EventBus } from "@/event-bus";
import { EVENTS } from "@/constants";

const state = {
  token: { authToken: localStorage.getItem("auth-token") } || {},
  status: ""
};

const getters = {
  isAuthenticated: (authState: any) => !!authState.token.authToken,
  authStatus: (authState: any) => authState.status,
  authToken: (authState: any) => authState.token
};

const actions = {
  authRequest: ({ commit }: { commit: any }, credentials: Credentials) => {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      authService.login(credentials).subscribe(
        (result: Token) => {
          localStorage.setItem("auth-token", result.authToken); // stash the auth token in localStorage
          commit("authSuccess", result);
          EventBus.$emit(EVENTS.LOGGED_IN);
          resolve(result);
        },
        (errors: any) => {
          commit("authError", errors);
          localStorage.removeItem("auth-token");
          reject(errors);
        }
      );
    });
  },
  OAuthRequest: ({ commit, dispatch }: { commit: any; dispatch: any }, res: any) => {
    let token = res.data as Token;
    return new Promise((resolve, reject) => {
      commit("authRequest");
      localStorage.setItem("auth-token", token.authToken);
      commit("authSuccess", token);
      //dispatch("user/userRequest", null, {root: true});
      EventBus.$emit(EVENTS.LOGGED_IN);
      resolve(token);
    });
  },
  authLogout: ({ commit, dispatch }: { commit: any; dispatch: any }) => {
    return new Promise((resolve, reject) => {
      commit("authLogout");
      localStorage.removeItem("auth-token");
      dispatch("user/userReset", null, { root: true });
      resolve();
    });
  }
};

const mutations = {
  authRequest: (authState: any) => {
    authState.status = "attempting authentication request";
  },
  authSuccess: (authState: any, authToken: string) => {
    authState.status = "authentication succeeded";
    authState.token = authToken;
  },
  authError: (authState: any) => {
    authState.status = "error";
  },
  authLogout: (authState: any) => {
    authState.token = "";
    EventBus.$emit(EVENTS.LOGGED_OUT);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
