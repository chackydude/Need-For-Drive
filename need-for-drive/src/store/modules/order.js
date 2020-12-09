import PriceCalculator from "../../utils/price/PriceCalculator";
import router from "../../router";
import FetchApi from "../../utils/api/FetchApi";
import Api from "../../utils/api/Api";

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
        // отправить заказ на бэк, получить ID заказа
        commit("updateOrderStatus", true);
        console.log(state.orderId);
        router.push(`/order/${state.orderId}`);
      } else {
        commit("updateOrderStatus", false);
        commit("updateOrderId", "");
        // удалить заказ с бека
      }
    },

    async postOrder({ commit }, order) {
      let fetchApi = new Api(new FetchApi());

      // сформировать тут заказ, либо в передать уже готорый в параметры
      await fetchApi
        .postRequest(
          process.env.VUE_APP_BASE_URL + "db/order",
          fetchApi.provider.headers,
          order
        )
        .then(result => {
          commit("updateOrderId", result.data.id);
        })
        .catch(error => {
          console.log(error.message);
        });
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
    },

    getOrder(state, getter) {
      let isFullTank = false;
      let isNeedChildChair = false;
      let isRightWheel = false;
      for (let i = 0; i < state.extraServices.length; i++) {
        switch (state.extraServices[i].text) {
          case "Детское кресло":
            isNeedChildChair = true;
            break;
          case "Правый руль":
            isRightWheel = true;
            break;
          case "Полный бак":
            isRightWheel = true;
            break;
        }
      }

      let orderStub = {
        orderStatusId: "5e26a191099b810b946c5d89", // new, add api
        cityId: "5e26a128099b810b946c5d87", // add api
        pointId: "5e26a148099b810b946c5d88", // add api
        carId: "5ea166b8099b810b946c62b6", // add api
        color: state.modelColor,
        dateFrom: new Date(state.rentalDateFrom).getTime(),
        dateTo: new Date(state.rentalDateTo).getTime(),
        rateId:
          state.tariff === "Поминутно, 7₽/мин"
            ? "5e26a0d2099b810b946c5d85"
            : "5e26a0d2099b810b946c5d86", // add api
        price: getter.getCurrentPrice,
        isFullTank: isFullTank,
        isNeedChildChair: isNeedChildChair,
        isRightWheel: isRightWheel
      };

      return orderStub;
    }
  }
};
