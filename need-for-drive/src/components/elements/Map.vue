<template>
  <div id="map"></div>
</template>

<script>
export default {
  props: {
    center: {
      type: Array,
      default: function() {
        return [55.751574, 37.573856];
      }
    },
    placemarks: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      myMap: {}, // map instance
      mapCenter: this.center,
      mapPlacemarks: this.placemarks,
    };
  },
  name: "Map",
  methods: {
    // updating current point in the PlaceTab
    emitUpdatePoint(pointName) {
      this.$emit("updatePoint", pointName);
    },
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
  mounted() {
    // eslint-disable-next-line no-undef
    ymaps.ready(this.init);
  },
  watch: {
    center: function() {
      this.myMap.setCenter(this.center, 12, {
        duration: 500
      });
    },
    placemarks: function() {
      // FIXME: why this is still working?
      let currentPlacemarks = this.placemarks;
      let map = this.myMap;
      let update = this.emitUpdatePoint;

      // eslint-disable-next-line no-undef
      let placemarksCollection = new ymaps.GeoObjectCollection(null);

      for (let i = 0; i < currentPlacemarks.length; i++) {
        // eslint-disable-next-line no-undef
        let placemark = new ymaps.Placemark(
          currentPlacemarks[i].center,
          { hintContent: currentPlacemarks[i].name },
          { preset: "islands#darkGreenCircleIcon" }
        );
        placemark.events.add("click", function() {
          map.setCenter(currentPlacemarks[i].center, 12, {
            duration: 500
          });
          console.log(currentPlacemarks[i]);
          update(currentPlacemarks[i].name);
        });
        placemarksCollection.add(placemark);
        map.geoObjects.add(placemarksCollection);
      }
    }
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
