<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <!--         <h1 class="admin-content__title">Заказы</h1>-->
        <!--        <AdminOrderList class="admin-content__order-list">-->
        <!--          <AdminOrderItem />-->
        <!--          <AdminOrderItem />-->
        <!--          <AdminOrderItem />-->
        <!--          <AdminOrderItem />-->
        <!--          <AdminOrderItem />-->
        <!--          <AdminOrderItem />-->
        <!--        </AdminOrderList>-->

        <AdminError />
      </div>
      <AdminFooter class="admin-page__footer" />
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../components/admin/AdminSideBar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";
// import AdminOrderList from "../components/admin/AdminOrderList";
// import AdminOrderItem from "../components/admin/AdminOrderItem";
import AdminError from "../components/admin/AdminError";
import { mapActions } from "vuex";

export default {
  name: "Admin",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    AdminError
    // AdminOrderList,
    // AdminOrderItem
  },
  methods: {
    ...mapActions(["fetchOrders"])
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

* {
  font-family: Helvetica, sans-serif; // TODO download fonts
  font-weight: 400;
}

.admin-page {
  display: flex;
  flex-direction: row;
}

.admin-page__main-content {
  width: 100%;
  background-color: $background-admin;
  display: flex;
  flex-direction: column;
}

.admin-page__header {
  display: flex;
  flex: 0 0 auto;
}

.admin-content {
  display: flex;
  flex: 1 0 auto;
  padding: 32px;
  flex-direction: column;
}

.admin-page__footer {
  display: flex;
  flex: 0 0 auto;
}

.admin-content__title {
  font-size: 29px;
  color: #3d5170;
}

.admin-content__order-list {
  margin-top: 30px;
}

@media (max-width: 600px) {
  .admin-page {
    flex-direction: column;
    min-height: 100vh;
  }

  .admin-page__main-content {
    display: flex;
    flex: 1 0 auto;
  }

  .admin-content {
    padding: 20px;
  }

  .admin-content__title {
    text-align: center;
  }

  .admin-content__order-list {
    margin-top: 20px;
  }
}
</style>
