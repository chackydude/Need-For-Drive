<template>
  <div class="order-page">
    <SideBar class="order-page__sidebar"/>
    <div class="order-page__content">
      <Header />

    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Header from "../components/Header";
export default {
  name: "Order",
  components: {
    Header,
    SideBar
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
