<template>
  <div class="order-page">
    <SideBar class="order-page__sidebar" />
    <div class="order-page__content">
      <Header class="order-page__header" />

      <div class="order-page__tabs tabs">
        <div
          v-for="tab in getTabs"
          class="tabs__tab tab"
          :class="{
            'tab--active': tab.isActive,
            'tab--blocked': tab.isBlocked
          }"
          :key="tab.name"
        >
          <a class="tab__link link" @click="selectTab(tab)">
            {{ tab.name }}
          </a>
          <img
            v-if="!tab.isLast"
            class="tab__icon icon"
            src="@/assets/icons/next.svg"
            alt="next"
          />
        </div>
      </div>

      <div class="tabs-content">
        <tab :is-active="getTabs[0].isActive" :selected="getTabs[0].isActive">
          <PlaceTab />
        </tab>

        <tab :is-active="getTabs[1].isActive" :selected="getTabs[1].isActive">
          <ModelTab />
        </tab>

        <tab :is-active="getTabs[2].isActive" :selected="getTabs[2].isActive">
          <AdditionalTab />
        </tab>

        <tab :is-active="getTabs[3].isActive" :selected="getTabs[3].isActive">
          <ResultTab />
        </tab>

        <OrderList class="users-order" :order="usersOrder" />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Tab from "../components/elements/Tab";
import PlaceTab from "../components/PlaceTab";
import OrderList from "../components/OrderList";
import { mapMutations, mapGetters } from "vuex";
import ModelTab from "../components/ModelTab";
import AdditionalTab from "../components/AdditionalTab";
import ResultTab from "../components/ResultTab";

export default {
  name: "Order",
  components: {
    ResultTab,
    AdditionalTab,
    ModelTab,
    OrderList,
    PlaceTab,
    Tab,
    Header,
    SideBar
  },
  data() {
    return {
      usersOrder: {
        orderCty: "Ульяновск",
        orderPlace: "Нариманова 42",
        orderModel: "Hyndai, i30 N",
        modelColor: "Голубой",
        rentalTime: "1д 2ч",
        extraServices: [],
        userTariff: "На сутки"
      }
    };
  },
  methods: {
    ...mapMutations(["selectTab"])
  },
  computed: {
    ...mapGetters(["getTabs", "getCurrentTab"])
  }
};
</script>

<style lang="scss">
@import "public/css/variables";

$padding: 64px;

.order-page {
  display: flex;
  flex-direction: row;
}

.order-page__sidebar {
  position: fixed;
  z-index: 2;
}

.order-page__content {
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
  .order-page__sidebar {
    position: fixed;
    z-index: 2;
  }

  .order-page__content {
    margin-left: 45px;
    padding-left: 0;
  }

  .order-page__tabs {
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
  .order-page__sidebar {
    display: none !important;
  }

  .order-page__content {
    margin-left: 0;
  }

  .order-page__tabs {
    padding: 0 10px 0 10px;
  }

  .icon {
    display: none;
  }

  .order-page__tabs > div {
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
