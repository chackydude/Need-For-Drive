<template>
  <div class="total-page">
    <SideBar class="total-page__sidebar" />
    <div class="total-page__content">
      <Header class="total-page__header" />

      <div class="total-page__tabs tabs">
        <p>Заказ номер: {{ getOrderId }}</p>
      </div>

      <div class="tabs-content">
        <div>
          <p class="title">Ваш заказ подтвержден</p>
          <ResultTab class="result-tab" />
        </div>
        <OrderList class="users-order"/>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/common/SideBar";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import { mapGetters, mapActions, mapMutations } from "vuex";
import ResultTab from "../components/tabs/ResultTab";

export default {
  name: "Total",
  components: {
    ResultTab,
    OrderList,
    Header,
    SideBar
  },
  methods: {
    ...mapActions(["fetchOrder", "routeToOrder"]),
    ...mapMutations(["updateOrderStatus"]),
  },
  computed: {
    ...mapGetters(["getTabs", "getCurrentTab", "getOrderId"])
  },
  mounted() {
    if (localStorage.getItem("orderId") !== null) {
      this.fetchOrder(localStorage.getItem("orderId"));
      this.updateOrderStatus(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "public/css/variables";

$padding: 64px;

.result-tab {
  margin-top: 0;
}

.title {
  font-size: 24px;
  margin: 34px 0 28px 0;
}

.total-page {
  display: flex;
  flex-direction: row;
}

.total-page__sidebar {
  position: fixed;
  z-index: 2;
}

.total-page__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: $padding;
}

.link {
  text-decoration: none;
  cursor: pointer;
  color: $black-color;
}

.tabs {
  padding: 0 $padding 0 $padding;
  border-top: 1px solid $gray-light-color;
  border-bottom: 1px solid $gray-light-color;
  height: 32px;
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: bold;
}

.tabs-content {
  padding: 0 $padding 0 $padding;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tab__link,
.tab__icon {
  margin-right: 18px;
}

.none {
  display: none;
}

.tab--active a {
  color: $main-accent-color;
}

.tab--blocked a {
  pointer-events: none;
  color: $gray-color;
}

.tabs-content {
  flex: 1;
}

@media (max-width: 1324px) {
  .total-page__sidebar {
    position: fixed;
    z-index: 2;
  }

  .total-page__content {
    margin-left: 45px;
    padding-left: 0;
  }

  .total-page__tabs {
    justify-content: center;
    flex-wrap: wrap;
    min-height: 32px;
    height: auto;
  }

  .tabs-content {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .total-page__sidebar {
    display: none !important;
  }

  .total-page__content {
    margin-left: 0;
  }

  .total-page__tabs {
    padding: 0 10px 0 10px;
  }

  .icon {
    display: none;
  }

  .total-page__tabs > div {
    margin: 8px;
    font-size: 12px;
  }

  .tabs-content {
    padding: 0 10px 0 10px;
  }

  .users-order {
    margin-top: 20px;
  }
}
</style>
