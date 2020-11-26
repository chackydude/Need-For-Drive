export default {
  state: {
    orderCity: "",
    orderPlace: "",
    orderModel: {},
    modelColor: "",
    rentalTime: "",
    tariff: "",
    extraServices: [],
    minPrice: 0,
    maxPrice: 0
  },
  mutations: {
    updateCity(state, city) {
      state.orderCity = city;
    },

    updatePlace(state, place) {
      state.orderPlace = place;
    },

    updateModel(state, payload) {
      state.orderModel = payload;
    },

    updateColor(state, color) {
      state.modelColor = color;
    },

    updateTariff(state, tariff) {
      state.tariff = tariff;
    }
  },
  actions: {},
  getters: {
    getCity(state) {
      return state.orderCity;
    },

    getPoint(state) {
      return state.orderPlace;
    },

    getModel(state) {
      return state.orderModel;
    },

    getColor(state) {
      return state.modelColor;
    },

    getTariff(state) {
      return state.tariff;
    }
  }
};
