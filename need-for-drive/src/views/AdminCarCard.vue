<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar"/>
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header"/>
      <div class="admin-page__content admin-content">
        <h1 class="admin-content__title">Заказы</h1>
      </div>
      <AdminFooter class="admin-page__footer"/>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../components/admin/AdminSideBar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";
import { mapActions } from "vuex";

export default {
  name: "Admin",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter
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

.admin-page__side-bar {
  /*position: fixed;*/
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

.admin-page__content {
  display: flex;
  flex: 1 0 auto;
  padding: 32px;
}

.admin-page__footer {
  display: flex;
  flex: 0 0 auto;
}

.admin-content__title {
  font-size: 29px;
  color: #3D5170;
}
</style>
