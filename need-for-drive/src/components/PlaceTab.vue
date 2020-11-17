<template>
  <div class="place-tab">
    <div class="place-tab__inputs inputs">
      <div class="inputs__input input-field">
        <p class="input-field__title">Город</p>
        <input
          type="search"
          class="input-field__input"
          placeholder="Ваш город"
          v-model.trim="userCity"
          @input="updateUserCity"
          list="cities"
        />
        <datalist id="cities">
          <option
            v-for="city in getCities"
            v-bind:key="city.name"
            :value="city.name"
          >
            {{ city.name }}
          </option>
        </datalist>
      </div>
      <div class="inputs__input input-field">
        <p class="input-field__title">Пункт выдачи</p>
        <input
          type="search"
          class="input-field__input"
          placeholder="Начните вводить пункт..."
          v-model.trim="userAddress"
          @input="updateUserPlace"
          list="points"
        />
        <datalist id="points">
          <option v-for="point in getPoints" v-bind:key="point" :value="point">
            {{ point }}
          </option>
        </datalist>
      </div>
    </div>
    <div class="place-tab__map map-area">
      <p class="map-area__title">Выберите на карте:</p>
      <!--      <img-->
      <!--        src="@/assets/images/map-example.png"-->
      <!--        alt="map"-->
      <!--        class="map-area__map"-->
      <!--      />-->
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad946e926b15d4d56810ed15b1e2723f43e29e96e15e778a9a76f8dbe02ab0204&amp;source=constructor"
        width="736"
        height="352"
        frameborder="0"
      ></iframe>
    </div>
    <button @click="updateCoordinates">current coordinates</button>
    <p v-if="getCoordinates.length !== 0"> {{ getCoordinates }} </p>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "PlaceTab",
  data() {
    return {
      userCity: "",
      userAddress: ""
    };
  },
  methods: {
    ...mapMutations(["updateCity", "updatePlace", "updateFillStatus"]),
    ...mapActions(["generatePlaceCoordinates"]),
    updateUserCity() {
      this.updateCity(this.userCity);
      this.updateFillStatus(this.isFilled);
    },
    updateUserPlace() {
      this.updatePlace(this.userAddress);
      this.updateFillStatus(this.isFilled);
    },
    updateCoordinates() {
      if (this.isFilled) this.generatePlaceCoordinates(this.getCity + " " + this.getPoint);
    }
  },
  computed: {
    ...mapGetters([
      "getCity",
      "getPoint",
      "getCurrentTab",
      "getCities",
      "getPoints",
      "getCoordinates"
    ]),
    isFilled() {
      return this.getPoint != "" && this.getCity != "";
    }
  },
  mounted() {
    this.userCity = this.getCity;
    this.userAddress = this.getPoint;
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
