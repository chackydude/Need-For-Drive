<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Карточка автомобиля</p>
        <div class="admin-content__items content-items">
          <EntityFileInput :progress="60" class="input-file-item" />
          <div class="content-items__main main-edit-items">
            <div class="main-edit-items__content">
              <h2 class="main-edit-items__title">Настройки автомобиля</h2>
              <div class="main-edit-items__items">
                <div class="edit-item">
                  <label for="car-type">Модель автомобиля</label>
                  <input type="text" id="car-type" placeholder="Hyndai, i30N" />
                </div>

                <div class="edit-item">
                  <label for="car-model">Тип автомобиля</label>
                  <input type="text" id="car-model" placeholder="Компакт-кар" />
                </div>

                <div class="edit-item">
                  <label for="car-color">Доступные цвета</label>
                  <div>
                    <input
                      type="text"
                      id="car-color"
                      placeholder="Синий"
                      v-model="currentColor"
                    />
                    <button @click="addColor">+</button>
                  </div>
                </div>
              </div>
              <div class="main-edit-items__colors">
                <CheckInputItem
                  v-for="color in colors"
                  :key="color"
                  input-type="checkbox"
                  :value="{ text: color, amount: 0 }"
                  :name="color"
                  :is-checked="true"
                  :is-locked="true"
                />
              </div>
            </div>

            <div class="main-edit-items__buttons edit-result-buttons">
              <div class="edit-result-buttons__save-cancel-button">
                <button class="edit-result-buttons__save-button">
                  Сохранить
                </button>
                <button class="edit-result-buttons__cancel-button">
                  Отмена
                </button>
              </div>
              <button class="edit-result-buttons__delete-button">
                Удалить
              </button>
            </div>
          </div>
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
// import AdminError from "../../components/admin/AdminError";
import EntityFileInput from "../../components/admin/entity-edit/EntityFileInput";
import CheckInputItem from "../../components/common/CheckInputItem";

export default {
  name: "AdminEntityEdit",
  components: {
    // AdminError,
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    EntityFileInput,
    CheckInputItem
  },
  data() {
    return {
      username: "",
      avatar: null,
      currentColor: "",
      colors: ["Красный", "Синий", "Белый"]
    };
  },
  methods: {
    onChangeFile(event) {
      this.avatar = event.target.files[0];
    },
    logData() {
      let fd = new FormData();
      fd.append("avatar", this.avatar, this.avatar.name);
      fd.append("username", this.username);
    },
    addColor() {
      if (
        typeof this.currentColor === "string" &&
        this.currentColor.length !== 0 &&
        !this.colors
          .map(color => color.toLowerCase())
          .includes(this.currentColor)
      ) {
        this.colors.push(this.currentColor);
      }
    }
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
