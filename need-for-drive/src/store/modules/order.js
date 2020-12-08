import PriceCalculator from "../../utils/price/PriceCalculator";
import router from "../../router";

export default {
  namespaced: false,
  state: {
    orderId: "",
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
    isPosted: false,
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

    updateServices(state, payload) {
      console.log(payload);
      if (payload.status === "add") {
        state.extraServices.push(payload.value);
      } else {
        // TODO: optimize removing
        state.extraServices = state.extraServices.filter(item => {
          item.text !== payload.value.text;
        });
      }
    },

    updateRentalTime(state, time) {
      state.rentalTime = time;
    },

    updateRentalDateFrom(state, date) {
      state.rentalDateFrom = date;
    },

    updateRentalDateTo(state, date) {
      state.rentalDateTo = date;
    },

    updateOrderStatus(state, status) {
      state.isPosted = status;
    },

    updateOrderId(state, id) {
      state.orderId = id;
    },

    // template
    updateProperty(state, payload) {
      state[payload.propertyName] = payload.value;
    }
  },
  actions: {
    checkOrderProperties({ commit, state }, changedTab) {
      // очистка всех последующих данных
      for (let property in this.state.order.tabMap) {
        if (state.tabMap[property].tabId > changedTab) {
          // поле extraServices вложенное в tabMap менялось паралельно с extraServices у корневого state
          // FIXME: fixed
          let value =
            property === "extraServices" ? [] : state.tabMap[property].default;
          commit("updateProperty", {
            propertyName: property,
            value: value
          });
        }
      }
    },

    sendOrder({ commit, state }) {
      if (!state.isPosted) {
        commit("updateOrderStatus", true);
        // отправить заказ на бэк, получить ID заказа
        commit("updateOrderId", 123);
        router.push(`/order/${state.orderId}`);
      } else {
        commit("updateOrderStatus", false);
        commit("updateOrderId", "");
        // удалить заказ с бека
      }
    }
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
    },

    getOrderStatus(state) {
      return state.isPosted;
    },

    getOrderId(state) {
      return state.orderId;
    }
  }
};
