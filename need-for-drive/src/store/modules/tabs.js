export default {
  state: {
    tabs: [
      {
        name: "Местоположение",
        isActive: true,
        isBlocked: false,
        isLast: false
      },
      {
        name: "Модель",
        isActive: false,
        isBlocked: false,
        isLast: false
      },
      {
        name: "Дополнительно",
        isActive: false,
        isBlocked: true,
        isLast: false
      },
      {
        name: "Итог",
        isActive: false,
        isBlocked: true,
        isLast: true
      }
    ]
  },
  mutations: {
    updateTab (state, city) {
      state.orderCity = city;
    },

    updatePlace(state, place) {
      state.orderPlace = place;
    }
  },
  actions: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });
      console.log(selectedTab.name);
    }
  },
  getters: {
    getCity(state) {
      return state.orderCity;
    },

    getPlace(state) {
      return state.orderPlace;
    }
  }
};
