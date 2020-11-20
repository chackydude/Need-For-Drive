export default {
  state: {
    cities: [],
    currentPoints: [],
    currentCoordinates: [55.751574, 37.573856], // Moscow
    pointsCoordinates: []
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
    },

    updatePointsCoordinates(state, payload) {
      if (payload.status == "add") {
        state.pointsCoordinates.push({
          center: payload.coordinates,
          name: payload.name
        });
      } else {
        state.pointsCoordinates = [];
      }
    }
  },
  actions: {
    fetchCities({ commit }) {
      return fetch(process.env.VUE_APP_BASE_URL + "db/city", {
        headers: {
          "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
          Authorization: process.env.VUE_APP_SECRET_KEY
        },
        contentType: "application/json"
      })
        .then(res => res.json())
        .then(result => {
          commit("updateCities", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    fetchPoints({ commit }) {
      return fetch(process.env.VUE_APP_BASE_URL + "db/point", {
        headers: {
          "X-Api-Factory-Application-Id": process.env.VUE_APP_ID,
          Authorization: process.env.VUE_APP_SECRET_KEY
        },
        contentType: "application/json"
      })
        .then(res => res.json())
        .then(result => {
          commit("updatePoints", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    // getting coordinates with using yandex-geocode
    generatePlaceCoordinates({ commit }, address) {
      fetch(
        process.env.VUE_APP_GEOCODE_URL +
          process.env.VUE_APP_MAPS_API_KEY +
          "&format=json&geocode=" +
          address
      )
        .then(response => response.json())
        .then(result => {
          let coords = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse()
            .map(element => parseFloat(element));
          commit("updateCoordinates", coords);
        })
        .catch(error => console.log(error.message));
    },

    generateCoordinatesForPoints({ commit }, points) {
      commit("updatePointsCoordinates", { status: "clear", coordinates: [] });
      points.forEach(point => console.log(point.address));
      for (let i = 0; i < points.length; i++) {
        fetch(
          process.env.VUE_APP_GEOCODE_URL +
            process.env.VUE_APP_MAPS_API_KEY +
            "&format=json&geocode=" +
            points[i].cityId.name +
            points[i].address
        )
          .then(response => response.json())
          .then(result => {
            let coords = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .reverse()
              .map(element => parseFloat(element));
            commit("updatePointsCoordinates", {
              status: "add",
              coordinates: coords,
              name: points[i].address
            });
            console.log(points[i].address, coords);
          })
          .catch(error => console.log(error.message));
      }
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
    },

    getPointsCoordinates(state) {
      return state.pointsCoordinates;
    }
  }
};
