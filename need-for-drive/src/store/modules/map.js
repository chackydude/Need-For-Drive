export default {
  state: {
    myMap: {},
    // input coordinates (not map's attributes yet)
    center: [],
    placemarks: [],
    currentPoint: "",
    currentCity: ""
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
    },

    getCurrentCity(state) {
      return state.currentCity;
    }
  },

  // FIXME: replace by mutation
  actions: {
    updateCurrentPoint({ commit }, point) {
      commit("updatePlace", point);
    }
  },

  mutations: {
    updateCenter(state, center) {
      state.center = center;
    },

    updatePlacemarks(state, placemarks) {
      state.placemarks = placemarks;
    },

    updateCurrentCity(state, city) {
      state.currentCity = city;
    },

    updateCurrentPoint(state, point) {
      state.currentPoint = point;
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

      state.placemarks.forEach(placemarkData => {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          placemarkData.center,
          { hintContent: placemarkData.name },
          { preset: "islands#darkGreenCircleIcon" }
        );
        placemark.events.add("click", function() {
          state.myMap.setCenter(placemarkData.center, 12, {
            duration: 500
          });
          state.currentPoint = placemarkData.name;
          state.currentCity = placemarkData.city;
          console.log(placemarkData);
        });
        placemarksCollection.add(placemark);
        state.myMap.geoObjects.add(placemarksCollection);
      });
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

      state.placemarks.forEach(placemarkData => {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          placemarkData.center,
          { hintContent: placemarkData.name },
          { preset: "islands#darkGreenCircleIcon" }
        );
        placemark.events.add("click", function() {
          state.myMap.setCenter(placemarkData.center, 12, {
            duration: 500
          });
          state.currentPoint = placemarkData.name;
          state.currentCity = placemarkData.city
          console.log(placemarkData)
        });
        placemarksCollection.add(placemark);
        state.myMap.geoObjects.add(placemarksCollection);
      });
    }
  }
};
