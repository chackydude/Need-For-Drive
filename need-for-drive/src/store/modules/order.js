export default {
  state: {
    orderCity: "",
    orderPlace: "",
    orderModel: "",
    modelColor: "",
    rentalTime: "",
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

    updateModel(state, model) {
      state.orderModel = model;
    }
  },
  actions: {},
  getters: {
    getCity(state) {
      return state.orderCity;
    },

    getPoint(state) {
      return state.orderPlace;
    }
  }
};
