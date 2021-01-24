import Api from "../../../utils/api/Api";
import AxiosApi from "../../../utils/api/AxiosApi";
import { instance } from "../../../utils/api/instance";

export default {
  // т.к. админка и обычный клиент в одном проекте
  namespaced: true,
  state: {
    orders: [],
    ordersCount: 0,
    cars: [],
    cities: []
  },
  getters: {
    getOrders(state) {
      // с API прилетают некоторые заказы с order.carId === null
      // return state.orders.filter(order => order.carId !== null);
      return state.orders;
    },
    getOrdersCount(state) {
      return state.ordersCount;
    },
    getCars(state) {
      return state.cars;
    },
    getCities(state) {
      return state.cities;
    }
  },
  actions: {
    fetchOrders({ commit, rootState }, payload) {
      let api = new Api(new AxiosApi());

      let params = "";

      // adding params
      if (payload.params) {
        payload.params.forEach(param => {
          if (param.value.length !== 0) {
            params += "&" + param.name + "=" + param.value;
          }
        });
      }

      console.log(params);

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(
          `db/order?page=${payload.page}&limit=${payload.limit}?${params}`
        )
        .then(result => {
          commit("updateOrders", result.data);
          commit("updateOrderCount", result.count);
          console.log(result.data);
          console.log(result.count);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    fetchCars({ commit, rootState }) {
      let api = new Api(new AxiosApi());
      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(`db/car`)
        .then(result => {
          commit("updateCars", result.data);
          console.log(result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    fetchCities({ commit, rootState }) {
      let api = new Api(new AxiosApi());
      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(`db/city`)
        .then(result => {
          commit("updateCities", result.data);
          console.log(result.data);
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
    },
    updateCities(state, cities) {
      state.cities = cities;
    },
    updateCars(state, cars) {
      state.cars = cars;
    }
  }
};
