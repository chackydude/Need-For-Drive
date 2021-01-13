import Api from "../../../utils/api/Api";
import AxiosApi from "../../../utils/api/AxiosApi";
import { instance } from "../../../utils/api/instance";

export default {
  state: {
    orders: [],
    ordersCount: 0
  },
  getters: {
    getOrders(state) {
      // с API прилетают некоторые заказы с order.carId === null
      return state.orders.filter(order => order.carId !== null);
    },
    getOrdersCount(state) {
      return state.ordersCount;
    }
  },
  actions: {
    fetchOrders({ commit, rootState }, payload) {
      let api = new Api(new AxiosApi());

      console.log(payload.params);

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(`db/order?page=${payload.page}&limit=${payload.limit}`)
        .then(result => {
          commit("updateOrders", result.data);
          commit("updateOrderCount", result.count);
          console.log(result.data);
          console.log(result.count);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  mutations: {
    updateOrders(state, orders) {
      state.orders = orders;
    },
    updateOrderCount(state, count) {
      state.ordersCount = count;
    }
  }
};
