import FetchApi from "../../utils/api/FetchApi";
import Api from "../../utils/api/Api";

export default {
  state: {
    cities: [],
    currentPoints: [],
    currentCityCoordinates: [55.751574, 37.573856], // Moscow
    currentCityId: "",
    pointsWithCoordinates: [],
    currentPointId: ""
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
  },
  actions: {
    fetchCities({ commit }) {
      let fetchApi = new Api(new FetchApi());
      fetchApi
        .getRequest(process.env.VUE_APP_BASE_URL + "db/city", fetchApi.provider.headers)
        .then(result => {
          commit("updateCities", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    fetchPoints({ commit }, cityId) {
      let fetchApi = new Api(new FetchApi());
      fetchApi
        .getRequest(process.env.VUE_APP_BASE_URL + "db/point?cityId=" + cityId, fetchApi.provider.headers)
        .then(result => {
          commit("updatePoints", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    generatePlaceCoordinates({ commit }, address) {
      let fetchApi = new Api(new FetchApi());
      fetchApi
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
      let fetchApi = new Api(new FetchApi());

      for (let i = 0; i < points.length; i++) {
        fetchApi
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
  }
};
