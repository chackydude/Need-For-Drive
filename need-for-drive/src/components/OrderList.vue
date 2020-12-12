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
        v-if="getTariff.text"
        class="list__order-item"
        name="Тариф"
        :value="getTariff.text"
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
      <span class="price__title">Цена: </span> {{ getCurrentPrice | toPrice }} ₽
    </div>
    <div
      class="users-order__price"
      v-if="
        Object.keys(getModel).length !== 0 &&
          (getTariff === '' || getRentalTime.length === 0)
      "
    >
      <span class="price__title">Цена:</span> от
      {{ getModel.priceMin | toPrice }} до {{ getModel.priceMax | toPrice }} ₽
    </div>

    <button
      class="users-order__button order-button"
      @click="unlockTab"
      :class="{
        'order-button--blocked':
          !getCurrentTab.isFilled ||
          (error && getCurrentTab.name === 'Дополнительно'),
        'order-button--sended': getOrderStatus
      }"
    >
      {{ getOrderStatus ? "Отменить" : buttonText[getCurrentTab.id] }}
    </button>

    <p
      v-if="
        error &&
          getCurrentTab.isFilled &&
          getCurrentTab.name === 'Дополнительно'
      "
      class="users-order__error-message error-message"
    >
      {{ error }}
    </p>

    <div
      class="user-order__confirm confirm"
      v-if="confirm"
      @click="confirm = false"
    >
      <div>
        <p class="confirm__title">
          {{ getOrderStatus ? "Отменить заказ" : "Подтвердить заказ" }}
        </p>
        <div class="confirm__buttons">
          <router-link
            tag="button"
            :to="getOrderStatus ? '/order' : `/order/${getOrderId}`"
            class="confirm__accept-button"
            @click.native="sendCurrentorder"
          >
            {{ getOrderStatus ? "Отменить" : "Подтвердить" }}
          </router-link>
          <button class="confirm__cancel-button">
            Вернуться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OderListItem from "./elements/OrderListItem";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "UsersOrder",

  data() {
    return {
      buttonText: ["Выбрать модель", "Дополнительно", "Итого", "Заказать"],
      confirm: false
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
      "getCurrentPrice",
      "getOrderStatus",
      "getOrderId",
      "getOrder",
      "getAvailableStatuses"
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
    ...mapMutations(["unlockNextTab", "updateStatusId", "updateToDefault"]),
    ...mapActions(["routeToOrder", "postOrder", "cancelOrder", "checkOrderProperties"]),
    unlockTab() {
      if (
        this.getCurrentTab.isLast ||
        localStorage.getItem("orderId") !== null
      ) {
        this.confirm = true;
      } else this.unlockNextTab();
    },

    async sendCurrentorder() {
      if (!this.getOrderStatus) {
        // update current order status:
        this.updateStatusId("new");
        await this.postOrder(this.getOrder);
      } else {
        this.updateStatusId("cancelled");
        this.cancelOrder(this.getOrder);
        this.checkOrderProperties(-1);
        this.updateToDefault();
      }
      this.routeToOrder();
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
    },

    toPrice(str) {
      str = str.toString().replace(/(\.(.*))/g, "");
      var arr = str.split("");
      var str_temp = "";
      if (str.length > 3) {
        for (var i = arr.length - 1, j = 1; i >= 0; i--, j++) {
          str_temp = arr[i] + str_temp;
          if (j % 3 === 0) {
            str_temp = " " + str_temp;
          }
        }
        return str_temp;
      } else {
        return str;
      }
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

.order-button--sended {
  background-color: $darken-red;
  @include buttonStylesByColor($darken-red);
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

.user-order__confirm {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm__title {
  font-size: 24px;
  margin-bottom: 39px;
  text-align: center;
}

.confirm__buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.confirm__accept-button,
.confirm__cancel-button {
  border: none;
  color: white;
  border-radius: 8px;
  height: 48px;
  width: 177px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.confirm__accept-button {
  background-color: $main-accent-color;
  @include buttonStylesByColor($main-accent-color);
  margin-right: 16px;
}

.confirm__cancel-button {
  background-color: $darken-red;
  @include buttonStylesByColor($darken-red);
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .users-order {
    border-left: none;
    padding: 10px;
    margin: 20px;
  }
}

@media (max-width: 500px) {
  .confirm__title {
    margin-bottom: 15px;
  }

  .confirm__accept-button {
    margin: 0 0 10px 0;
  }

  .confirm__buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
