export default {
  state: {
    myMap: {},
    center: [],
    placemarks: []
  },
  mutations: {
    updateCenter(state, center) {
      state.center = center;
    },

    updatePlacemarks(state, placemarks) {
      state.placemarks = placemarks;
    }
  },
  actions: {

    // initializing map
    init() {
      // eslint-disable-next-line no-undef
      this.myMap = new ymaps.Map(
        "map",
        {
          center: this.center,
          zoom: 12,
          controls: []
        },
        {}
      );

      this.myMap.setCenter(this.center, 12);
    }
  },
  getters: {
    getMap(state) {
      return state.myMap;
    },

    getCenter(state) {
      return state.center;
    },

    getPlacemarks(state) {
      return state.placemarks;
    }
  }
};
