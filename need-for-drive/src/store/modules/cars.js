import Api from "../../utils/api/Api";
import FetchApi from "../../utils/api/FetchApi";

export default {
  state: {
    cars: []
  },
  mutations: {
    updateCars(state, cars) {
      state.cars = cars;
    }
  },
  actions: {
    fetchCars({ commit }) {
      let fetchApi = new Api(new FetchApi());
      return fetchApi
        .getRequest(
          process.env.VUE_APP_BASE_URL + "db/car?limit=9",
          fetchApi.provider.headers
        )
        .then(result => {
          commit("updateCars", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  getters: {
    getCars(state) {
      return state.cars;
    }
  }
};
