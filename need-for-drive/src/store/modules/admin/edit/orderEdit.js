import Api from "@/utils/api/Api.js";
import { instance } from "@/utils/api/instance";
import AxiosApi from "@/utils/api/AxiosApi";

export default {
  state: {
    lastOrder: {
      orderStatusId: {},
      cityId: {},
      pointId: {},
      carId: {}, // костыль, от изначально прилетевших заказов с carId === null
      color: "",
      dateFrom: 0,
      dateTo: 0,
      rateId: {},
      price: 0,
      isFullTank: true,
      isNeedChildChair: true,
      isRightWheel: true
    }
  },

  getters: {
    getLastOrder(state) {
      return state.lastOrder;
    }
  },

  actions: {
    fetchOrderById({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(`db/order/${id}`)
        .then(result => {
          commit("updateLastOrder", result.data);
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
        carId: {}, // костыль, от изначально прилетевших заказов с carId === null
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
        carId: {}, // костыль, от изначально прилетевших заказов с carId === null
        color: "",
        dateFrom: 0,
        dateTo: 0,
        rateId: {},
        price: 0,
        isFullTank: true,
        isNeedChildChair: true,
        isRightWheel: true
      })
    }
  },

  mutations: {
    updateLastOrder(state, order) {
      state.lastOrder = order;
    }
  }
};
