export default {
  state: {
    tabMap: {
      orderCity: { tabId: 0, default: "" },
      orderPlace: { tabId: 0, default: "" },
      orderModel: { tabId: 1, default: {} },
      modelColor: { tabId: 2, default: "" },
      rentalTime: { tabId: 2, default: [] },
      rentalDateFrom: { tabId: 2, default: null },
      rentalDateTo: { tabId: 2, default: null },
      tariff: { tabId: 2, default: {} },
      extraServices: { tabId: 2, default: [] },
      currentRate: { tabId: 2, default: {} }
    }
  },
  actions: {
    checkOrderProperties({ commit, state }, changedTab) {
      // очистка всех последующих данных
      for (let property in state.tabMap) {
        if (state.tabMap[property].tabId > changedTab) {
          // поле extraServices вложенное в tabMap менялось паралельно с extraServices у корневого state
          // FIXME: fixed
          let value =
            property === "extraServices" ? [] : state.tabMap[property].default;
          commit("updateProperty", {
            propertyName: property,
            value: value,
          });
        }
      }
    }
  }
};
