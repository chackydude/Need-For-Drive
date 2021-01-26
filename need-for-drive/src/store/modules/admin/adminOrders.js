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
    carsCount: 0,
    cities: [],
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
    getCarsCount(state) {
      return state.carsCount;
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
          if (param.value != null && param.value.length !== 0) {
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

    fetchCars({ commit, rootState }, payload) {
      let api = new Api(new AxiosApi());

      let params = "";

      // adding params
      if (payload.params) {
        payload.params.forEach(param => {
          if (param.value != null && param.value.length !== 0) {
            params += "&" + param.name + "=" + param.value;
          }
        });
      }

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(
          `db/car?page=${payload.page}&limit=${payload.limit}?${params}`
        )
        .then(result => {
          commit("updateCars", result.data);
          console.log(result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    fetchCarsCount({ commit, rootState }, payload) {
      let api = new Api(new AxiosApi());

      console.log("payload for cars count: ", payload)

      let params = "";

      // adding params
      if (payload.params) {
        payload.params.forEach(param => {
          if (param.value != null && param.value.length !== 0) {
            params += "&" + param.name + "=" + param.value;
          }
        });
      }

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(`db/car?${params}`)
        .then(result => {
          commit("updateCarsCount", result.data.length);
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
    },
    updateCarsCount(state, count) {
      state.carsCount = count;
    }
  }
};
