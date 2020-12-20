<template>
  <div class="admin-page">
    <AdminSideBar :active="0" />
    <div class="admin-page__main-content">
      <AdminHeader />
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../components/admin/AdminSideBar";
import AdminHeader from "../components/admin/AdminHeader";

export default {
  name: "Admin",
  components: {
    AdminSideBar,
    AdminHeader
  }
};
</script>

<style scoped lang="scss">

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
}
</style>
