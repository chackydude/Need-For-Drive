export default {
  state: {
    tabs: [
      {
        id: 0,
        name: "Местоположение",
        isActive: true,
        isBlocked: false,
        isLast: false,
        isFilled: false
      },
      {
        id: 1,
        name: "Модель",
        isActive: false,
        isBlocked: false, // changed
        isLast: false,
        isFilled: false
      },
      {
        id: 2,
        name: "Дополнительно",
        isActive: false,
        isBlocked: true,
        isLast: false,
        isFilled: false
      },
      {
        id: 3,
        name: "Итог",
        isActive: false,
        isBlocked: true,
        isLast: true,
        isFilled: false
      }
    ]
  },
  mutations: {
    selectTab(state, selectedTab) {
      state.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });
    },

    unlockNextTab(state) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].isActive && i < state.tabs.length - 1) {
          state.tabs[i].isActive = false;
          state.tabs[i + 1].isBlocked = false;
          state.tabs[i + 1].isActive = true;
          break;
        }
      }
    },

    updateFillStatus(state, isFilled) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].isActive) {
          state.tabs[i].isFilled = isFilled;
        }
      }
    }
  },
  actions: {},
  getters: {
    getTabs(state) {
      return state.tabs;
    },

    getCurrentTab(state) {
      return state.tabs.filter(tab => tab.isActive)[0];
    }
  }
};
