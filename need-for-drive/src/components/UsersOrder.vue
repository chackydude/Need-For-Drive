<template>
  <div class="users-order">
    <p class="users-order__title">Ваш заказ:</p>
    <div class="users-order__current-list list">
      <OderListItem
        class="list__order-item"
        name="Пункт выдачи"
        v-if="getCity !== ''"
      >
        {{ getCity }}, <br />
        {{ getPlace }}
      </OderListItem>
      <OderListItem
        class="list__order-item"
        name="Модель"
        :value="order.orderModel"
      />
      <OderListItem class="list__order-item" name="Цвет" value="Голубой" />
      <OderListItem
        class="list__order-item"
        name="Длительность аренды"
        :value="order.rentalTime"
      />
      <OderListItem class="list__order-item" name="Тариф" :value="order.userTariff" />
      <OderListItem class="list__order-item" name="Полный бак" value="Да" />
    </div>
    <div class="users-order__price">
      <span class="price__title">Цена:</span> от 8000 до 12000 ₽
    </div>
    <button
      class="users-order__button order-button"
      @click="unlockTab"
      :class="{ 'is-blocked': !getCurrentTab.isFilled }"
    >
      {{ buttonText[getCurrentTab.id] }}
    </button>
  </div>
</template>

<script>
import OderListItem from "./elements/OderListItem";
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
    ...mapGetters(["getCity", "getPlace", "getCurrentTab"])
  },
  methods: {
    ...mapMutations(["unlockNextTab"]),
    unlockTab() {
      this.unlockNextTab();
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

.is-blocked {
  @include buttonBlocked;
}

.users-order__button {
  margin-top: 26px;
}

@media (max-width: 1024px) {
  .users-order {
    border-left: none;
    padding: 10px;
  }
}
</style>
