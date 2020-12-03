import PriceCalculator from "../../utils/price/PriceCalculator";

export default {
  state: {
    orderCity: "",
    orderPlace: "",
    orderModel: {},
    modelColor: "",
    rentalTime: [],
    rentalDateFrom: "",
    rentalDateTo: "",
    tariff: "",
    extraServices: [],
    calculator: new PriceCalculator(1999, 7),
    tabMap: {
      orderCity: { tabId: 0, default: "" },
      orderPlace: { tabId: 0, default: "" },
      orderModel: { tabId: 1, default: {} },
      modelColor: { tabId: 2, default: "" },
      rentalTime: { tabId: 2, default: [] },
      rentalDateFrom: { tabId: 2, default: "" },
      rentalDateTo: { tabId: 2, default: "" },
      tariff: { tabId: 2, default: "" },
      extraServices: { tabId: 2, default: [] }
    }
  },
  mutations: {
    updateCity(state, city) {
      state.orderCity = city;
    },

    updatePlace(state, place) {
      state.orderPlace = place;
    },

    updateModel(state, model) {
      state.orderModel = model;
    },

    updateColor(state, color) {
      state.modelColor = color;
    },

    updateTariff(state, tariff) {
      state.tariff = tariff;
    },

    // пушит и в tabMap?
    updateServices(state, payload) {
      if (payload.status == "add") {
        state.extraServices.push(payload.value);
      } else {
        // TODO: optimize removing
        state.extraServices = state.extraServices.filter(
          items => items.text !== payload.value.text
        );
      }
    },

    updateRentalTime(state, time) {
      state.rentalTime = time;
    },

    // can replace by common mutation
    updateRentalDateFrom(state, date) {
      state.rentalDateFrom = date;
    },

    updateRentalDateTo(state, date) {
      state.rentalDateTo = date;
    },

    // template
    updateProperty(state, payload) {
      state[payload.propertyName] = payload.value;
      console.log("payload.value for " + payload.propertyName + ": " + payload.value)
    }
  },
  actions: {
    checkOrderProperties({ commit, state }, changedTab) {
      // очистка всех последующих данных
      for (let property in this.state.order.tabMap) {
        if (state.tabMap[property].tabId > changedTab) {
          commit("updateProperty", { propertyName: property, value: state.tabMap[property].default })
        }
      }
    },
  },
  getters: {
    getCity(state) {
      return state.orderCity;
    },

    getPoint(state) {
      return state.orderPlace;
    },

    getModel(state) {
      return state.orderModel;
    },

    getColor(state) {
      return state.modelColor;
    },

    getTariff(state) {
      return state.tariff;
    },

    getExtraServices(state) {
      return state.extraServices;
    },

    getRentalTime(state) {
      return state.rentalTime;
    },

    getDateFrom(state) {
      return state.rentalDateFrom;
    },

    getDateTo(state) {
      return state.rentalDateTo;
    },

    getCurrentPrice(state) {
      let tariff = state.tariff !== "На сутки, 1999 ₽/сутки" ? "minute" : "day";
      let price = state.calculator.calcPrice(
        state.rentalTime,
        tariff,
        state.extraServices.map(item => item.amount)
      );
      return price;
    }
  }
};
