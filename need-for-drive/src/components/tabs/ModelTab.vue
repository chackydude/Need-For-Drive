<template>
  <div class="model-tab">
    <div class="model-tab__radio-buttons">
      <CheckInputItem
        name="Все модели"
        :value="{ text: 'Все модели' }"
        id="all"
        @change="changeCategory"
        :comparingValue="getCategory"
        group-name="category"
      />
      <CheckInputItem
        name="Эконом"
        :value="{ text: 'Эконом' }"
        id="eco"
        @change="changeCategory"
        :comparingValue="getCategory"
        group-name="category"
      />
      <CheckInputItem
        name="Премиум"
        :value="{ text: 'Премиум' }"
        id="premium"
        @change="changeCategory"
        :comparingValue="getCategory"
        group-name="category"
      />
    </div>
    <div
      class="model-tab__car-models"
      :class="{
        'car-models--loading': getAllCars.length === 0
      }"
    >
      <pulse-loader
        :loading="getAllCars.length === 0"
        color="#0ec261"
      ></pulse-loader>
      <CarItem
        v-for="car in getChunkedCars[currentPage - 1]"
        :key="car.id"
        :name="car.name"
        :price-max="car.priceMax"
        :price-min="car.priceMin"
        :img="car.thumbnail.path"
        :colors="car.colors"
        :number="car.number"
        :tank="car.tank"
        :id="car.id"
        @change-car="updateCarData"
      />
    </div>
    <paginate
      :pageCount="pagesAmount"
      :containerClass="'pagination'"
      prev-text="Назад"
      next-text="Вперед"
      :clickHandler="clickCallback"
      :page-class="'page-item'"
      :active-class="'page-item--active'"
      :next-class="'nav-item'"
      :prev-class="'nav-item'"
    ></paginate>
  </div>
</template>

<script>
import CheckInputItem from "../common/CheckInputItem";
import CarItem from "../elements/CarItem";
import Paginate from "vuejs-paginate";
import { mapGetters, mapActions, mapMutations } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "ModelTab",
  components: { CarItem, CheckInputItem, Paginate, PulseLoader },
  data() {
    return {
      currentPage: 1,
      onpageCarsAmount: 4
    };
  },
  methods: {
    ...mapActions(["fetchCars", "checkOrderProperties", "fetchRates"]),
    ...mapMutations(["updateCategory", "updateModel", "updateFillStatus", "checkTabsState"]),
    changeCategory: function(newValue) {
      this.updateCategory(newValue.text);
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    },
    clickCallback: function(page) {
      this.currentPage = page;
    },
    updateCarData(carModel) {
      this.updateModel(carModel);
      this.updateFillStatus(true);
      this.checkOrderProperties(this.getCurrentTab.id);
      this.checkTabsState(this.getCurrentTab.id);
    }
  },
  computed: {
    ...mapGetters(["getCarsAmount", "getAllCars", "getCategory", "getCurrentTab"]),
    pagesAmount() {
      return Math.ceil(this.getAllCars.length / this.onpageCarsAmount);
    },

    getChunkedCars() {
      let buffer = [];
      let chunkedCars = [];
      for (let i = 0; i < this.getAllCars.length; i++) {
        if (buffer.length < this.onpageCarsAmount) {
          buffer.push(this.getAllCars[i]);
        } else {
          chunkedCars.push(buffer);
          buffer = [];
          buffer.push(this.getAllCars[i]);
        }
      }
      if (buffer.length !== 0) chunkedCars.push(buffer);
      return chunkedCars;
    }
  },
  created() {
    if (this.getAllCars.length === 0) {
      this.fetchCars();
    }
  },
};
</script>

<style lang="scss">
@import "../../../public/css/variables";
@import "../../../public/css/mixins";

.model-tab {
  width: 60vw;
}

.model-tab__radio-buttons {
  margin-top: 34px;
  display: flex;
  flex-direction: row;
}

.model-tab__car-models {
  min-height: 62vh;
  margin: 30px 0 18px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.car-models--loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @include fontStylesLight;
  font-size: 17px;
  margin: 0 0 10px 0;
  user-select: none;
}

.page-item {
  margin: 0 2px 0 2px;
  padding: 1px 5px 1px 5px;
  border-radius: 2px;
}

.nav-item {
  margin: 0 5px 0 5px;
  padding: 1px 4px 1px 4px;
  border-radius: 2px;
}

.nav-item:active,
.page-item:active {
  background-color: darken($gray-light-color, 20);
}

.page-item--active {
  color: #fff;
  background-color: $main-accent-color;
}

@media (max-width: 1324px) {
  .model-tab__car-models {
    margin-left: auto;
    margin-right: auto;
  }

  .model-tab__radio-buttons,
  .model-tab__car-models {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .model-tab {
    width: auto;
  }

  .model-tab__car-models {
    width: 80%;
  }
}
</style>
