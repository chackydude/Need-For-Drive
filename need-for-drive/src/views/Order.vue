<template>
  <div class="order-page">
    <SideBar class="order-page__sidebar" />
    <div class="order-page__content">
      <Header />
      <div class="order-page__main-content">
        <TabBar class="tabs">
          <tab name="Местоположение" link="#place" :selected="true">
            <div class="place-tab">
              <div class="place-tab__inputs inputs">
                <PlaceTab />
              </div>
            </div>
          </tab>
          <tab name="Модель" link="#model"></tab>
          <tab name="Дополнительно" link="#more"></tab>
          <tab name="Итого" link="#result" is-last="true"></tab>
        </TabBar>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import Tab from "../components/utils/Tab";
import PlaceTab from "../components/PlaceTab";

export default {
  name: "Order",
  components: {
    PlaceTab,
    TabBar,
    Header,
    SideBar,
    Tab
  }
};
</script>

<style lang="scss">
.order-page {
  display: flex;
  flex-direction: row;
}

.order-page__content {
  flex-grow: 1;
}

.order-page__main-content {
  display: flex;
  flex-direction: row;
}

.tabs {
  flex-grow: 1;
}
</style>
