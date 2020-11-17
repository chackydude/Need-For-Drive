export default {
  state: {
    cities: [
      { id: 1, name: "Ульяновск", coordinates: [] },
      { id: 2, name: "Казань", coordinates: [] },
      { id: 3, name: "Самара", coordinates: [] }
    ],
    currentPoints: ["Нариманова 42", "Ленина 35", "Маркса 79"],
    currentCoordinates: []
  },
  mutations: {
    updateCities(state, cities) {
      state.cities = cities;
    },

    updatePoints(state, points) {
      state.currentPoints = points;
    },

    updateCoordinates(state, coordinates) {
      state.currentCoordinates = coordinates;
    }
  },
  actions: {
    fetchCities() {},

    fetchPoints() {},

    // getting coordinates with using yandex-geocode
    generatePlaceCoordinates({ commit }, address) {
      console.log(address);
      fetch(
          process.env.VUE_APP_GEOCODE_URL +
          address
      )
        .then(response => response.json())
        .then(result => {
          let coords = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse()
            .map(element => parseFloat(element));
          commit("updateCoordinates", coords);
        });
    }
  },
  getters: {
    getCities(state) {
      return state.cities;
    },

    getPoints(state) {
      return state.currentPoints;
    },

    getCoordinates(state) {
      return state.currentCoordinates;
    }
  }
};
