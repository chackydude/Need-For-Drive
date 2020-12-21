<template>
  <div class="order">
    <div class="order__info">
      <div class="order-info__container">
        <img
                src="@/assets/images/car-example.png"
                alt="car-image"
                class="order__image"
                crossOrigin="anonymous"
                referrerPolicy="origin"
        />
        <p class="order__description">
          <span>ELANTRA</span> в <span>Ульяновск</span>, Нариманова 42 <br />
          12.06.2019 12:00 — 13.06.2019 12:00 <br />
          Цвет: <span>Голубой</span>
        </p>
      </div>
      <div class="order__extra order-extra">
        <CheckInputItem
          class="order-extra__input"
          input-type="checkbox"
          name="Полный бак"
          :value="{ text: 'Полный бак', amount: 1600 }"
          :is-checked="false"
          id="1"
        />
        <CheckInputItem
          class="order-extra__input"
          input-type="checkbox"
          name="Полный бак"
          :value="{ text: 'Полный бак', amount: 1600 }"
          :is-checked="false"
          id="1"
        />
        <CheckInputItem
          class="order-extra__input"
          input-type="checkbox"
          name="Полный бак"
          :value="{ text: 'Полный бак', amount: 1600 }"
          :is-checked="false"
          id="1"
        />
      </div>
    </div>

    <div class="order__additional-info">
      <p class="order__price">4 300 ₽</p>
      <div class="order__action-buttons">
        <button class="action-button">
          <img src="@/assets/icons/admin/buttons/ready.svg" alt="ready" /> <p class="action-button__text">Готово</p>
        </button>
        <button class="action-button">
          <img src="@/assets/icons/admin/buttons/close.svg" alt="cancel" /> <p class="action-button__text">Отмена</p>
        </button>
        <button class="action-button">
          <img src="@/assets/icons/admin/buttons/edit.svg" alt="edit" /> <p class="action-button__text">Изменить</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckInputItem from "../common/CheckInputItem";
export default {
  name: "AdminOrderItem",
  props: {
    imgPath: String
  },
  components: {
    CheckInputItem
  }
};
</script>

<style lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.order {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 88px;
  padding: 13px 21px 13px 21px;
}

.order__image {
  height: 63px;
  width: 138px;
  margin-right: 28px;
}

.order__description {
  font-size: 13px;
  color: #889098;
  font-weight: lighter;
  padding-right: 20px;

  span {
    color: black;
  }
}

.order__extra {
  margin-left: 5vw;
  color: $gray-color;
}

.order-extra__input {
  margin-bottom: 7px;

  .radio-button__label {
    font-size: 10px;
  }
}

.order__price {
  font-size: 24px;
  color: #3f3f3f;
}

.order__action-buttons {
  width: auto;
  display: flex;
}

.action-button {
  height: 24px;
  width: auto;
  min-width: 71px;
  padding: 8px;
  font-size: 11px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #5a6169;
  border: 1px solid #becad6;
  @include buttonStylesByColor(#fff);
  cursor: pointer;

  img {
    margin-right: 3px;
  }
}

.order__info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.order-info__container {
  display: flex;
  flex-derection: row;
}

.order__additional-info {
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
}

.action-button:first-child {
  border-radius: 4px 0 0 4px;
  border-right: none;
}

.action-button:last-child {
  border-radius: 0 4px 4px 0;
  border-left: none;
}

@media (max-width: 1350px) {
  .order {
    flex-direction: column;
  }

  .order__info {
    display: flex;
    align-items: center;
    width: 90%;
  }

  .order__extra {
    margin-left: auto;
  }

  .order__price {
    margin-left: 35px;
  }

  .order__additional-info {
    margin-right: auto;
    margin-top: 15px;
    width: 90%;
    justify-content: space-between;
  }
}

@media (max-width: 850px) {
  .order__price {
    font-size: 20px;
  }

  .order__description {
    font-size: 10px;
  }

  .order__image {
    height: 30px;
    width: 66px;
    margin-right: 10px;
  }

  .order__price {
    margin-left: 10px;
  }
}

@media (max-width: 600px) {
  .action-button__text {
    display: none;
  }

  .order__image {
    height: 30px;
    width: 66px;
    margin-bottom: 10px;
  }

  .order__description {
    font-size: 8px;
  }

  .action-button {
    min-width: auto;

    img {
      margin: 0;
    }
  }
}


@media (max-width: 400px) {
  .order-info__container {
    flex-direction: column;
  }
}
</style>
