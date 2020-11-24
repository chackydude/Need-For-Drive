import Api from "../../utils/api/Api";
import FetchApi from "../../utils/api/FetchApi";

export default {
  state: {
    cars: [],
    carsAmount: 0
  },
  mutations: {
    updateCars(state, pageCars) {
      state.cars.push(pageCars);
    },

    updateCarsAmount(state, amount) {
      state.carsAmount = amount;
    }
  },
  actions: {
    fetchCarsAmount({ commit }) {
      let fetchApi = new Api(new FetchApi());

      fetchApi
        .getRequest(
          process.env.VUE_APP_BASE_URL + "db/car",
          fetchApi.provider.headers
        )
        .then(result => {
          commit("updateCarsAmount", result.count);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    async fetchCarsWithPagination({ commit }, { pagesAmount, onpageCarsAmount }) {
      let fetchApi = new Api(new FetchApi());

      for (let i = 1; i <= pagesAmount; i++) {
        fetchApi
          .getRequest(
            process.env.VUE_APP_BASE_URL +
              "db/car?page=" +
              i +
              "&limit=" +
              onpageCarsAmount,
            fetchApi.provider.headers
          )
          .then(result => {
            commit("updateCars", result.data);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  },
  getters: {
    getCars(state) {
      return state.cars;
    },

    getCarsAmount(state) {
      return state.carsAmount;
    }
  }
};
