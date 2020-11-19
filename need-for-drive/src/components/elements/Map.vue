<template>
  <div id="map"></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    center: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: function() {
        return [55.751574, 37.573856];
      }
    },
    placemarks: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: function() {
        return [];
      }
    },
    city: String
  },
  name: "Map",
  data() {
    return {
      myMap: {} // instance of the map
    };
  },
  methods: {
    ...mapActions(["generatePlaceCoordinates"]),
    init1() {
      let currentPlacemarks = this.placemarks;
      // Создание экземпляра карты.
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

      let currentMap = this.myMap;

      // добавили на карту метки из коллекции
      // eslint-disable-next-line no-undef
      let example_collection = new ymaps.GeoObjectCollection(null);

      for (let i = 0; i < currentPlacemarks.length; i++) {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          currentPlacemarks[i],
          // { hintContent: currentPlacemarks[i].name },
          {},
          {
            preset: "islands#darkGreenCircleIcon"
          }
        );
        placemark.events.add("click", function() {
          currentMap.setCenter(currentPlacemarks[i], 13, {
            duration: 500
          });
        });
        example_collection.add(placemark);
        currentMap.geoObjects.add(example_collection);
      }

      // выставляем масштаб карты чтобы были видны все группы.
      // if (currentPlacemarks.length !== 0)
      //   myMap.setBounds(myMap.geoObjects.getBounds(), {
      //     zoomMargin: 50,
      //     checkZoomRange: true,
      //   });
      this.myMap.setCenter(this.center, 12);
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-undef
    ymaps.ready(this.init1);
  },
  watch: {
    center: function() {
      this.myMap.setCenter(this.center, 12, {
        duration: 500
      });
    },
    placemarks: function() {
      let currentPlacemarks = this.placemarks;
      let map = this.myMap;
      // eslint-disable-next-line no-undef
      let example_collection = new ymaps.GeoObjectCollection(null);

      for (let i = 0; i < currentPlacemarks.length; i++) {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          currentPlacemarks[i],
          // { hintContent: currentPlacemarks[i].name },
          {},
          {
            preset: "islands#darkGreenCircleIcon"
          }
        );
        placemark.events.add("click", function() {
          map.setCenter(currentPlacemarks[i], 13, {
            duration: 500
          });
          console.log(currentPlacemarks[i]);
        });
        example_collection.add(placemark);
        map.geoObjects.add(example_collection);
      }
    }
  }
};
</script>

<style>
#map {
  width: 756px;
  height: 352px;
}

[class*="ymaps-2"][class*="-ground-pane"] {
  -webkit-filter: grayscale(1);
}
</style>
