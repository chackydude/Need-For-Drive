<template>
  <div class="admin-page">
    <AdminSideBar :active="1" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Автомобили</p>
        <AdminEntityList
          class="admin-content__order-list"
          :total-amount="getCarsCount"
          :for-click-callback="fetchCarsWithAmount"
          :page-limit="pageLimit"
          :search-filters="searchFilters"
        >
          <pulse-loader
            class="list__loader"
            :loading="getCars.length === 0"
            color="#007BFF"
          ></pulse-loader>
          <div class="list-items" v-if="getCars.length !== 0">
            <AdminCarItem
              v-for="car in getCars"
              :key="car.id"
              :id="car.id"
              :img-path="car.thumbnail.path"
              :model-name="car.name"
              :number="car.number"
              :category-name="car.categoryId.name"
              :colors="car.colors"
            />
          </div>
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
import AdminCarItem from "../../components/admin/entity-items/AdminCarItem";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AdminCars",
  components: {
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    AdminEntityList,
    AdminCarItem,
    PulseLoader
  },
  data() {
    return {
      pageLimit: 5,
      name: "",
      searchFilters: [
        {
          id: 0,
          name: "Модели",
          options: ["Все", "Hyundai, H-1", "Nissan, Qashqai", "Nissan, X-Trail"],
          modelingValue: { name: "name", value: "" }
        },
      ]
    };
  },
  computed: {
    ...mapGetters("adminOrders/", ["getCars", "getCarsCount"])
  },
  methods: {
    ...mapActions("adminOrders/", ["fetchCars", "fetchCarsCount"]),
    fetchCarsWithAmount(payload) {
      this.fetchCarsCount(payload);
      this.fetchCars(payload);
    }
  },
  mounted() {
    this.fetchCarsCount({ params: "" });
    this.fetchCars({ page: 1, limit: this.pageLimit });
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
}

.admin-content__order-list {
  margin-top: 30px;
}

@media (max-width: 600px) {
  .admin-page {
    flex-direction: column;
    min-height: 100vh;
  }

  .list__loader {
    height: 40vh;
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
