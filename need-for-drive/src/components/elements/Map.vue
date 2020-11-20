<template>
    <div id="map"></div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  props: {
    center: {
      type: Array
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
      mapPlacemarks: this.placemarks
    };
  },
  name: "Map",
  methods: {
    ...mapActions(["emitUpdatePoint"]),
    ...mapMutations([
      "updateCenter",
      "updatePlacemarks",
      "initMap",
      "updateMapCenter",
      "updateMapPlacemarksConfig"
    ])
  },
  computed: {
    ...mapGetters(["getCenter", "getCurrentPoint"])
  },
  mounted() {
    this.updateCenter(this.center);
    // eslint-disable-next-line no-undef
    ymaps.ready(this.initMap);
  },
  watch: {
    center: function() {
      this.updateCenter(this.center);
      this.updateMapCenter();
    },
    placemarks: function() {
      this.updatePlacemarks(this.placemarks);
      this.updateMapPlacemarksConfig();
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
