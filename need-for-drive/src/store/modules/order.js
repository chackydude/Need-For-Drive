export default {
  state: {
    orderCity: "",
    orderPlace: "",
    orderModel: {},
    modelColor: "",
    rentalTime: [],
    rentalDateFrom: "",
    rentalDateTo: "",
    tariff: "",
    extraServices: []
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
    },

    updateServices(state, payload) {
      if (payload.status == "add") {
        state.extraServices.push(payload.service);
      } else {
        // TODO: optimize removing
        state.extraServices = state.extraServices.filter(
          items => items !== payload.service
        );
      }
    },

    updateRentalTime(state, time) {
      state.rentalTime = time;
    },

    // can replace by common mutation
    updateRentalDateFrom(state, date) {
      state.rentalDateFrom = date;
    },

    updateRentalDateTo(state, date) {
      state.rentalDateTo = date;
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
    },

    getExtraServices(state) {
      return state.extraServices;
    },

    getRentalTime(state) {
      return state.rentalTime;
    },

    getDateFrom(state) {
      return state.rentalDateFrom;
    },

    getDateTo(state) {
      return state.rentalDateTo;
    }
  }
};
