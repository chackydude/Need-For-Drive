export default {
  state: {
    orderCity: "",
    orderPlace: "",
    orderModel: "",
    modelColor: "",
    rentalTime: "",
    extraServices: []
  },
  mutations: {
    updateCity(state, city) {
      state.orderCity = city;
    },

    updatePlace(state, place) {
      state.orderPlace = place;
    }
  },
  actions: {},
  getters: {
    getCity(state) {
      return state.orderCity;
    },

    getPlace(state) {
      return state.orderPlace;
    }
  }
};
