<template>
  <div class="admin-page">
    <AdminSideBar :active="1" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Автомобили</p>
        <AdminEntityList class="admin-content__order-list"
        :search-filters="searchFilters">

        </AdminEntityList>
      </div>
      <AdminFooter class="admin-page__footer" />
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
import AdminEntityList from "../../components/admin/AdminEntityList";

export default {
  name: "AdminCars",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    AdminEntityList
  },
  data() {
    return {
      searchFilters: [
        {id: 0, name: "Модели", options: ["Все", "Hyunday", "Nissan"]},
        {id: 1, name: "Тип", options: ["Все", "Эконом", "Премиум"]},
        {id: 2, name: "Модели", options: ["Все", "Hyunday", "Nissan"]},
        {id: 3, name: "Тип", options: ["Все", "Эконом", "Премиум"]},
        {id: 4, name: "Модели", options: ["Все", "Hyunday", "Nissan"]},
        {id: 5, name: "Тип", options: ["Все", "Эконом", "Премиум"]},
        {id: 6, name: "Модели", options: ["Все", "Hyunday", "Nissan"]},
        {id: 7, name: "Тип", options: ["Все", "Эконом", "Премиум"]},
      ]
    }
  }
};
</script>

<style lang="scss">
@import "../../../public/css/mixins";
@import "../../../public/css/variables";

* {
  font-family: Helvetica;
  font-weight: normal;
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
