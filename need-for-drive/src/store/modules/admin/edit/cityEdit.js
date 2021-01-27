import Api from "@/utils/api/Api.js";
import { instance } from "@/utils/api/instance";
import AxiosApi from "@/utils/api/AxiosApi";

export default {
  state: {
    lastCity: {
      name: "",
      id: "",
      updatedAt: ""
    },
    isCityEditing: true
  },

  getters: {
    getLastCity(state) {
      return state.lastCity;
    },
    getCityEditingStatus(state) {
      return state.isCityEditing;
    }
  },

  actions: {
    async fetchCityById({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      let order = await api
        .getRequest(`db/city/${id}`)
        .then(result => {
          commit("updateLastCity", result.data);
          console.log(result.data);
          return result.data;
        })
        .catch(error => {
          console.log(error.message);
        });
      return order;
    },

    updateNewCity({ state, rootState }, id) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .putRequest(`db/city/${id}`, state.lastCity)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    postNewCity({ state, rootState }) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .postRequest(`db/city`, state.lastCity)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    deleteLastCity({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());
      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      commit("updateLastCity", {
        name: "",
        id: "",
        updatedAt: ""
      });

      api.deleteRequest(`db/city/${id}`);
    },

    cancelCityEditing({ commit }) {
      commit("updateLastCity", {
        name: "",
        id: "",
        updatedAt: ""
      });
      commit("updateCityEditingStatus", false);
    }
  },

  mutations: {
    updateLastCity(state, city) {
      state.lastCity = city;
    },
    updateCityEditingStatus(state, status) {
      state.isCityEditing = status;
    }
  }
};
