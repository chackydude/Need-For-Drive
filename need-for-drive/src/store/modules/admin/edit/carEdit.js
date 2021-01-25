import Api from "@/utils/api/Api.js";
import { instance } from "@/utils/api/instance";
import AxiosApi from "@/utils/api/AxiosApi";

export default {
  state: {
    lastCarId: "",
    lastCar: {},
    carEditProgress: 0
  },

  getters: {
    getLastCar(state) {
      return state.lastCar;
    }
  },

  actions: {
    fetchCarById({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      api
        .getRequest(`db/car/${id}`)
        .then(result => {
          commit("updateLastCar", result.data);
          console.log(result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    async postNewCar({ rootState }, car) {
      let api = new Api(new AxiosApi());

      // let carExampleObject = {
      //   priceMax: 0,
      //   priceMin: 0,
      //   name: "string",
      //   thumbnail: {
      //     mimetype: "image/png",
      //     originalname: "qashqai.png",
      //     path: "/files/5eb4137e099b810b946c87d9_qashqai.png",
      //     size: 203858
      //   },
      //   description: "hello hello hello",
      //   categoryId: {
      //     description: "Премиум!",
      //     id: "5e25c99a099b810b946c5d63",
      //     name: "Премиум",
      //   },
      //   colors: ["string"]
      // };

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      await api
        .postRequest("db/car", car)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },

  mutations: {
    updateLastCar(state, car) {
      state.lastCar = car;
    }
  }
};

/*
  props example:
    {
      inputType: file / text / array
      modelingValue: {
        name: name of field in the API
        value: value of field
      }
    }
 */
