import Api from "../../../utils/api/Api";
import FetchApi from "../../../utils/api/FetchApi";
import { instance } from "../../../utils/api/instance";
import AxiosApi from "../../../utils/api/AxiosApi";

export default {
  state: {
    accessToken: ""
  },

  getters: {
    getAccessToken(state) {
      return state.accessToken;
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
          localStorage.setItem("auth", true);
          console.log(result);
          commit("updateAccessToken", result.access_token);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },

  mutations: {
    updateAccessToken(state, token) {
      state.accessToken = token;
    }
  }
};
