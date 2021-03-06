import Api from "@/utils/api/Api.js";
import { instance } from "@/utils/api/instance";
import AxiosApi from "@/utils/api/AxiosApi";

export default {
  state: {
    lastOrder: {
      orderStatusId: {},
      cityId: {},
      pointId: {},
      carId: {},
      color: "",
      dateFrom: 0,
      dateTo: 0,
      rateId: {},
      price: 0,
      isFullTank: true,
      isNeedChildChair: true,
      isRightWheel: true
    },
    statuses: {
      confirmed: "5e26a1f0099b810b946c5d8b",
      cancelled: "5e26a1f5099b810b946c5d8c",
      new: "5e26a191099b810b946c5d89"
    }
  },

  getters: {
    getLastOrder(state) {
      return state.lastOrder;
    },
    getStatuses(state) {
      return state.statuses;
    }
  },

  actions: {
    async fetchOrderById({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      let order = await api
        .getRequest(`db/order/${id}`)
        .then(result => {
          commit("updateLastOrder", result.data);
          console.log(result.data);
          return result.data;
        })
        .catch(error => {
          console.log(error.message);
        });
      return order;
    },

    updateLastOrderStatus({ state, rootState }, payload) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      state.lastOrder.orderStatusId.id = payload.statusId;

      api
        .putRequest(`db/order/${payload.orderId}`, state.lastOrder)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    updateNewOrder({ state, rootState }, id) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .putRequest(`db/order/${id}`, state.lastOrder)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    deleteLastOrder({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());
      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      commit("updateLastOrder", {
        orderStatusId: {},
        cityId: {},
        pointId: {},
        carId: {},
        color: "",
        dateFrom: 0,
        dateTo: 0,
        rateId: {},
        price: 0,
        isFullTank: true,
        isNeedChildChair: true,
        isRightWheel: true
      });

      api.deleteRequest(`db/order/${id}`);
    },

    cancelOrderEditing({ commit }) {
      commit("updateLastOrder", {
        orderStatusId: {},
        cityId: {},
        pointId: {},
        carId: {},
        color: "",
        dateFrom: 0,
        dateTo: 0,
        rateId: {},
        price: 0,
        isFullTank: true,
        isNeedChildChair: true,
        isRightWheel: true
      });
    }
  },

  mutations: {
    updateLastOrder(state, order) {
      state.lastOrder = order;
    }
  }
};
