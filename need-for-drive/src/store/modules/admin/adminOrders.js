import Api from "../../../utils/api/Api";
import FetchApi from "../../../utils/api/FetchApi";

export default {
  state: {
    orders: {}
  },
  getters: {
    getOrders(state) {
      return state.orders;
    }
  },
  actions: {
    fetchOrders({ commit }) {
      let fetchApi = new Api(new FetchApi());

      fetchApi
        .getRequest(
          process.env.VUE_APP_BASE_URL + "db/order",
          fetchApi.provider.headers
        )
        .then(result => {
          console.log(result);
          commit("updateOrders", result.data);
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
