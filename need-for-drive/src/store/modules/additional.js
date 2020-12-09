import Api from "../../utils/api/Api";
import FetchApi from "../../utils/api/FetchApi";

export default {
  state: {
    rates: [],
    currentRate: {},
    extraServices: [],
    tariff: ""
  },
  mutations: {
    updateRates(state, rates) {
      state.rates = rates;
    },

    updateCurrentRate(state, rate) {
      state.currentRate = rate;
    },

    updateServices(state, payload) {
      console.log(payload);
      if (payload.status === "add") {
        state.extraServices.push(payload.value);
      } else {
        // TODO: optimize removing
        state.extraServices = state.extraServices.filter(item => {
          item.text !== payload.value.text;
        });
      }
    },
  },
  actions: {
    loadRates({ commit }) {
      let fetchApi = new Api(new FetchApi());
      fetchApi
        .getRequest(
          process.env.VUE_APP_BASE_URL + "db/rate",
          fetchApi.provider.headers
        )
        .then(result => {
          commit("updateRates", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  getters: {
    getRates(state) {
      return state.rates;
    },

    getCurrentRate(state) {
      return state.currentRate;
    },

    getTariff(state) {
      return state.tariff;
    },

    getExtraServices(state) {
      return state.extraServices;
    },
  }
};
