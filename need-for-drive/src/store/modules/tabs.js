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
        isBlocked: true,
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
        isFilled: true
      }
    ]
  },

  getters: {
    getTabs(state) {
      return state.tabs;
    },

    getCurrentTab(state) {
      return state.tabs.filter(tab => tab.isActive)[0];
    }
  },
  actions: {},
  mutations: {
    selectTab(state, selectedTab) {
      state.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });
    },

    updateToDefault(state) {
      for (let i = 0; i < state.tabs.length; i++) {
        i === 0
          ? (state.tabs[i].isActive = true)
          : (state.tabs[i].isActive = false);
        i === 0
          ? (state.tabs[i].isBlocked = false)
          : (state.tabs[i].isBlocked = true);
        i === state.tabs.length - 1
          ? (state.tabs[i].isFilled = true)
          : (state.tabs[i].isFilled = false);
      }
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
      state.tabs.forEach(tab => {
        if (tab.isActive) {
          tab.isFilled = isFilled;
        }
      })
    },

    checkTabsState(state, tabId) {
      for (let i = tabId + 1; i < state.tabs.length; i++) {
        state.tabs[i].isBlocked = true;
        state.tabs[i].isFilled = false;
      }
    }
  }
};
