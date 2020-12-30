<template>
  <div class="place-tab">
    <div class="place-tab__inputs inputs">
      <div class="inputs__input input-field">
        <label class="input-field__title">Город</label>
        <input
          type="search"
          class="input-field__input"
          placeholder="Ваш город"
          v-model.trim="userCity"
          @input="updateUserInput"
          list="cities"
        />
        <datalist id="cities">
          <option v-for="city in getCities" :key="city.id">
            {{ city.name }}
          </option>
        </datalist>
      </div>
      <div class="inputs__input input-field">
        <label class="input-field__title">Пункт выдачи</label>
        <input
          type="search"
          class="input-field__input"
          placeholder="Начните вводить пункт..."
          v-model.trim="userPoint"
          @input="updateUserPoint"
          list="points"
          :disabled="getCities.map(city => city.name).indexOf(getCity) === -1"
        />
        <datalist id="points">
          <option v-for="point in getPoints" :key="point.name">
            {{ point.address }}
          </option>
        </datalist>
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
      "checkTabsState"
    ]),
    ...mapActions([
      "fetchCities",
      "fetchPoints",
      "generatePlaceCoordinates",
      "generateCoordinatesForPoints",
      "generateCurrentCityId",
      "generateCurrentPointId",
      "checkOrderProperties",
      "getUserLocationCoordinates"
    ]),

    updateUserInput() {
      this.updateCity(this.userCity);
      this.generateCurrentCityId(this.userCity);
      this.fetchPoints(this.getCurrentCityId);
      this.updateFillStatus(this.isFilled);
      this.updateCityCoordinates();
      if (this.userCity.length === 0) {
        this.userPoint = "";
        this.updateUserPoint();
      }
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    updateUserPoint() {
      if (
        this.getPoints.map(point => point.address).indexOf(this.userPoint) !==
        -1
      ) {
        this.updatePlace(this.userPoint);
        this.generateCurrentPointId(this.userPoint);
        this.updateFillStatus(this.isFilled);
        this.updateCityCoordinates();
        this.checkOrderProperties(this.getCurrentTab.id);
        this.checkTabsState(this.getCurrentTab.id);
      }
    },

    updateCityCoordinates() {
      if (this.getCity.trim() !== "")
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
      "getCurrentCityId",
      "getCurrentTab"
    ]),

    isFilled() {
      return this.getPoint.trim() !== "" && this.getCity.trim() !== "";
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
      this.userPoint = this.getCurrentPoint;
      this.updatePlace(this.getCurrentPoint);
      this.updateFillStatus(this.isFilled);
      this.updateCityCoordinates();
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    getPoints: function() {
      this.generateCoordinatesForPoints(this.getPoints);
    }
  }
};
</script>

<style scoped lang="scss">
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
