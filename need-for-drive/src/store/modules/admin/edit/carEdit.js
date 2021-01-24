// import Api from "../../../utils/api/Api";
// import { instance } from "../../../utils/api/instance";
// import AxiosApi from "../../../utils/api/AxiosApi";

export default {
  state: {
    lastCar: {}
  },

  getters: {
    getLastCar(state) {
      return state.lastCar;
    }
  },

  actions: {

  },

  mutations: {
    updateLastCar(state, car) {
      this.lastCar = car;
    }
  }
};
