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
          :key="service"
          class="list__order-item"
          :name="service"
          value="Да"
        />
      </div>
    </div>
    <div class="users-order__price">
      <span class="price__title">Цена:</span> от 8000 до 12000 ₽
    </div>
    <button
      class="users-order__button order-button"
      @click="unlockTab"
      :class="{ 'order-button--blocked': !getCurrentTab.isFilled }"
    >
      {{ buttonText[getCurrentTab.id] }}
    </button>
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
      buttonText: ["Выбрать модель", "Дополнительно", "Итого", "Заказать"],
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
      "getRentalTime"
    ])
  },
  methods: {
    ...mapMutations(["unlockNextTab"]),
    unlockTab() {
      this.unlockNextTab();
    }
  },
  filters: {
    toDate (data) {
      let dateFormat = ["д", "ч"];
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

@media (max-width: 1024px) {
  .users-order {
    border-left: none;
    padding: 10px;
    margin: 20px;
  }
}
</style>
