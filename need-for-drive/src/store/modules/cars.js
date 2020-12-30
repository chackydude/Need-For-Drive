import Api from "../../utils/api/Api";
import AxiosApi from "../../utils/api/AxiosApi";

export default {
  state: {
    carsAmount: 0,
    allCars: [],
    category: "Все модели"
  },
  getters: {
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
  },
  actions: {
    fetchCars({ commit }) {
      let axiosApi = new Api(new AxiosApi());
      axiosApi
        .getRequest("db/car")
        .then(result => {
          commit("updateCarsAmount", result.count);
          commit("updateAllCars", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    }

    // fetchCarsWithPagination(
    //   { commit },
    //   { pagesAmount, onpageCarsAmount }
    // ) {
    //   let fetchApi = new Api(new FetchApi());

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
  mutations: {
    updateCategory(state, category) {
      state.category = category;
    },

    updateAllCars(state, cars) {
      state.allCars = cars;
    },

    updateCarsAmount(state, amount) {
      state.carsAmount = amount;
    }
  }
};
