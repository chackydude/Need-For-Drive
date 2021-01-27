<template>
  <div class="order">
    <div class="order__info">
      <div class="order-info__container">
        <img
          v-if="carId !== null"
          :src="getHandledCarId.imgPath"
          alt="car-image"
          class="order__image"
          crossOrigin="anonymous"
          referrerPolicy="origin"
        />
        <img
          v-if="carId === null"
          src="@/assets/images/admin/unknown-car.jpg"
          class="order__image order__image--unknown"
          alt="unknown-car"
        />
        <p class="order__description">
          <span>{{ getHandledCarId.modelName }}</span> в
          <span>{{ cityName }}</span
          >, {{ pointAddress }} <br />
          {{ dateFrom | toDate }} — {{ dateTo | toDate }} <br />
          Цвет: <span>{{ color }}</span> Статус: <span>{{ orderStatus }}</span>
        </p>
      </div>
      <div class="order__extra order-extra">
        <CheckInputItem
          class="order-extra__input"
          input-type="checkbox"
          name="Полный бак"
          :value="{ text: 'Полный бак', amount: 500 }"
          :checked="isFullTank"
          :id="id.toString() + '1'"
          :is-locked="true"
        />
        <CheckInputItem
          class="order-extra__input"
          input-type="checkbox"
          name="Детское кресло"
          :value="{ text: 'Детское кресло', amount: 200 }"
          :is-checked="isNeedChildChair"
          :id="id.toString() + '2'"
          :is-locked="true"
        />
        <CheckInputItem
          class="order-extra__input"
          input-type="checkbox"
          name="Правый руль"
          :value="{ text: 'Правый руль', amount: 1600 }"
          :is-checked="isRightWheel"
          :id="id.toString() + '3'"
          :is-locked="true"
        />
      </div>
    </div>

    <div class="order__additional-info">
      <p class="order__price">{{ price | toPrice }} ₽</p>
      <div class="order__action-buttons">
        <button class="action-button" @click="orderConfirm">
          <img src="@/assets/icons/admin/buttons/ready.svg" alt="ready" />
          <p class="action-button__text" >Готово</p>
        </button>
        <button class="action-button" @click="orderCancel">
          <img src="@/assets/icons/admin/buttons/close.svg" alt="cancel" />
          <p class="action-button__text">Отмена</p>
        </button>
        <button class="action-button" @click="editOrder">
          <img src="@/assets/icons/admin/buttons/edit.svg" alt="edit" />
          <p class="action-button__text">Изменить</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckInputItem from "../../common/CheckInputItem";
import dayjs from "dayjs";
import { mapActions, mapGetters } from "vuex";
import router from "../../../router";

export default {
  name: "AdminOrderItem",
  props: {
    id: String,
    cityName: String,
    pointAddress: String,
    color: String,
    price: Number,
    isFullTank: Boolean,
    isNeedChildChair: Boolean,
    isRightWheel: Boolean,
    dateTo: Number,
    dateFrom: Number,
    carId: Object,
    orderStatus: String
  },
  components: {
    CheckInputItem
  },
  methods: {
    ...mapActions(["fetchOrderById", "updateLastOrderStatus"]),
    editOrder() {
      this.fetchOrderById(this.id);
      router.push(`/admin/orders/${this.id}`);
    },
    async orderConfirm() {
      this.updateLastOrderStatus({
        statusId: this.getStatuses.confirmed,
        orderId: this.id
      });
    },
    async orderCancel() {
      await this.fetchOrderById(this.id);
      this.updateLastOrderStatus({
        statusId: this.getStatuses.cancelled,
        orderId: this.id
      });
    }
  },
  filters: {
    toPrice(str) {
      str = str.toString().replace(/(\.(.*))/g, "");
      let arr = str.split("");
      let strTemp = "";
      if (str.length > 3) {
        for (let i = arr.length - 1, j = 1; i >= 0; i--, j++) {
          strTemp = arr[i] + strTemp;
          if (j % 3 === 0) {
            strTemp = " " + strTemp;
          }
        }
        return strTemp;
      } else {
        return str;
      }
    },
    toDate(date) {
      return dayjs(date).format("DD.MM.YYYY hh:mm");
    }
  },
  computed: {
    ...mapGetters(["getStatuses"]),
    getHandledCarId() {
      if (this.carId === null) {
        return {
          modelName: "NO DATA"
        };
      } else {
        return {
          imgPath:
            "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/" +
            this.carId.thumbnail.path,
          modelName: this.carId.name
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../../public/css/mixins";
@import "../../../../public/css/variables";

.order {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 88px;
  padding: 13px 21px 13px 21px;
  transition: 1s;

  &:hover {
    background-color: $admin-light-gray;
  }
}

.order__image {
  width: 138px;
  margin-right: 28px;
}

.order__description {
  font-size: 13px;
  color: #889098;
  font-weight: lighter;
  padding-right: 20px;
  max-width: 250px;

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
  font-family: Roboto, sans-serif;
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
  color: $admin-text-gray;
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
  border-radius: 4px 0 0 4px !important;
  border-right: none;
}

.action-button:nth-child(2) {
  border-radius: 0 !important;
}

.action-button:last-child {
  border-radius: 0 4px 4px 0 !important;
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

  .order__image--unknown {
    height: 40px;
    width: 66px;
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

  .order__image--unknown {
    height: 40px;
    width: 66px;
  }

  .order__image--unknown {
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
