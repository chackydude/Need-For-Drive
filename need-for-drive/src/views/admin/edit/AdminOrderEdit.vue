<template>
  <div class="admin-page">
    <AdminSideBar :active="2" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <!--        <p class="admin-content__title">Карточка заказа {{ $route.params.id }}</p>-->
        <p class="admin-content__title">Карточка заказа</p>
        <div class="admin-content__items content-items">
          <div class="content-items__order-car last-order-car">
            <img
              v-if="
                getLastOrder.carId == null || getLastOrder.carId == undefined || getLastOrder.carId.thumbnail == undefined
              "
              src="@/assets/images/admin/unknown-car.jpg"
              alt="car-image"
              class="last-order-car__image"
              ref="carImage"
            />
            <img
              v-else
              :src="
                'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/' +
                  getLastOrder.carId.thumbnail.path
              "
              alt="car-image"
              class="last-order-car__image"
              crossOrigin="anonymous"
              referrerPolicy="origin"
            />
            <p class="last-order-car__name">{{ handledCarName }}</p>
          </div>
          <EntitMainInputWrapper
            title="Настроки заказа"
            class="content-items__inputs"
            @post="postNewOrderHandled"
            @cancel="cancelOrderEditingHandled"
            @delete="deleteLastOrderHandled"
          >
            <div class="edit-item">
              <label>Город</label>
              <input
                type="text"
                placeholder="Ульяновск"
                v-model="getLastOrder.cityId.name"
                :class="{ 'edit-item--error': !city }"
              />
            </div>

            <div class="edit-item">
              <label>Адрес</label>
              <input
                type="text"
                placeholder="Гагарина, 61"
                v-model="getLastOrder.pointId.address"
                :class="{ 'edit-item--error': !address }"
              />
            </div>

            <div class="edit-item">
              <label>Цвет автомобиля</label>
              <input
                type="text"
                placeholder="Синий"
                v-model="getLastOrder.color"
                :class="{ 'edit-item--error': !color }"
              />
            </div>

            <template v-slot:message>
              <div class="message" v-if="error">
                Невалидный заказ в базе данных
              </div>
            </template>

            {{ getLastOrder }}
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
      city: true,
      address: true,
      color: true,
      error: false
    };
  },
  methods: {
    ...mapActions(["updateNewOrder", "deleteLastOrder", "cancelOrderEditing"]),
    // add some methods into the vuex
    postNewOrderHandled() {
      this.validate();
      if (this.isValidCity && this.isValidAddress && this.isValidColor) {
        if (this.getLastOrder.carId === null) {
          this.error = true;
        } else {
          this.updateNewOrder(this.getLastOrder.id);
          router.push(`/admin/orders`);
        }
      }
    },

    deleteLastOrderHandled() {
      if (this.getLastOrder.id !== undefined) {
        this.deleteLastOrder(this.getLastOrder.id);
        router.push(`/admin/orders`);
      }
    },

    cancelOrderEditingHandled() {
      this.cancelOrderEditing();
      this.removeValidation();
      router.push(`/admin/orders`);
    },

    validate() {
      this.city = this.isValidCity;
      this.address = this.isValidAddress;
      this.color = this.isValidColor;
    },

    removeValidation() {
      this.city = true;
      this.address = true;
      this.color = true;
    }
  },
  computed: {
    ...mapGetters(["getLastOrder"]),
    handledCarName() {
      if (this.getLastOrder.carId === null) {
        return "NO DATA";
      } else return this.getLastOrder.carId.name;
    },

    // validation block
    isValidCity() {
      return this.getLastOrder.cityId.name.length !== 0;
    },
    isValidColor() {
      return this.getLastOrder.color.length !== 0;
    },
    isValidAddress() {
      return this.getLastOrder.pointId.address.length !== 0;
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
