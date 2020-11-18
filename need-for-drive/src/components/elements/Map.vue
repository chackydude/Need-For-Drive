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
        return new Array();
      }
    }
  },
  name: "Map",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["generatePlaceCoordinates"]),
    init() {
      let currentPlacemarks = this.placemarks;
      // Создание экземпляра карты.
      // eslint-disable-next-line no-undef
      var myMap = new ymaps.Map(
        "map",
        {
          center: this.center,
          zoom: 10,
          controls: []
        },
        {}
      );

      // добавили на карту метки из коллекции
      // eslint-disable-next-line no-undef
      let example_collection = new ymaps.GeoObjectCollection(null);

      for (let i = 0; i < currentPlacemarks.length; i++) {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          currentPlacemarks[i].center,
          { hintContent: currentPlacemarks[i].name },
          {
            preset: "islands#darkGreenCircleIcon"
          }
        );
        placemark.events.add("click", function() {
          myMap.setCenter(currentPlacemarks[i].center, 15, {
            duration: 500
          });
        });
        example_collection.add(placemark);
        myMap.geoObjects.add(example_collection);
      }

      // выставляем масштаб карты чтобы были видны все группы.
      if (currentPlacemarks.length !== 0) myMap.setBounds(myMap.geoObjects.getBounds());
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    ymaps.ready(this.init);
  },
  watch: {
    center: function () {
      // eslint-disable-next-line no-undef
      ymaps.ready(this.init);
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
