import Api from "@/utils/api/Api.js";
import { instance } from "@/utils/api/instance";
import AxiosApi from "@/utils/api/AxiosApi";

export default {
  state: {
    lastCar: {
      priceMax: 0,
      priceMin: 0,
      name: "",
      thumbnail: {},
      description: "",
      categoryId: {
        id: "5e25c99a099b810b946c5d63" // костыль, пока чтобы не вводить отдельно поле для category
      },
      colors: []
    },
    carEditProgress: 0,
    file: {},
    carImagePath: ""
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

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      if (state.file.size === undefined) {
        let lastCarObject = {
          priceMax: state.lastCar.priceMax,
          priceMin: state.lastCar.priceMin,
          name: state.lastCar.name,
          number: state.lastCar.number,
          thumbnail: {
            path: state.lastCar.thumbnail.path,
            mimetype: state.lastCar.thumbnail.mimetype,
            originalname: state.lastCar.thumbnail.originalname,
            size: state.lastCar.thumbnail.size
          },
          description: state.lastCar.thumbnail.description,
          categoryId: state.lastCar.categoryId.id,
          colors: state.lastCar.colors
        };
        console.log(lastCarObject);
        await api.postRequest("db/car", lastCarObject);
      } else {
        let data = new FormData();
        // решена проблема с файлами
        data.append("thumbnail", state.file);
        data.append("description", state.lastCar.description);
        data.append("priceMin", state.lastCar.priceMin);
        data.append("priceMax", state.lastCar.priceMax);
        data.append("name", state.lastCar.name);
        data.append("number", state.lastCar.number);
        // решена проблема с массивами
        for (let i = 0; i < state.lastCar.colors.length; i++) {
          data.append("colors", state.lastCar.colors[i]);
        }
        data.append("categoryId", state.lastCar.categoryId.id);

        instance.defaults.headers["Content-Type"] = "multipart/form-data";

        await api.postRequest("db/car", data);
      }
    },

    async updateCar({ rootState, state }) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;
      await api.postRequest(`db/car/${state.lastCar.id}`, state.lastCar);
    },

    cancelCarEditing({ commit }) {
      commit("updateLastCar", {
        priceMax: 0,
        priceMin: 0,
        name: "",
        thumbnail: {},
        description: "",
        categoryId: {
          id: "5e25c99a099b810b946c5d63" // костыль, пока чтобы не вводить отдельно поле для category
        },
        colors: []
      });
      commit("updateCarFile", {});
      commit("updateCarImagePath", "");
    },

    deleteLastCar({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());
      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      commit("updateLastCar", {});
      commit("updateCarFile", {});
      commit("updateCarImagePath", "");

      api.postRequest(`db/car/${id}`);
    }
  },

  mutations: {
    updateLastCar(state, car) {
      state.lastCar = car;
      state.file = {};
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

// FIXME: баг при заполнении нового автомобиля - при нажатии на "отмена" не очищается изображение
// TODO: перекидывание на страницу с Id сущности, там она уже редачится
// TODO: delete - 404, в чем проблема
// TODO: как разберешься с авто, перейти к заказам
// TODO: после заказов -> одна любая другая сущность
