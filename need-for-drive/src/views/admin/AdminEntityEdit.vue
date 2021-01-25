<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Карточка автомобиля</p>
        <div class="admin-content__items content-items">
          <EntityFileInput :progress="0" class="input-file-item" :car="getLastCar"/>
          <EntityDefaultInputs :car="getLastCar"/>
        </div>
      </div>
      <AdminFooter class="admin-page__footer" />
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
import EntityFileInput from "../../components/admin/entity-edit/EntityFileInput";
import EntityDefaultInputs from "../../components/admin/entity-edit/EntityDefaultInputs";
import { mapGetters } from "vuex";

export default {
  name: "AdminEntityEdit",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    EntityFileInput,
    EntityDefaultInputs
  },
  computed: {
    ...mapGetters(["getLastCar"]),
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.admin-content__title {
  margin-bottom: 30px;
}

.admin-content__items {
  display: flex;
  flex-direction: row;

  div.input-file-item {
    margin-right: 20px;
  }
}

@media (max-width: 900px) {
  .admin-content__title {
    text-align: center;
  }

  .admin-content__items {
    flex-direction: column;
    align-items: center;
  }

  .input-file-item {
    margin: auto 0 20px 0 !important;
    max-width: 100%;
    width: 100%;
  }

  .main-edit-items__buttons {
    align-items: flex-end;

    .edit-result-buttons__cancel-button {
      margin: 10px 0 0 0;
    }
  }

  .edit-result-buttons__save-cancel-button {
    display: flex;
    flex-direction: column;
  }
}
</style>
