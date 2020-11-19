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
    },
    city: String
  },
  name: "Map",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["generatePlaceCoordinates"]),
    init1() {
      let currentPlacemarks = this.placemarks;
      // Создание экземпляра карты.
      // eslint-disable-next-line no-undef
      var myMap = new ymaps.Map(
        "map",
        {
          center: this.center,
          zoom: 12,
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
          myMap.setCenter(currentPlacemarks[i].center, 13, {
            duration: 500
          });
        });
        example_collection.add(placemark);
        myMap.geoObjects.add(example_collection);
      }

      // выставляем масштаб карты чтобы были видны все группы.
      if (currentPlacemarks.length !== 0)
        myMap.setBounds(myMap.geoObjects.getBounds(), {
          zoomMargin: 50
        });
    },
    init2() {
      let currentCity = this.city;
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
      // eslint-disable-next-line no-undef
      ymaps
        .geocode(currentCity, {
          results: 1
        })
        .then(function(res) {
          // Выбираем первый результат геокодирования.
          var firstGeoObject = res.geoObjects.get(0),
            // Координаты геообъекта.
            // eslint-disable-next-line no-unused-vars
            coords = firstGeoObject.geometry.getCoordinates(),
            // Область видимости геообъекта.
            bounds = firstGeoObject.properties.get("boundedBy");

          firstGeoObject.options.set(
            "preset",
            "islands#darkBlueDotIconWithCaption"
          );
          // Получаем строку с адресом и выводим в иконке геообъекта.
          firstGeoObject.properties.set(
            "iconCaption",
            firstGeoObject.getAddressLine()
          );

          // Добавляем первый найденный геообъект на карту.
          myMap.geoObjects.add(firstGeoObject);
          // Масштабируем карту на область видимости геообъекта.
          myMap.setBounds(bounds, {
            // Проверяем наличие тайлов на данном масштабе.
            checkZoomRange: true
          });
        });
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    ymaps.ready(this.init1);
  },
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
