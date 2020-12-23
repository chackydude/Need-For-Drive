import Api from "../../../utils/api/Api";
import FetchApi from "../../../utils/api/FetchApi";

export default {
  state: {
    orders: {}
  },
  getters: {},
  actions: {
    fetchOrders({ commit, rootState }) {
      let fetchApi = new Api(new FetchApi());

      fetchApi.provider.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      fetchApi
        .getRequest(
          process.env.VUE_APP_BASE_URL + "db/order",
          fetchApi.provider.headers
        )
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
