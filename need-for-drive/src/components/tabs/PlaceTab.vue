<template>
  <div class="place-tab">
    <div class="place-tab__inputs inputs">

      <div class="inputs__input input-field">
        <label class="input-field__title">Город</label>
        <v-select
          class="input-field__input"
          :options="getCities.map(city => city.name)"
          placeholder="Ваш город"
          @input="updateUserInput"
          v-model.trim="userCity"
        ></v-select>

        <!--        <input-->
        <!--          type="search"-->
        <!--          class="input-field__input"-->
        <!--          placeholder="Ваш город"-->
        <!--          v-model.trim="userCity"-->
        <!--          @input="updateUserInput"-->
        <!--          list="cities"-->
        <!--        />-->
        <!--        <datalist id="cities">-->
        <!--          <option v-for="city in getCities" :key="city.id">-->
        <!--            {{ city.name }}-->
        <!--          </option>-->
        <!--        </datalist>-->
      </div>
      <div class="inputs__input input-field">
        <label class="input-field__title">Пункт выдачи</label>

        <v-select
          class="input-field__input"
          :label="'label'"
          :options="getPoints.map(point => point.address)"
          placeholder="Начните вводить пункт..."
          @input="updateUserPoint"
          :disabled="getCities.map(city => city.name).indexOf(getCity) === -1"
          v-model.trim="userPoint"
        ></v-select>
        <!--        <input-->
        <!--          type="search"-->
        <!--          class="input-field__input"-->
        <!--          placeholder="Начните вводить пункт..."-->
        <!--          v-model.trim="userPoint"-->
        <!--          @input="updateUserPoint"-->
        <!--          list="points"-->
        <!--          :disabled="getCities.map(city => city.name).indexOf(getCity) === -1"-->
        <!--        />-->
        <!--        {{ userPoint }}-->
        <!--        <datalist id="points">-->
        <!--          <option v-for="point in getPoints" :key="point.name">-->
        <!--            {{ point.address }}-->
        <!--          </option>-->
        <!--        </datalist>-->
      </div>
    </div>
    <div class="place-tab__map map-area">
      <p class="map-area__title">Выберите на карте:</p>
      <Map :center="getCoordinates" :placemarks="getPointsCoordinates" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Map from "../elements/Map";
import "vue-select/dist/vue-select.css";

export default {
  name: "PlaceTab",
  components: {
    Map
  },
  data() {
    return {
      userCity: "",
      userPoint: ""
    };
  },
  methods: {
    ...mapMutations([
      "updateCity",
      "updatePlace",
      "updateFillStatus",
      "checkTabsState",
      "updateCurrentCity",
      "updateCurrentPoint"
    ]),
    ...mapActions([
      "fetchCities",
      "fetchPoints",
      "generatePlaceCoordinates",
      "generateCoordinatesForPoints",
      "generateCurrentCityId",
      "generateCurrentPointId",
      "checkOrderProperties",
      "getUserLocationCoordinates",
      "getUserLocationCityByCoordinates"
    ]),

    updateUserInput() {
      this.updateCity(this.userCity);

      // map
      this.updateCurrentCity(this.userCity);

      this.generateCurrentCityId(this.userCity);
      if (this.getCurrentCityId) this.fetchPoints(this.getCurrentCityId);
      this.updateFillStatus(this.isFilled);
      this.updateCityCoordinates();
      if (this.userCity === null) {
        this.userPoint = "";
        this.updateUserPoint();
        this.updateCurrentPoint(null);
      }
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    updateUserPoint() {
      // if (
      //   this.getPoints.map(point => point.address).includes(this.userPoint) ||
      //   this.getPoints.map(point => point.address).includes(this.getPoint)
      // ) {
      this.updatePlace(this.userPoint);
      this.generateCurrentPointId(this.userPoint);
      this.updateFillStatus(this.isFilled);
      this.updateCityCoordinates();
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
      // }
    },

    updateCityCoordinates() {
      if (this.getCity !== null)
        this.generatePlaceCoordinates(this.getCity + " " + this.getPoint);
    }
  },
  computed: {
    ...mapGetters([
      "getCity",
      "getPoint",
      "getCities",
      "getPoints",
      "getCoordinates",
      "getPointsCoordinates",
      "getCurrentPoint",
      "getCurrentCity",
      "getCurrentCityId",
      "getCurrentTab",
      "getMap"
    ]),

    isFilled() {
      // return this.getPoint.trim() !== "" && this.getCity.trim() !== "";
      return this.getPoint !== null && this.getCity !== null;
    }
  },
  created() {
    this.userCity = this.getCity;
    this.userPoint = this.getPoint;
    if (this.getCities.length === 0) {
      this.fetchCities();
    }
  },

  watch: {
    getCurrentPoint: function() {
      this.userCity = this.getCurrentCity;
      this.updateCity(this.getCurrentCity);

      this.userPoint = this.getCurrentPoint;
      this.updatePlace(this.getCurrentPoint);

      this.updateFillStatus(this.isFilled);
      this.updateCityCoordinates();
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    // система реактивности
    getCurrentCity: function() {
      this.userCity = this.getCurrentCity;
      this.updateCity(this.getCurrentCity);

      this.userPoint = this.getCurrentPoint;
      this.updatePlace(this.getCurrentPoint);

      this.updateFillStatus(this.isFilled);
      // fixme

      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    getPoints: function() {
      this.generateCoordinatesForPoints(this.getPoints);
    }
  }
};
</script>

<style lang="scss">
@import "../../../public/css/mixins";
@import "../../../public/css/variables";

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
  align-self: flex-end;
  @include fontStylesLight;
}

.input-field__input {
  border: none;
  border-bottom: 1px solid $gray-color;
  @include fontStylesLight;
  min-width: 224px;
}

.vs__selected,
.vs__search,
.vs__selected:focus {
  padding: 0 !important;
  border: none !important;
  @include fontStylesLight;
  z-index: 0;  
}

.input-field__input .vs__search::placeholder,
.input-field__input .vs__dropdown-toggle,
.input-field__input .vs__dropdown-menu {
  border: none;
  padding-bottom: 0;
  padding-left: 0 !important;
  @include fontStylesLight;
  color: darken($gray-color, 15);
  margin-top: 0px;
}

.input-field__input .vs__open-indicator {
  display: none;
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
