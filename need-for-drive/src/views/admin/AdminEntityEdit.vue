<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Карточка автомобиля</p>
        <div class="admin-content__items content-items">
          <EntityFileInput :progress="60" />
          <div class="content-items__main main-edit-items">
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
                  <input type="text" id="car-color" placeholder="Синий" />
                  <button>+</button>
                </div>
              </div>
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

export default {
  name: "AdminEntityEdit",
  components: {
    // AdminError,
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    EntityFileInput
  },
  data() {
    return {
      username: "",
      avatar: null
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

  div {
    margin-right: 20px;
  }
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

  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      width: 30px;
      font-size: 20px;
      border: 1px darken($admin-light-gray, 20) solid;
      color: darken($admin-light-gray, 20);
      background-color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
