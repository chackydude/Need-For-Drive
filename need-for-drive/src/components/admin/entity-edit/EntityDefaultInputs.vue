<template>
  <div class="content-items__main main-edit-items">
    <div class="main-edit-items__content">
      <h2 class="main-edit-items__title">Настройки автомобиля</h2>
      <div class="main-edit-items__items">
        <!--        <TextField-->
        <!--          label-name="Модель автомобиля"-->
        <!--          type="text"-->
        <!--          placehoder="Hyndai, i30N"-->
        <!--          :modeling-value="{ name: 'name', value: car.name }"-->
        <!--        />-->

        <!--        <TextField-->
        <!--          label-name="Минимальная цена"-->
        <!--          type="number"-->
        <!--          placehoder="5 000"-->
        <!--          :modeling-value="{ name: 'priceMin', value: car.priceMin }"-->
        <!--        />-->

        <!--        <TextField-->
        <!--          label-name="Максимальная цена"-->
        <!--          type="number"-->
        <!--          placehoder="10 000"-->
        <!--          :modeling-value="{ name: 'priceMax', value: car.priceMax }"-->
        <!--        />-->

        <div class="edit-item">
          <label>Модель автомобиля</label>
          <input
            type="text"
            placeholder="Hyndai, i30N"
            v-model="car.name"
            :class="{ 'edit-item--error': !name }"
          />
        </div>

        <div class="edit-item">
          <label>Номер</label>
          <input
            type="text"
            placeholder="м123ав"
            v-model="car.number"
            :class="{ 'edit-item--error': !number }"
          />
        </div>

        <div class="edit-item">
          <label>Минимальная стоимость</label>
          <input
            type="number"
            placeholder="5 000"
            v-model.number="car.priceMin"
            :class="{ 'edit-item--error': !priceMin }"
          />
        </div>

        <div class="edit-item">
          <label>Максимальная стоимость</label>
          <input
            type="number"
            placeholder="10 000"
            v-model.number="car.priceMax"
            :class="{ 'edit-item--error': !priceMax }"
          />
        </div>

        <ArrayField
          label-name="Цвет"
          type="text"
          placehoder="Синий"
          :modeling-value="{
            name: 'colors',
            value: car.colors
          }"
        />
      </div>
    </div>

    <div class="main-edit-items__buttons edit-result-buttons">
      <div class="edit-result-buttons__save-cancel-button">
        <button
          class="edit-result-buttons__save-button"
          @click="postNewCarHandled"
        >
          Сохранить
        </button>
        <button
          class="edit-result-buttons__cancel-button"
          @click="cancelCarEditingHandled"
        >
          Отмена
        </button>
      </div>
      <button
        class="edit-result-buttons__delete-button"
        @click="deleteLastCarHandled"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import ArrayField from "./edit-types/ArrayField";
// import TextField from "./edit-types/TextField";
import { mapActions, mapGetters } from "vuex";
import router from "../../../router";

export default {
  name: "EntityDefaultInputs",
  components: {
    // TextField,
    ArrayField
  },
  props: {
    car: Object
  },
  data() {
    return {
      name: true,
      priceMin: true,
      priceMax: true,
      number: true
    }
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
      if (this.car.id !== undefined) {
        this.deleteLastCar(this.car.id);
      }
    },
    cancelCarEditingHandled() {
      this.cancelCarEditing();
      this.removeValidation();
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
    ...mapGetters(["getEditingStatus"]),
    // validation block
    isValidName() {
      return this.car.name.length !== 0;
    },
    isValidNumber() {
      return /[a-z][0-9][0-9][0-9][a-z][a-z]/.test(this.car.number);
    },
    isValidMinPrice() {
      return this.car.priceMin > 0 && this.car.priceMin < this.car.priceMax;
    },
    isValidPriceMax() {
      return this.car.priceMax > 0 && this.car.priceMin < this.car.priceMax;
    },
  }
};
</script>

<style lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.main-edit-items {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-edit-items__title {
  color: $admin-text-dark;
}

.content-items__main {
  background-color: #fff;
  box-shadow: 0 0 5px rgba(38, 46, 52, 0.2);
  border-radius: 10px;
  padding: 23px;
  width: 100%;
}

.main-edit-items__items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.edit-item {
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 70px;
  justify-content: flex-end;
  margin-right: 20px;

  label {
    font-size: 12px;
    margin-bottom: 5px;
  }

  input {
    height: 30px;
    font-size: 15px;
    padding: 10px;
    border-radius: 4px;
    border: 1px darken($admin-light-gray, 20) solid;
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      width: 30px;
      border: 1px darken($admin-light-gray, 20) solid;
      color: darken($admin-light-gray, 20);
      background-color: #fff;
      cursor: pointer;
      border-radius: 4px;
      justify-self: flex-end;
      margin-left: 10px;
      @include buttonStyles;
    }
  }
}

.edit-item--error {
  border: 2px lighten($admin-error, 30) solid !important;
  box-shadow: 0 0 3px rgba(38, 46, 52, 0.2);
}

.main-edit-items__colors {
  margin-top: 15px;

  div {
    margin-top: 8px;
  }
}

.main-edit-items__buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 23px;

  .edit-result-buttons__save-button,
  .edit-result-buttons__cancel-button,
  .edit-result-buttons__delete-button {
    width: 100px;
    height: 29px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    @include buttonStyles;
  }

  .edit-result-buttons__save-button {
    color: #fff;
    background-color: $admin-blue-color;
  }

  .edit-result-buttons__cancel-button {
    color: $admin-text-dark;
    background-color: $admin-light-gray;
    margin-left: 8px;
  }

  .edit-result-buttons__delete-button {
    color: #fff;
    background-color: $admin-error;
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
