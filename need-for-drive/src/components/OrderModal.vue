<template>
  <div class="user-order__confirm confirm" @click="userClose">
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
        <button class="confirm__cancel-button" @click="userClose">
          Вернуться
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "OrderModal",
  props: {
    orderStatus: Boolean,
    orderId: String
  },
  methods: {
    ...mapMutations([
      "unlockNextTab",
      "updateStatusId",
      "updateToDefault",
      "updateSendStatus"
    ]),
    ...mapActions([
      "routeToOrder",
      "postOrder",
      "cancelOrder",
      "checkOrderProperties",
      "fetchRates"
    ]),

    userClose() {
      this.$emit("click-close");
    },

    async sendCurrentorder() {
      if (!this.getOrderStatus) {
        // update current order status:
        this.updateStatusId("new");
        this.updateSendStatus(true);
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
    ])
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";
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
