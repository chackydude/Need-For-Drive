import Api from "../../../utils/api/Api";
import AxiosApi from "../../../utils/api/AxiosApi";
import { instance } from "../../../utils/api/instance";

export default {
  state: {
    orders: {}
  },
  getters: {},
  actions: {
    fetchOrders({ commit, rootState }) {
      let api = new Api(new AxiosApi());

      api
        .getRequest("db/order")
        .then(result => {
          commit("updateOrders", result.data);
          console.log(result);
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
