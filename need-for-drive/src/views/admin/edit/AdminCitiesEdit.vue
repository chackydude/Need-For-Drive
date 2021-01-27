<template>
  <div class="admin-page">
    <AdminSideBar :active="3" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Карточка города</p>
        <div class="admin-content__items content-items">
          <EntitMainInputWrapper
            title="Настроки города"
            class="content-items__inputs"
            @post="postNewCityHandled"
            @cancel="leave"
            @new="cancelCityEditingHandled"
            @delete="deleteLastCityHandled"
            :is-creatable="true"
          >
            <div class="edit-item">
              <label>Название города</label>
              <input
                type="text"
                placeholder="Ульяновск"
                v-model="getLastCity.name"
                :class="{ 'edit-item--error': !name }"
              />
            </div>
          </EntitMainInputWrapper>
        </div>
      </div>
      <AdminFooter class="admin-page__footer" />
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../../../components/admin/AdminSideBar";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminFooter from "../../../components/admin/AdminFooter";
import EntitMainInputWrapper from "../../../components/admin/entity-edit/EntitMainInputWrapper";
import { mapGetters, mapActions } from "vuex";
import router from "../../../router";

export default {
  name: "AdminOrderEdit",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    EntitMainInputWrapper
  },
  data() {
    return {
      name: true
    };
  },
  methods: {
    ...mapActions([
      "updateNewCity",
      "deleteLastCity",
      "cancelCityEditing",
      "postNewCity"
    ]),
    // need to add some
    postNewCityHandled() {
      this.validate();
      if (this.isValidName) {
        this.getCityEditingStatus
          ? this.updateNewCity(this.getLastCity.id)
          : this.postNewCity();
        router.push(`/admin/cities`);
      }
    },

    // done
    deleteLastCityHandled() {
      this.deleteLastCity(this.getLastCity.id);
      router.push(`/admin/cities`);
    },

    cancelCityEditingHandled() {
      this.cancelCityEditing();
      this.removeValidation();
    },

    leave() {
      this.cancelCityEditing();
      this.removeValidation();
      router.push(`/admin/cities`);
    },

    validate() {
      this.name = this.isValidName;
    },

    removeValidation() {
      this.name = true;
    }
  },
  computed: {
    ...mapGetters(["getLastCity", "getCityEditingStatus"]),

    // validation block
    isValidName() {
      return this.getLastCity.name.length !== 0;
    }
  }
};
</script>

<style lang="scss">
@import "../../../../public/css/mixins";
@import "../../../../public/css/variables";

* {
  font-family: Helvetica, sans-serif;
  font-weight: normal;
}

.content-items__order-car {
  background-color: #fff;
  border-radius: 10px;
  padding: 23px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px rgba(38, 46, 52, 0.2);
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-height: 200px;
  margin-right: 20px;
}

.last-order-car__image {
  height: 90px;
}

.last-order-car__name {
  font-size: 24px;
  color: $admin-text-dark;
  margin-top: 15px;
  text-align: center;
}

.content-items__inputs {
  min-height: 500px;
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

.message {
  @include fontStylesLight;
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;
  background-color: #ffe0e8;
  color: $black-color;
  border-radius: 10px;
  padding: 15px 10px 15px 10px;
  max-width: 300px;
  width: 100%;
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

  .content-items__order-car {
    margin: 0 0 20px 0;
    width: 100%;
  }
}

@media (max-width: 600px) {
  .admin-page {
    flex-direction: column;
    min-height: 100vh;
  }
}
</style>
