import Api from "../../../utils/api/Api";
import FetchApi from "../../../utils/api/FetchApi";

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
      let fetchApi = new Api(new FetchApi());

      fetchApi.provider.headers["Authorization"] =
        "Basic " + btoa("11d7c9f:" + process.env.VUE_APP_SECRET_KEY);
      console.log(fetchApi.provider.headers["Authorization"]);

      await fetchApi
        .postRequest(
          process.env.VUE_APP_BASE_URL + "auth/login",
          fetchApi.provider.headers,
          userData
        )
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
