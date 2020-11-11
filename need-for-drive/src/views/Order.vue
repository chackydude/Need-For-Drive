<template>
  <div class="order-page">
    <SideBar class="order-page__sidebar" />
    <div class="order-page__content">
      <Header class="order-page__header"/>

      <div class="order-page__tabs tabs">
        <div
          v-for="tab in tabs"
          :class="{ 'is-active': tab.isActive }"
          :key="tab.name"
        >
          <a class="links__link link" @click="selectTab(tab)">
            {{ tab.name }}
          </a>
          <img
            v-if="!tab.isLast"
            class="links__icon icon"
            src="@/assets/icons/next.svg"
            alt="next"
          />
        </div>
      </div>

      <div class="tabs-content">
        <tab :is-active="tabs[0].isActive" :selected="true">
          <PlaceTab />
        </tab>

        <tab :is-active="tabs[1].isActive"> </tab>

        <tab :is-active="tabs[2].isActive"> </tab>

        <tab :is-active="tabs[3].isActive"> </tab>

        <UsersOrder />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Tab from "../components/utils/Tab";
import PlaceTab from "../components/PlaceTab";
import UsersOrder from "../components/UsersOrder";

export default {
  name: "Order",
  components: {
    UsersOrder,
    PlaceTab,
    Tab,
    Header,
    SideBar
  },
  data() {
    return {
      usersOrder: {
        orderPlace: "",
        orderModel: "",
        modelColor: "",
        rentalTime: "",
        extraServices: []
      },
      tabs: [
        {
          name: "Местоположение",
          isActive: true,
          isLast: false
        },
        {
          name: "Модель",
          isActive: false,
          isLast: false
        },
        {
          name: "Дополнительно",
          isActive: false,
          isLast: false
        },
        {
          name: "Итог",
          isActive: false,
          isLast: true
        }
      ]
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });
      console.log(selectedTab.name);
    }
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

.order-page__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.link {
  text-decoration: none;
  cursor: pointer;
  color: $gray-color;
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

.links__link,
.links__icon {
  margin-right: 18px;
}

.none {
  display: none;
}

.is-active a {
  color: $main-accent-color;
}

.tabs-content {
  flex: 1;
}
</style>
