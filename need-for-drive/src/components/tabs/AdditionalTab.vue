<template>
  <div class="additional-page">
    <div class="additional-page__color-option">
      <p class="color-option__title">Цвет</p>
      <div class="color-option__radio-buttons">
        <CheckInputItem
          name="Любой"
          :value="{ text: 'Любой' }"
          id="each"
          @change="changeColor"
          :comparingValue="getColor"
          group-name="color"
          class="color-button"
        />
        <CheckInputItem
          v-for="color in getModel.colors"
          :key="color"
          :name="upperFirst(color)"
          :value="{ text: upperFirst(color) }"
          :id="color"
          @change="changeColor"
          :comparingValue="getColor"
          group-name="color"
          class="color-button"
        />
      </div>
    </div>
    <p class="additional-page__rent-title">Дата аренды:</p>
    <div class="additional-page__rent-date">
      <div class="rent-date__item rent-item">
        <label class="rent-item__title">С</label>
        <date-picker
          v-model="dateFrom"
          valueType="timestamp"
          type="datetime"
          :disabled-date="notBeforeToday"
          value-type="format"
          placeholder="Введите дату и время"
          input-class="rent-item__input"
          @change="updateCurrentDateFrom"
        ></date-picker>
      </div>
      <div class="rent-date__item rent-item">
        <label class="rent-item__title">По</label>
        <date-picker
          v-model="dateTo"
          type="datetime"
          valueType="timestamp"
          :disabled-date="notBeforeDateFrom"
          :disabled-time="notBeforeDateFromHours"
          value-type="format"
          placeholder="Введите дату и время"
          input-class="rent-item__input"
          @change="changeRentalTime"
          :disabled="this.dateFrom === null"
        ></date-picker>
      </div>
    </div>
    <div class="additional-page__tariff tariff">
      <p class="tariff__title">Тариф:</p>
      <div class="tariff__items tariffs">
        <CheckInputItem
          v-for="rate in getRates"
          :key="rate.id"
          @change="changeTariff"
          :comparingValue="getTariff.text"
          class="tariffs__item"
          :id="rate.id"
          :name="rate.rateTypeId.name + ', ' + rate.price + '₽/' + rate.rateTypeId.unit"
          :value="{ text: rate.rateTypeId.name + ', ' + rate.price + '₽/' + rate.rateTypeId.unit, id: rate.id }"
          group-name="tariff"
        />
      </div>
    </div>
    <div class="additional-page__extra-services extra-services">
      <p class="extra-services__title">Доп. услуги</p>
      <div class="extra-services__items ">
        <CheckInputItem
          input-type="checkbox"
          @change="addExtraService"
          class="extras__item"
          id="full-fuel"
          name="Полный бак, 500р"
          :value="{ text: 'Полный бак', amount: 500 }"
          group-name="extra-services"
          :comparing-value="getExtraServices"
        />
        <CheckInputItem
          input-type="checkbox"
          @change="addExtraService"
          class="extras__item"
          id="kid-chair"
          name="Детское кресло, 200р"
          :value="{ text: 'Детское кресло', amount: 200 }"
          group-name="extra-services"
          :comparing-value="getExtraServices"
        />
        <CheckInputItem
          input-type="checkbox"
          @change="addExtraService"
          class="extras__item"
          id="right-rudder"
          name="Правый руль, 1600р"
          :value="{ text: 'Правый руль', amount: 1600 }"
          group-name="extra-services"
          :comparing-value="getExtraServices"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CheckInputItem from "../common/CheckInputItem";
import { mapGetters, mapMutations, mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import DateHadler from "../../utils/date/DateHadler";

export default {
  name: "AdditionalTab",
  components: {
    CheckInputItem,
    DatePicker
  },
  data() {
    return {
      dateFrom: null,
      dateTo: null
    };
  },
  methods: {
    ...mapActions([
      "checkOrderProperties",
      "checkOrderProperties",
      "fetchOrderStatuses"
    ]),
    ...mapMutations([
      "updateColor",
      "updateTariff",
      "updateServices",
      "updateFillStatus",
      "updateRentalTime",
      "updateRentalDateFrom",
      "updateRentalDateTo",
      "checkTabsState"
    ]),
    changeColor(color) {
      this.updateColor(color.text);
      this.updateFillStatus(this.isFilled);
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    upperFirst(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    },

    changeTariff(tariff) {
      this.updateTariff(tariff);
      this.updateFillStatus(this.isFilled);
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    updateCurrentDateFrom() {
      if (this.dateFrom === null) {
        this.dateFrom = null;
        this.dateTo = null;
        this.updateRentalDateFrom(this.dateFrom);
        this.updateRentalTime(this.getDateDiff);
        this.updateFillStatus(this.isFilled);
      }
      this.updateRentalDateFrom(this.dateFrom);
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    changeRentalTime() {
      if (this.dateTo == null) {
        this.dateFrom = null;
        this.dateTo = null;
      }
      this.updateRentalDateTo(this.dateTo);
      this.updateRentalTime(this.getDateDiff);
      this.updateFillStatus(this.isFilled);
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },

    addExtraService(service) {
      if (
        !(
          this.getExtraServices.map(item => item.text).indexOf(service.text) >=
          0
        )
      ) {
        this.updateServices({ status: "add", value: service });
      } else {
        this.updateServices({ status: "remove", value: service });
      }
    },

    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },

    notBeforeDateFrom(date) {
      return date < new Date(new Date(this.dateFrom).setHours(0, 0, 0, 0));
    },

    notBeforeDateFromHours(date) {
      let currentDate = new Date(this.dateFrom);
      let currentMinutes =
        currentDate.getMinutes() === 60 ? 0 : currentDate.getMinutes();
      return (
        date <=
        new Date(currentDate).setHours(
          currentDate.getHours(),
          currentMinutes + 10,
          1,
          0
        )
      );
    }
  },
  computed: {
    ...mapGetters([
      "getModel",
      "getColor",
      "getTariff",
      "getExtraServices",
      "getRentalTime",
      "getDateFrom",
      "getDateTo",
      "getCurrentTab",
      "getRates"
    ]),

    isFilled() {
      return (
        this.getColor !== "" &&
        this.getTariff !== "" &&
        this.getRentalTime.length !== 0
      );
    },

    getDateDiff() {
      return new DateHadler().calcDateDiff(this.dateFrom, this.dateTo);
    }
  },
  created() {
    this.dateFrom = this.getDateFrom;
    this.dateTo = this.getDateTo;
    this.fetchOrderStatuses();
  }
  // mounted() {
  //   // eslint-disable-next-line no-unused-vars
  //   this.$store.subscribe((mutation, state) => {
  //     if (mutation.type !== "updateProperty") {
  //       this.checkOrderProperties({ propertyData: mutation.payload, tab: this.getCurrentTab.id });
  //     }
  //   });
  // },
};
</script>

<style lang="scss">
@import "../../../public/css/mixins";

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
  flex-wrap: wrap;
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
}

.tariff__title,
.extra-services__title {
  margin: $margin-title;
}

.tariffs__item,
.extras__item {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .additional-page {
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
  }

  .additional-page__rent-title,
  .rent-item__title,
  .tariff__title,
  .extra-services__title,
  .color-option__title {
    text-align: center;
  }

  .color-button {
    margin: 2px;
  }
}
</style>
