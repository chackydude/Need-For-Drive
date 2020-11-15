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
        />
      </div>
    </div>
    <div class="place-tab__map map-area">
      <p class="map-area__title">Выберите на карте:</p>
      <img
        src="@/assets/images/map-example.png"
        alt="map"
        class="map-area__map"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
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
    updateUserCity() {
      this.updateCity(this.userCity);
      this.updateFillStatus(this.isFilled);
    },
    updateUserPlace() {
      this.updatePlace(this.userAddress);
      this.updateFillStatus(this.isFilled);
    }
  },
  computed: {
    ...mapGetters(["getCity", "getPlace", "getCurrentTab"]),
    isFilled() {
      return this.getPlace != "" && this.getCity != "";
    }
  },
  mounted() {
    this.userCity = this.getCity;
    this.userAddress = this.getPlace;
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
