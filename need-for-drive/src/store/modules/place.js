import Api from "../../utils/api/Api";
import AxiosApi from "../../utils/api/AxiosApi";

export default {
  state: {
    cities: [],
    currentPoints: [],
    currentCityCoordinates: [55.751574, 37.573856], // Moscow
    currentCityId: "",
    pointsWithCoordinates: [],
    currentPointId: ""
  },

  getters: {
    getCities(state) {
      return state.cities;
    },

    getPoints(state) {
      return state.currentPoints;
    },

    getCurrentCityId(state) {
      return state.currentCityId;
    },

    getCurrentPointId(state) {
      return state.currentPointId;
    },

    getCoordinates(state) {
      return state.currentCityCoordinates;
    },

    getPointsCoordinates(state) {
      return state.pointsWithCoordinates;
    }
  },

  actions: {
    fetchCities({ commit }) {
      let api = new Api(new AxiosApi());
      api
        .getRequest( "db/city")
        .then(result => {
          commit("updateCities", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    fetchPoints({ commit }, cityId) {
      let api = new Api(new AxiosApi());
      api
        .getRequest("db/point?cityId=" + cityId)
        .then(result => {
          commit("updatePoints", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    // getting user's location coordinates
    getUserLocationCoordinates({ commit }) {
      function success(position) {
        // получили координаты юзера
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        commit("updateCurrentCityCoordinates", [latitude, longitude]);
      }

      function error() {
        // Unable to retrieve your location
      }

      if (!navigator.geolocation) {
        // Geolocation is not supported by your browser
      } else {
        // Locating…
        navigator.geolocation.getCurrentPosition(success, error);
      }
    },

    generatePlaceCoordinates({ commit }, address) {
      let api = new Api(new AxiosApi());
      api
        .getRequest(
          process.env.VUE_APP_GEOCODE_URL +
            process.env.VUE_APP_MAPS_API_KEY +
            "&format=json&geocode=" +
            address
        )
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
      commit("updatePointsWithCoordinates", {
        status: "clear",
        coordinates: []
      });
      let api = new Api(new AxiosApi());

      for (let i = 0; i < points.length; i++) {
        api
          .getRequest(
            process.env.VUE_APP_GEOCODE_URL +
              process.env.VUE_APP_MAPS_API_KEY +
              "&format=json&geocode=" +
              points[i].cityId.name +
              points[i].address
          )
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
          })
          .catch(error => console.log(error.message));
      }
    },

    generateCurrentCityId({ commit, getters }, cityName) {
      for (let i = 0; i < getters.getCities.length; i++) {
        if (getters.getCities[i].name === cityName) {
          commit("updateCurrentCityId", getters.getCities[i].id);
        }
      }
    },

    generateCurrentPointId({ commit, getters }, pointName) {
      for (let i = 0; i < getters.getPoints.length; i++) {
        if (getters.getPoints[i].address === pointName) {
          commit("updateCurrentPointId", getters.getPoints[i].id);
        }
      }
    }
  },

  mutations: {
    updateCities(state, cities) {
      state.cities = cities;
    },

    updateCurrentCityId(state, id) {
      state.currentCityId = id;
    },

    updateCurrentPointId(state, id) {
      state.currentPointId = id;
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
  }
};
