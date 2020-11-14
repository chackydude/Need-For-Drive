export default {
  state: {
    cities: [],
    currentPoints: []
  },
  mutations: {
    updateCities(state, cities) {
      state.cities = cities;
    },

    updatePoints(state, points) {
      state.currentPoints = points;
    }
  },
  actions: {
    fetchCities() {},

    fetchPoints() {}
  },
  getters: {
    getCities(state) {
      return state.orderCity;
    },

    getPlace(state) {
      return state.orderPlace;
    }
  }
};
