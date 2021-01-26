import Api from "@/utils/api/Api.js";
import { instance } from "@/utils/api/instance";
import AxiosApi from "@/utils/api/AxiosApi";

export default {
  state: {
    isEditing: false, // редактируется ли изначально уже существующий автомобиль
    fieldsCount: 7,
    lastCar: {
      priceMax: 0,
      priceMin: 0,
      name: "",
      thumbnail: {},
      description: "",
      categoryId: {
        id: "5e25c99a099b810b946c5d63" // костыль, пока чтобы не вводить отдельно поле для categoryId
      },
      colors: [],
      number: ""
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
    },
    getEditingStatus(state) {
      return state.isEditing;
    },
    getProgress(state) {
      let progress = 0;
      if (state.lastCar.priceMax != 0)
        progress += Math.floor((1 / state.fieldsCount) * 100);
      if (state.lastCar.priceMin != 0)
        progress += Math.floor((1 / state.fieldsCount) * 100);
      if (state.lastCar.name != "")
        progress += Math.floor((1 / state.fieldsCount) * 100);
      if (state.lastCar.number != "" && state.lastCar.number != undefined)
        progress += Math.floor((1 / state.fieldsCount) * 100);
      if (
        state.lastCar.description != "" &&
        state.lastCar.description !== undefined
      )
        progress += Math.floor((1 / state.fieldsCount) * 100);
      if (state.lastCar.colors.length != 0)
        progress += Math.floor((1 / state.fieldsCount) * 100);
      if (state.lastCar.thumbnail.path != undefined || state.carImagePath != "")
        progress += Math.floor((1 / state.fieldsCount) * 100);

      progress =
        100 - progress >= Math.floor((1 / state.fieldsCount) * 100)
          ? progress
          : 100;
      progress = progress > 100 ? 100 : progress;

      return progress;
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

      // instance.defaults.headers["Content-Type"] = "multipart/form-data";

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

        await api.postRequest("db/car", data);
      }
    },

    async updateCar({ rootState, state }) {
      let api = new Api(new AxiosApi());

      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      // instance.defaults.headers["Content-Type"] = "multipart/form-data";

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
        await api.putRequest(`db/car/${state.lastCar.id}`, lastCarObject);
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

        await api.putRequest(`db/car/${state.lastCar.id}`, data);
      }
    },

    cancelCarEditing({ commit }) {
      commit("updateLastCar", {
        priceMax: 0,
        priceMin: 0,
        name: "",
        thumbnail: {},
        description: "",
        categoryId: {
          id: "5e25c99a099b810b946c5d63"
        },
        colors: [],
        number: ""
      });
      commit("updateCarFile", {});
      commit("updateCarImagePath", "");
      commit("updateEditingStatus", false);
    },

    deleteLastCar({ commit, rootState }, id) {
      let api = new Api(new AxiosApi());
      instance.defaults.headers["Authorization"] =
        "Bearer " + rootState.auth.accessToken;

      commit("updateLastCar", {
        priceMax: 0,
        priceMin: 0,
        name: "",
        thumbnail: {},
        description: "",
        categoryId: {
          id: "5e25c99a099b810b946c5d63"
        },
        colors: [],
        number: ""
      });
      commit("updateCarFile", {});
      commit("updateCarImagePath", "");
      commit("updateEditingStatus", false);

      api.deleteRequest(`db/car/${id}`);
    }
  },

  mutations: {
    updateLastCar(state, car) {
      state.lastCar = car;
      state.file = {};
      state.carImagePath = "";
      state.isEditing = true;
    },

    updateCarFile(state, file) {
      state.file = file;
    },

    updateCarImagePath(state, path) {
      state.carImagePath = path;
    },

    updateEditingStatus(state, status) {
      state.isEditing = status;
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
// TODO: перекидывание на страницу с Id сущности, там она уже редачится (done)
// TODO: delete - 404, в чем проблема (done)
// TODO: как разберешься с авто, перейти к заказам
// TODO: после заказов -> одна любая другая сущность
