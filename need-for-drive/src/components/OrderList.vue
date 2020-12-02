<template>
  <div class="users-order">
    <p class="users-order__title">Ваш заказ:</p>
    <div class="users-order__current-list list">
      <OderListItem class="list__order-item" name="Пункт выдачи" v-if="getCity">
        {{ getCity }}, <br />
        {{ getPoint }}
      </OderListItem>
      <OderListItem
        class="list__order-item"
        name="Модель"
        :value="getModel.name"
        v-if="getModel.name"
      />
      <OderListItem
        v-if="getColor"
        class="list__order-item"
        name="Цвет"
        :value="getColor"
      />
      <OderListItem
        v-if="getRentalTime.length > 1"
        class="list__order-item"
        name="Длительность аренды"
        :value="getRentalTime | toDate"
      />
      <OderListItem
        v-if="getTariff"
        class="list__order-item"
        name="Тариф"
        :value="getTariff"
      />
      <div v-if="getExtraServices.length !== 0">
        <OderListItem
          v-for="service in getExtraServices"
          :key="service.text"
          class="list__order-item"
          :name="service.text"
          value="Да"
        />
      </div>
    </div>
    <div
      class="users-order__price"
      v-if="
        Object.keys(getModel).length !== 0 &&
          getTariff !== '' &&
          getRentalTime.length > 0
      "
    >
      <span class="price__title">Цена: </span> {{ getCurrentPrice }} ₽
    </div>
    <div
      class="users-order__price"
      v-if="
        Object.keys(getModel).length !== 0 &&
          (getTariff === '' || getRentalTime.length === 0)
      "
    >
      <span class="price__title">Цена:</span> от {{ getModel.priceMin }} до
      {{ getModel.priceMax }} ₽
    </div>

    <button
      class="users-order__button order-button"
      @click="unlockTab"
      :class="{ 'order-button--blocked': ( !getCurrentTab.isFilled || ( error && getCurrentTab.name === 'Дополнительно')) }"
    >
      {{ buttonText[getCurrentTab.id] }}
    </button>

    <p v-if="error && getCurrentTab.isFilled" class="users-order__error-message error-message">{{ error }}</p>
  </div>
</template>

<script>
import OderListItem from "./elements/OrderListItem";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "UsersOrder",
  props: {
    order: Object
  },

  data() {
    return {
      buttonText: ["Выбрать модель", "Дополнительно", "Итого", "Заказать"]
    };
  },
  components: {
    OderListItem
  },
  computed: {
    ...mapGetters([
      "getCity",
      "getPoint",
      "getCurrentTab",
      "getModel",
      "getColor",
      "getTariff",
      "getExtraServices",
      "getRentalTime",
      "getCurrentPrice"
    ]),
    error() {
      if (this.getCurrentPrice > this.getModel.priceMax) {
        return "Слишком большая стоимость";
      }

      if (this.getCurrentPrice < this.getModel.priceMin) {
        return "Слишком низкая стоимость";
      }

      return "";
    }
  },
  methods: {
    ...mapMutations(["unlockNextTab"]),
    unlockTab() {
      this.unlockNextTab();
    }
  },
  filters: {
    toDate(data) {
      let dateFormat = ["д", "ч", "м"];
      let result = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i] === 0) continue;
        result += data[i] + dateFormat[i];
        result += " ";
      }
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";
.users-order {
  padding: 32px;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid $gray-light-color;
  margin-bottom: 20px;
}

.users-order__title {
  text-align: right;
  margin-bottom: 30px;
}

.list {
  .list__order-item {
    margin-bottom: 16px;
  }
}

.users-order__price {
  @include fontStylesLight;
  margin-top: 10px;
}

.price__title {
  font-weight: normal;
}

.order-button {
  height: 48px;
  max-width: 287px;
  width: 100%;
  border: none;
  border-radius: 8px;
  color: #fff;
  background-color: $main-accent-color;
  font-size: 16px;
  cursor: pointer;
  align-self: center;
  @include buttonStylesByColor($main-accent-color);
}

.order-button--blocked {
  @include buttonBlocked;
}

.users-order__button {
  margin-top: 26px;
}

.error-message {
  @include fontStylesLight;
  max-width: 287px;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffe0e8;
  color: $black-color;
  border-radius: 8px;
  align-self: center;
}

.users-order {
  .error-message {
    margin-top: 10px;
  }
}

@media (max-width: 1024px) {
  .users-order {
    border-left: none;
    padding: 10px;
    margin: 20px;
  }
}
</style>
