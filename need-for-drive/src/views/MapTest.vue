<template>
  <Map
          :center="[54.3335, 48.384285]"
          :placemarks="marks_example"
  />
</template>

<script>
import Map from "../components/elements/Map";
export default {
  name: "MapTest",
  components: {
    Map
  },
  data() {
    return {
      marks_example: [
        {
          name: "Ульяновск, Нариманова 1",
          center: [54.3335, 48.384285]
        },
        {
          name: "Ульяновск, Московское шоссе 34",
          center: [54.300985, 48.288264]
        },
        {
          name: "Ульяновск, Гончарова 27",
          center: [54.320883, 48.399934]
        }
      ],
      place: {
        name: "Ульяновск, Нариманова 42",
      }
    }
  }
};
</script>

<style scoped></style>
