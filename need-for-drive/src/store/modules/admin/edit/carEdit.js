import Api from "@/utils/api/Api.js";
import { instance } from "@/utils/api/instance";
import AxiosApi from "@/utils/api/AxiosApi";

export default {
  state: {
    lastCarId: "",
    lastCar: {},
    carEditProgress: 0,
    file: {},
    carImagePath: "",
  },

  getters: {
    getLastCar(state) {
      return state.lastCar;
    },
    getCarFile(state) {
      return state.file;
    },
    getCarImagePath(state) {
      return state.carImagePath;
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

    async postNewCar({ state, rootState }) {
      let api = new Api(new AxiosApi());

      // form data example
      let data = new FormData();

      data.append("description", state.lastCar.description);
      data.append("priceMin", state.lastCar.priceMin);
      data.append("priceMax", state.lastCar.priceMax);
      data.append("name", state.lastCar.name);
      // решена проблема с файлами
      data.append("thumbnail", state.file);
      data.append("number", state.lastCar.number);
      // решена проблема с массивами
      for (let i = 0; i < state.lastCar.colors.length; i++) {
        data.append("colors", state.lastCar.colors[i]);
      }
      // с объектами
      data.append("categoryId", state.lastCar.categoryId.id);

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      instance.defaults.headers["Content-Type"] = "multipart/form-data";

      await api
        .postRequest("db/car", data)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },

  mutations: {
    updateLastCar(state, car) {
      state.lastCar = car;
      state.carImagePath = "";
    },

    updateCarFile(state, file) {
      state.file = file;
    },

    updateCarImagePath(state, path) {
      state.carImagePath = path;
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
