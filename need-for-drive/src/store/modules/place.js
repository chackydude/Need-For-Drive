export default {
  state: {
    cities: [
      { id: 1, name: "Ульяновск", coordinates: [] },
      { id: 2, name: "Казань", coordinates: [] },
      { id: 3, name: "Самара", coordinates: [] }
    ],
    currentPoints: ["Нариманова 42", "Ленина 35", "Маркса 79"],

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

    fetchPoints() {},

    getPlaceCoordinates(ctx, address) {
      fetch(process.env.VUE_APP_GEOCEDE_URL + address)
        .then(response => response.json())
        .then(result =>
          console.log(
            result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .reverse()
              .map(element => parseFloat(element))
          )
        );
    }
  },
  getters: {
    getCities(state) {
      return state.cities;
    },

    getPoints(state) {
      return state.currentPoints;
    }
  }
};
