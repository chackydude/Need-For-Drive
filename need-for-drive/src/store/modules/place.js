export default {
  state: {
    cities: [],
    currentPoints: [],
    currentCityCoordinates: [55.751574, 37.573856], // Moscow
    pointsWithCoordinates: []
  },
  mutations: {
    updateCities(state, cities) {
      state.cities = cities;
    },

    updatePoints(state, points) {
      state.currentPoints = points;
    },

    updateCurrentCityCoordinates(state, coordinates) {
      state.currentCityCoordinates = coordinates;
    },

    updatePointsWithCoordinates(state, payload) {
      if (payload.status == "add") {
        state.pointsWithCoordinates.push({
          center: payload.coordinates,
          name: payload.name
        });
      } else {
        state.pointsWithCoordinates = [];
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
          commit("updateCurrentCityCoordinates", coords);
        })
        .catch(error => console.log(error.message));
    },

    generateCoordinatesForPoints({ commit }, points) {
      commit("updatePointsWithCoordinates", { status: "clear", coordinates: [] });
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
            commit("updatePointsWithCoordinates", {
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
      return state.currentCityCoordinates;
    },

    getPointsCoordinates(state) {
      return state.pointsWithCoordinates;
    }
  }
};
