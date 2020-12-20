import Api from "../../../utils/api/Api";
import FetchApi from "../../../utils/api/FetchApi";

export default {
  state: {
    orders: {}
  },
  getters: {},
  actions: {
    fetchOrders({ commit }) {
      let fetchApi = new Api(new FetchApi());

      fetchApi.provider.headers["Authorization"] =
        "Bearer 05bc08c3949b852aa44867f59872ba00b7350af2";

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
