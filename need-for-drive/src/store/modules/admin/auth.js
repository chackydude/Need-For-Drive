import Api from "../../../utils/api/Api";
import { instance } from "../../../utils/api/instance";
import AxiosApi from "../../../utils/api/AxiosApi";

export default {
  state: {
    accessToken: localStorage.getItem("auth"),
    authError: false,
    authLoading: false
  },

  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getAuthError(state) {
      return state.authError;
    },
    getAuthLoading(state) {
      return state.authLoading;
    }
  },

  actions: {
    async authUser({ commit }, userData) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Basic " + btoa("11d7c9f:" + process.env.VUE_APP_SECRET_KEY);

      await api
        .postRequest("auth/login", userData)
        .then(result => {
          commit("updateAccessToken", result.access_token);
          commit("updateLoading", false);
          commit("updateError", false);
          localStorage.setItem("auth", result.access_token);
        })
        .catch(error => {
          console.log(error.message);

          commit("updateLoading", false);
          commit("updateError", true);
        });
    }
  },

  mutations: {
    updateAccessToken(state, token) {
      state.accessToken = token;
    },
    updateError(state, isError) {
      state.authError = isError;
    },
    updateLoading(state, isLoading) {
      state.authLoading = isLoading;
    }
  }
};
