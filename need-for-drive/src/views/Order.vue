<template>
  <div class="order-page">
    <SideBar class="order-page__sidebar"/>
    <div class="order-page__content">
      <Header />
      <TabBar>
        <tab name="Местоположение" link="#place" :selected="true">
        </tab>
        <tab name="Модель" link="#model"></tab>
        <tab name="Дополнительно" link="#more"></tab>
        <tab name="Итого" link="#result" :is-last="true"></tab>
      </TabBar>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import Tab from "../components/utils/Tab";

export default {
  name: "Order",
  components: {
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
</style>
