<template>
  <div class="additional-page">
    <div class="additional-page__color-option">
      <p class="color-option__title">Цвет</p>
      <div class="color-option__radio-buttons">
        <RadioButton
          v-for="color in getModel.colors"
          :key="color"
          :name="upperFirst(color)"
          :id="color"
          @change="changeColor"
          :comparingValue="getColor"
          group-name="color"
        />
      </div>
    </div>
    <p class="additional-page__rent-title">Дата аренды:</p>
    <div class="additional-page__rent-date">
      <div class="rent-date__item rent-item">
        <label class="rent-item__title">С</label>
        <date-picker
          v-model="dateFrom"
          type="datetime"
          :default-value="new Date().setHours(12, 0, 0, 0)"
          :disabled-date="notBeforeToday"
          :disabled-time="notBeforeTodayTwelveOClock"
          value-type="format"
          placeholder="Введите дату и время"
          input-class="rent-item__input"
        ></date-picker>
      </div>
      <div class="rent-date__item rent-item">
        <label class="rent-item__title">По</label>
        <date-picker
          v-model="dateTo"
          type="datetime"
          :default-value="new Date().setHours(12, 0, 0, 0)"
          :disabled-date="notBeforeToday"
          :disabled-time="notBeforeTodayTwelveOClock"
          value-type="format"
          placeholder="Введите дату и время"
          input-class="rent-item__input"
        ></date-picker>
      </div>
    </div>
    <div class="additional-page__tariff tariff">
      <p class="tariff__title">Тариф:</p>
      <div class="tariff__items tariffs">
        <RadioButton
          @change="changeTariff"
          :comparingValue="getTariff"
          class="tariffs__item"
          id="byMinute"
          name="Поминутно, 7₽/мин"
          group-name="tariff"
        />
        <RadioButton
          @change="changeTariff"
          :comparingValue="getTariff"
          class="tariffs__item"
          id="byDay"
          name="На сутки, 1999 ₽/сутки"
          group-name="tariff"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "./common/RadioButton";
import { mapGetters, mapMutations } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "AdditionalTab",
  components: {
    RadioButton,
    DatePicker
  },
  data() {
    return {
      dateFrom: "",
      dateTo: ""
    };
  },
  methods: {
    ...mapMutations(["updateColor", "updateTariff"]),
    changeColor(color) {
      this.updateColor(color);
    },

    upperFirst(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    },

    changeTariff(tariff) {
      this.updateTariff(tariff);
    },

    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeTodayTwelveOClock(date) {
      return date < new Date(new Date().setHours(12, 0, 0, 0));
    }
  },
  computed: {
    ...mapGetters(["getModel", "getColor", "getTariff"])
  }
};
</script>

<style lang="scss">
@import "public/css/mixins";

$margin-title: 34px 0 16px 0;

.additional-page {
  @include fontStylesLight;
}

.additional-page__color-option {
  margin-top: 34px;
}

.color-option__radio-buttons {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.additional-page__rent-title {
  margin: $margin-title;
}

.additional-page__rent-date {
  .rent-item {
    margin-top: 13px;
  }
}

.rent-item {
  display: flex;
  flex-direction: row;

  .rent-item__input {
    margin-left: 8px;
  }
}

.rent-item__title {
  text-align: right;
  min-width: 20px;
}

.rent-item__input {
  border: none;
  border-bottom: 1px solid $gray-color;
  @include fontStylesLight;
  min-width: 224px;
}

.tariff__title {
  margin: $margin-title;
}

.tariffs__item {
  margin-top: 10px;
}
</style>
