export default {
  state: {
    myMap: {},
    // input coordinates (not map's attributes yet)
    center: [],
    placemarks: [],
    currentPoint: ""
  },
  mutations: {
    updateCenter(state, center) {
      state.center = center;
    },

    updatePlacemarks(state, placemarks) {
      state.placemarks = placemarks;
    },

    // initializing map
    initMap(state) {
      // eslint-disable-next-line no-undef
      state.myMap = new ymaps.Map(
        "map",
        {
          center: state.center,
          zoom: 12,
          controls: []
        },
        {}
      );

      // eslint-disable-next-line no-undef
      let placemarksCollection = new ymaps.GeoObjectCollection(null);

      for (let i = 0; i < state.placemarks.length; i++) {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          state.placemarks[i].center,
          { hintContent: state.placemarks[i].name },
          { preset: "islands#darkGreenCircleIcon" }
        );
        placemark.events.add("click", function() {
          state.myMap.setCenter(state.placemarks[i].center, 12, {
            duration: 500
          });
          state.currentPoint = state.placemarks[i].name;
        });
        placemarksCollection.add(placemark);
        state.myMap.geoObjects.add(placemarksCollection);
      }
    },

    // refocus map on the new center
    updateMapCenter(state) {
      state.myMap.setCenter(state.center, 12, {
        duration: 500
      });
    },

    // adding placemarks ON THE map
    updateMapPlacemarksConfig(state) {
      // eslint-disable-next-line no-undef
      let placemarksCollection = new ymaps.GeoObjectCollection(null);

      for (let i = 0; i < state.placemarks.length; i++) {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          state.placemarks[i].center,
          { hintContent: state.placemarks[i].name },
          { preset: "islands#darkGreenCircleIcon" }
        );
        placemark.events.add("click", function() {
          state.myMap.setCenter(state.placemarks[i].center, 12, {
            duration: 500
          });
          state.currentPoint = state.placemarks[i].name;
        });
        placemarksCollection.add(placemark);
        state.myMap.geoObjects.add(placemarksCollection);
      }
    }
  },

  actions: {
    updateCurrentPoint(context, point) {
      context.commit("updatePlace", point)
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
    },

    getCurrentPoint(state) {
      return state.currentPoint;
    }
  }
};
