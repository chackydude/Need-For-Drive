<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
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
import AdminError from "../components/admin/AdminError";

export default {
  name: "AdminEntityEdit",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    AdminError
  }
};
</script>

<style scoped></style>
