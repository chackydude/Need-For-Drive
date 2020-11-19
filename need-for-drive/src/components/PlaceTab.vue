<template>
  <div class="place-tab">
    <div class="place-tab__inputs inputs">
      <div class="inputs__input input-field">
        <p class="input-field__title">Город</p>
        <input
          class="input-field__input"
          placeholder="Ваш город"
          v-model.trim="userCity"
          @input="updateUserCity"
          list="cities"
        />
        <datalist id="cities">
          <option v-for="city in getCities" :key="city.id">
            {{ city.name }}
          </option>
        </datalist>
      </div>
      <div class="inputs__input input-field">
        <p class="input-field__title">Пункт выдачи</p>
        <input
          class="input-field__input"
          placeholder="Начните вводить пункт..."
          v-model.trim="userAddress"
          @input="updateUserPlace"
          list="points"
        />
        <datalist id="points">
          <option v-for="point in getPointsForCurrentCity" :key="point.name">
            {{ point.address }}
          </option>
        </datalist>
      </div>
    </div>
    <div class="place-tab__map map-area">
      <p class="map-area__title">Выберите на карте:</p>
      <Map :center="getCityCoordinates" :placemarks="marks_example"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Map from "./elements/Map";
export default {
  name: "PlaceTab",
  components: {
    Map
  },
  data() {
    return {
      userCity: "",
      userAddress: "",
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
      ]
    };
  },
  methods: {
    ...mapMutations(["updateCity", "updatePlace", "updateFillStatus"]),
    ...mapActions([
      "generatePlaceCoordinates",
      "fetchCities",
      "fetchPoints",
      "generateCoordinatesForPoints"
    ]),
    updateUserCity() {
      this.updateCity(this.userCity);
      this.updateFillStatus(this.isFilled);
      this.updateCityCoordinates();
    },
    updateUserPlace() {
      this.updatePlace(this.userAddress);
      this.updateFillStatus(this.isFilled);
    },

    updateCityCoordinates() {
      this.generatePlaceCoordinates(this.getCity);
    }
  },
  computed: {
    ...mapGetters([
      "getCity",
      "getPoint",
      "getCurrentTab",
      "getCities",
      "getPoints",
      "getCoordinates",
      "getCurrentCity",
      "getPoints",
      "getFullAddress",
      "getPointsCoordinates"
    ]),
    isFilled() {
      return this.getPoint != "" && this.getCity != "";
    },

    // here u can add array of objects like: {name: "Kazan, Pyshkina 1", center: [55.1234, 49.1231]}
    getPointsForCurrentCity() {
      return this.getPoints.filter(point => point.cityId.name === this.getCity);
    },
    getCityCoordinates() {
      if (this.getCoordinates.length === 0) {
        return [55.751574, 37.573856];
      } else return this.getCoordinates;
    }
  },
  mounted() {
    this.userCity = this.getCity;
    this.userAddress = this.getPoint;
    this.fetchCities();
    this.fetchPoints();
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.place-tab__inputs {
  margin-top: 32px;
}

.inputs {
  display: flex;
  flex-direction: column;

  .input-field {
    margin-top: 10px;
  }
}

.input-field {
  display: flex;
  flex-direction: row;

  .input-field__input {
    margin-left: 8px;
  }
}

.input-field__title {
  text-align: right;
  min-width: 92px;
  @include fontStylesLight;
}

.input-field__input {
  border: none;
  border-bottom: 1px solid $gray-color;
  @include fontStylesLight;
  min-width: 224px;
}

.place-tab__map {
  margin-top: 45px;
}

.map-area__title {
  @include fontStylesLight;
  margin-bottom: 16px;
}

.map-area__map {
  width: 40vw;
}

@media (max-width: 768px) {
  .map-area__map {
    width: 300px;
  }

  .input-field__input {
    min-width: 150px;
  }
}
</style>
