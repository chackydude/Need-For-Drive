import PriceCalculator from "../../utils/price/PriceCalculator";
import DateHadler from "../../utils/date/DateHadler";
import router from "../../router";
import Api from "../../utils/api/Api";
import AxiosApi from "../../utils/api/AxiosApi";

export default {
  namespaced: false,
  state: {
    orderId: "",
    orderCity: "",
    orderPlace: "",
    orderModel: {},
    modelColor: "",
    rentalTime: [],
    rentalDateFrom: 0,
    rentalDateTo: 0,

    tariff: {},
    extraServices: [],

    calculator: null,
    dateHandler: new DateHadler(),
    isPosted: false,

    availableStatuses: [],
    currentOrderStatusId: "",

    rates: [],
    currentRate: {}
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
      let tariff;

      switch (state.tariff.text) {
        case "Поминутно, 7₽/мин":
          tariff = "minute";
          break;
        case "На сутки, 1999₽/сутки":
          tariff = "day";
          break;
        case "Недельный, 7000₽/7 дней":
          tariff = "week";
          break;
      }

      let price =
        state.calculator === null
          ? 0
          : state.calculator.calcPrice(
              state.rentalTime,
              tariff,
              state.extraServices.map(item => item.amount)
            );
      return price;
    },

    getOrderStatus(state) {
      return state.isPosted;
    },

    getRates(state) {
      return state.rates;
    },

    getCurrentRate(state) {
      return state.currentRate;
    },

    getOrderId(state) {
      return state.orderId;
    },

    getAvailableStatuses(state) {
      return state.availableStatuses;
    },

    getOrder(state, getters, rootState) {
      let isFullTank = false;
      let isNeedChildChair = false;
      let isRightWheel = false;

      state.extraServices.forEach(service => {
        switch (service.text) {
          case "Детское кресло":
            isNeedChildChair = true;
            break;
          case "Правый руль":
            isRightWheel = true;
            break;
          case "Полный бак":
            isFullTank = true;
            break;
        }
      });

      let orderStub = {
        orderStatusId: state.currentOrderStatusId,
        pointId: rootState.place.currentPointId,
        cityId: rootState.place.currentCityId,
        carId: state.orderModel.id,
        color: state.modelColor,
        dateFrom: state.rentalDateFrom,
        dateTo: state.rentalDateTo,
        rateId: state.tariff.id,
        price: getters.getCurrentPrice,
        isFullTank: isFullTank,
        isNeedChildChair: isNeedChildChair,
        isRightWheel: isRightWheel
      };
      return orderStub;
    }
  },

  actions: {
    // example: https://geocode-maps.yandex.ru/1.x/?geocode=27.525773,53.89079
    // getting user's location city
    async getUserLocationCityByCoordinates({ rootState, commit }) {
      let api = new Api(new AxiosApi());
      api
        .getRequest(
          process.env.VUE_APP_GEOCODE_URL +
            process.env.VUE_APP_MAPS_API_KEY +
            "&format=json&geocode=" +
            rootState.place.currentCityCoordinates[1] +
            "," +
            rootState.place.currentCityCoordinates[0]
        )
        .then(result => {
          console.log(
            result.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
              component => component.kind === "locality"
            )[0].name
          );
          commit(
            "updateCity",
            result.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
              component => component.kind === "locality"
            )[0].name
          );
        })
        .catch(error => console.log(error.message));
    },

    // роутимся на страничку заказа и обновляем сопутствующую информацию
    routeToOrder({ commit, state }) {
      if (!state.isPosted) {
        commit("updateOrderStatus", true);
        router.push(`/order/${state.orderId}`);
      } else {
        commit("updateOrderStatus", false);
        commit("updateOrderId", "");
      }
    },

    // получаем заказ по id
    fetchOrder({ commit }, id) {
      let api = new Api(new AxiosApi());

      api
        .getRequest("db/order/" + id)
        .then(result => {
          commit("updateOrder", result.data);
          commit("updateCurrentCityId", result.data.cityId.id);
          commit("updateCurrentPointId", result.data.pointId.id);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    // отправляем заказ на бек
    async postOrder({ commit }, order) {
      let api = new Api(new AxiosApi());

      // сформировать тут заказ, либо в передать уже готовый в параметры
      await api
        .postRequest("db/order", order)
        .then(result => {
          commit("updateOrderId", result.data.id);
          localStorage.setItem("orderId", result.data.id);
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    cancelOrder({ state }, order) {
      let api = new Api(new AxiosApi());

      api.putRequest("db/order/" + state.orderId, order).catch(error => {
        console.log(error.message);
      });

      localStorage.removeItem("orderId");
    },

    fetchRates({ commit }) {
      let api = new Api(new AxiosApi());
      api
        .getRequest("db/rate")
        .then(result => {
          commit("updateRates", result.data);
          commit(
            "updateCalculator",
            new PriceCalculator(
              result.data[0].price,
              result.data[2].price,
              result.data[1].price
            )
          );
        })
        .catch(error => {
          console.log(error.message);
        });
    },

    fetchOrderStatuses({ commit }) {
      let api = new Api(new AxiosApi());
      api
        .getRequest("db/orderStatus")
        .then(result => {
          commit("updateStatuses", result.data);
        })
        .catch(error => {
          console.log(error.message);
        });
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
      if (payload.status === "add") {
        state.extraServices.push(payload.value);
      } else {
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
    },

    updateRates(state, rates) {
      state.rates = rates;
    },

    updateCurrentRate(state, rate) {
      state.currentRate = rate;
    },

    updateStatuses(state, statuses) {
      state.availableStatuses = statuses;
    },

    updateCalculator(state, calc) {
      state.calculator = calc;
    },

    // updating status id with the name of status
    updateStatusId(state, status) {
      state.availableStatuses.some(availableStatus => {
        if (availableStatus.name === status) {
          state.currentOrderStatusId = availableStatus.id;
          return availableStatus.name === status;
        } else return false;
      });
    },

    updateOrder(state, newOrder) {
      console.log(newOrder);
      let model = {
        colors: newOrder.carId.colors,
        id: newOrder.carId.id,
        name: newOrder.carId.name,
        number: newOrder.carId.number,
        priceMax: newOrder.carId.priceMax,
        priceMin: newOrder.carId.priceMin,
        tank: newOrder.carId.tank,
        thumbnail: newOrder.carId.thumbnail.path
      };
      let extraServices = [];
      if (newOrder.isFullTank) {
        extraServices.push({
          amount: 500,
          text: "Полный бак"
        });
      }
      if (newOrder.isNeedChildChair) {
        extraServices.push({
          amount: 200,
          text: "Детское кресло"
        });
      }
      if (newOrder.isRightWheel) {
        extraServices.push({
          amount: 1600,
          text: "Правый руль"
        });
      }
      state.orderId = newOrder.id;
      state.orderCity = newOrder.cityId.name;
      state.orderPlace = newOrder.pointId.address;
      state.orderModel = model;
      state.modelColor = newOrder.color;
      state.rentalTime = state.dateHandler.calcDateDiff(
        newOrder.dateFrom,
        newOrder.dateTo
      );
      state.rentalDateFrom = newOrder.dateFrom;
      state.rentalDateTo = newOrder.dateTo;
      state.tariff = {
        text:
          newOrder.rateId.rateTypeId.name +
          ", " +
          newOrder.rateId.price +
          "₽/" +
          newOrder.rateId.rateTypeId.unit,
        id: newOrder.rateId.id
      };
      state.extraServices = extraServices;
      state.currentOrderStatusId = newOrder.orderStatusId.id;
    }
  }
};
