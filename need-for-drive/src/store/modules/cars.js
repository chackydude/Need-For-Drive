import Api from "../../utils/api/Api";
import FetchApi from "../../utils/api/FetchApi";

export default {
  state: {
    // cars: [],
    carsAmount: 0,
    allCars: [],
    category: "Все модели"
  },
  mutations: {
    // updateCars(state, pageCars) {
    //   state.cars.push(pageCars);
    // },

    updateCategory(state, category) {
      state.category = category;
    },

    updateAllCars(state, cars) {
      state.allCars = cars;
    },

    updateCarsAmount(state, amount) {
      state.carsAmount = amount;
    }
  },
  actions: {
    fetchCars({ commit }) {
      let fetchApi = new Api(new FetchApi());

      fetchApi
        .getRequest(
          process.env.VUE_APP_BASE_URL + "db/car",
          fetchApi.provider.headers
        )
        .then(result => {
          commit("updateCarsAmount", result.count);
          commit("updateAllCars", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    }

    // async fetchCarsWithPagination({ commit }, { pagesAmount, onpageCarsAmount }) {
    //   let fetchApi = new Api(new FetchApi());
    //
    //   for (let i = 1; i <= pagesAmount; i++) {
    //     fetchApi
    //       .getRequest(
    //         process.env.VUE_APP_BASE_URL +
    //           "db/car?page=" +
    //           i +
    //           "&limit=" +
    //           onpageCarsAmount,
    //         fetchApi.provider.headers
    //       )
    //       .then(result => {
    //         commit("updateCars", result.data);
    //       })
    //       .catch(error => {
    //         console.log(error.message);
    //       });
    //   }
    // }
  },
  getters: {
    // getCars(state) {
    //   return state.cars;
    // },

    getCarsAmount(state) {
      return state.carsAmount;
    },

    getCategory(state) {
      return state.category;
    },

    getAllCars(state) {
      return state.allCars.filter(car =>
        state.category === "Все модели"
          ? car
          : car.categoryId.name === state.category
      );
    }
  }
};
