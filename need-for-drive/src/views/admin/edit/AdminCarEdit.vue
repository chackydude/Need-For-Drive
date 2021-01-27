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
          ></EntityFileInput>
          <EntityDefaultInputs
            title="Настройки автомобиля"
            @post="postNewCarHandled"
            @new="cancelCarEditingHandled"
            @cancel="leave"
            @delete="deleteLastCarHandled"
            :is-creatable="true"
          >
            <div class="edit-item">
              <label>Модель автомобиля</label>
              <input
                type="text"
                placeholder="Hyndai, i30N"
                v-model="getLastCar.name"
                :class="{ 'edit-item--error': !name }"
              />
            </div>

            <div class="edit-item">
              <label>Номер</label>
              <input
                type="text"
                placeholder="м123ав"
                v-model="getLastCar.number"
                :class="{ 'edit-item--error': !number }"
              />
            </div>

            <div class="edit-item">
              <label>Минимальная стоимость</label>
              <input
                type="number"
                placeholder="5 000"
                v-model.number="getLastCar.priceMin"
                :class="{ 'edit-item--error': !priceMin }"
              />
            </div>

            <div class="edit-item">
              <label>Максимальная стоимость</label>
              <input
                type="number"
                placeholder="10 000"
                v-model.number="getLastCar.priceMax"
                :class="{ 'edit-item--error': !priceMax }"
              />
            </div>

            <ArrayField
              label-name="Цвет"
              type="text"
              placehoder="Синий"
              :modeling-value="{
                name: 'colors',
                value: getLastCar.colors
              }"
            />
          </EntityDefaultInputs>
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
import EntityFileInput from "../../../components/admin/entity-edit/EntitExtraInputWrapper";
import EntityDefaultInputs from "../../../components/admin/entity-edit/EntitMainInputWrapper";
import ArrayField from "../../../components/admin/entity-edit/edit-types/ArrayField";
import { mapGetters, mapActions } from "vuex";
import router from "../../../router";

export default {
  name: "AdminEntityEdit",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    EntityFileInput,
    EntityDefaultInputs,
    ArrayField
  },
  data() {
    return {
      name: true,
      priceMin: true,
      priceMax: true,
      number: true
    };
  },
  methods: {
    ...mapActions([
      "postNewCar",
      "cancelCarEditing",
      "deleteLastCar",
      "updateCar"
    ]),
    postNewCarHandled() {
      this.validate();
      if (
        this.isValidMinPrice &&
        this.isValidPriceMax &&
        this.isValidName &&
        this.isValidNumber
      ) {
        this.getEditingStatus ? this.updateCar() : this.postNewCar();
        router.push(`/admin/cars`);
      }
    },
    deleteLastCarHandled() {
      if (this.getLastCar.id !== undefined) {
        this.deleteLastCar(this.getLastCar.id);
      }
    },
    cancelCarEditingHandled() {
      this.cancelCarEditing();
      this.removeValidation();
    },
    leave() {
      this.cancelCarEditing();
      this.removeValidation();
      router.push(`/admin/cars`);
    },
    validate() {
      this.name = this.isValidName;
      this.number = this.isValidNumber;
      this.priceMax = this.isValidPriceMax;
      this.priceMin = this.isValidMinPrice;
    },
    removeValidation() {
      this.name = true;
      this.number = true;
      this.priceMin = true;
      this.priceMax = true;
    }
  },
  computed: {
    ...mapGetters(["getEditingStatus", "getLastCar", "getProgress"]),
    // validation block
    isValidName() {
      return this.getLastCar.name.length !== 0;
    },
    isValidNumber() {
      return /[a-z][0-9][0-9][0-9][a-z][a-z]/.test(this.getLastCar.number);
    },
    isValidMinPrice() {
      return this.getLastCar.priceMin > 0 && this.getLastCar.priceMin < this.getLastCar.priceMax;
    },
    isValidPriceMax() {
      return this.getLastCar.priceMax > 0 && this.getLastCar.priceMin < this.getLastCar.priceMax;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../../public/css/mixins";
@import "../../../../public/css/variables";

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

@media (max-width: 600px) {
  .admin-page {
    flex-direction: column;
    min-height: 100vh;
  }
}
</style>
