<template>
  <div class="users-order">
    <p class="users-order__title">Ваш заказ:</p>
    <div class="users-order__current-list list">
      <OderListItem class="list__order-item">
        <div slot="name"><br />Пункт выдачи</div>
        <div slot="value">
          Ульяновск, <br />
          Нариманова 42
        </div>
      </OderListItem>
      <OderListItem class="list__order-item">
        <template slot="name">Модель</template>
        <template slot="value">Hyndai, i30 N</template>
      </OderListItem>
      <OderListItem class="list__order-item">
        <template slot="name">Цвет</template>
        <template slot="value">Голубой</template>
      </OderListItem>
      <OderListItem class="list__order-item">
        <template slot="name">Длительность аренды</template>
        <template slot="value">1д 2ч</template>
      </OderListItem>
      <OderListItem class="list__order-item">
        <template slot="name">Тариф</template>
        <template slot="value">На сутки</template>
      </OderListItem>
      <OderListItem class="list__order-item">
        <template slot="name">Полный бак</template>
        <template slot="value">Да</template>
      </OderListItem>
    </div>
    <div class="users-order__price">
      <span class="price__title">Цена:</span> от 8000 до 12000 ₽
    </div>
    <button class="users-order__button order-button">
      Выбрать модель
    </button>
  </div>
</template>

<script>
import OderListItem from "./utils/OderListItem";
export default {
  name: "UsersOrder",
  components: {
    OderListItem
  },
  data() {
    return {
      orderPlace: "",
      orderModel: "",
      modelColor: "",
      rentalTime: "",
      extraServices: []
    };
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";
.users-order {
  padding: 32px;
  max-width: 319px;
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
  @include buttonStylesByColor($main-accent-color);
}

.users-order__button {
  margin-top: 26px;
}
</style>
