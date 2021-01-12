import Api from "../../../utils/api/Api";
import AxiosApi from "../../../utils/api/AxiosApi";
import { instance } from "../../../utils/api/instance";

export default {
  state: {
    orders: []
  },
  getters: {
    getOrders(state) {
      return state.orders;
    }
  },
  actions: {
    fetchOrders({ commit, rootState }) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      api
        .getRequest("db/order?page=1&limit=5")
        .then(result => {
          commit("updateOrders", result.data);
          console.log(result.data)
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  mutations: {
    updateOrders(state, orders) {
      state.orders = orders;
    }
  }
};
