<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Карточка автомобиля</p>
        <div class="admin-content__items content-items">
          <EntityFileInput
            :progress="getProgress"
            class="input-file-item"
            :car="getLastCar"
          />
          <EntityDefaultInputs :car="getLastCar" />
          {{ getProgress }}
        </div>
        {{ getLastCar }}

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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdminEntityEdit",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    EntityFileInput,
    EntityDefaultInputs
  },
  methods: {
    ...mapActions(["postNewCar"])
  },
  computed: {
    ...mapGetters([
      "getLastCar",
      "getCarFile",
      "getEditingStatus",
      "getProgress"
    ])
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

* {
  font-family: Helvetica, sans-serif;
  font-weight: normal;
}

.list__loader {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 30px;
}

.admin-content__order-list {
  margin-top: 30px;
}

.admin-page__main-content {
  width: 100%;
  background-color: $background-admin;
  display: flex;
  flex-direction: column;
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
