<template>
  <div class="admin-page">
    <AdminSideBar :active="2" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Заказы</p>
        <AdminOrderList
          class="admin-content__order-list"
          :search-filters="listFilters"
          :total-amount="getOrdersCount"
          :page-limit="pageLimit"
          :for-click-callback="fetchOrders"
        >
          <pulse-loader
            class="list__loader"
            :loading="getOrders.length === 0"
            color="#007BFF"
          ></pulse-loader>
          <div class="list-items" v-if="getOrders.length !== 0">
            <AdminOrderItem
              v-for="order in getOrders"
              :key="order.id"
              :id="order.id"
              :car-id="order.carId"
              :city-name="order.cityId.name"
              :point-address="order.pointId.address"
              :color="order.color"
              :price="order.price"
              :is-full-tank="order.isFullTank"
              :is-need-child-chair="order.isFullTank"
              :is-right-wheel="order.isRightWheel"
              :date-from="order.dateFrom"
              :date-to="order.dateTo"
            />
          </div>
        </AdminOrderList>
      </div>
      <AdminFooter class="admin-page__footer" />
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
import AdminOrderList from "../../components/admin/AdminEntityList";
import AdminOrderItem from "../../components/admin/entity-items/AdminOrderItem";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Admin",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    AdminOrderList,
    PulseLoader,
    AdminOrderItem
  },
  data() {
    return {
      pageLimit: 5,
      model: "",
      city: "",
      category: "",
      color: "",
      listFilters: [
        // { id: 0, name: "Модель", label: "name", options: this.getCars, modelingValue: { name: "carId", value: "" } }, // id модели
        // { id: 1, name: "Город", options: ["option", "option1", "option2"], modelingValue: { name: "cityId", value: "" } }, // надо будет достать id города
        { id: 3, name: "Цвет", options: ["Голубой", "Красный", "Белый"], modelingValue: { name: "color", value: "" } } // просто цвет
      ]
    };
  },
  methods: {
    ...mapActions("adminOrders/", ["fetchOrders", "fetchCars", "fetchCities"])
  },
  computed: {
    ...mapGetters("adminOrders/", [
      "getOrders",
      "getOrdersCount",
      "getCars",
      "getCities"
    ])
  },
  mounted() {
    // this.fetchCars();
    // this.fetchCities();
    this.fetchOrders({ page: 1, limit: this.pageLimit });
  }
};
</script>

<style lang="scss">
@import "../../../public/css/mixins";
@import "../../../public/css/variables";

* {
  font-family: Helvetica, sans-serif;
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

.list__loader {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
