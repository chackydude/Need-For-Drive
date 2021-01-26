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
    }
  },

  mutations: {
    updateLastOrder(state, order) {
      state.lastOrder = order;
    }
  }
};
