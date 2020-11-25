<template>
  <div class="model-tab">
    <div class="model-tab__radio-buttons">
      <RadioButton name="Все модели" id="all" @change="changeCategory" />
      <RadioButton name="Эконом" id="eco" @change="changeCategory" />
      <RadioButton name="Премиум" id="premium" @change="changeCategory" />
    </div>
    <div class="model-tab__car-models">
      <CarItem
        v-for="car in getChunkedCars[currentPage - 1]"
        :key="car.id"
        :name="car.name"
        :price-max="car.priceMax"
        :price-min="car.priceMin"
        :img="car.thumbnail.path"
      />
    </div>
    <paginate
      :pageCount="pagesAmount"
      :containerClass="'pagination'"
      prev-text="Назад"
      next-text="Вперед"
      :clickHandler="clickCallback"
    ></paginate>
  </div>
</template>

<script>
import RadioButton from "./common/RadioButton";
import CarItem from "./elements/CarItem";
import Paginate from "vuejs-paginate";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ModelTab",
  components: { CarItem, RadioButton, Paginate },
  data() {
    return {
      category: "",
      currentPage: 1,
      onpageCarsAmount: 4,
      cars: [
        { name: "Test 1", priceMax: 2000, priceMin: 1000, id: 1 },
        { name: "Test 2", priceMax: 2000, priceMin: 1000, id: 2 },
        { name: "Test 3", priceMax: 2000, priceMin: 1000, id: 3 },
        { name: "Test 4", priceMax: 2000, priceMin: 1000, id: 4 },
        { name: "Test 5", priceMax: 2000, priceMin: 1000, id: 5 },
        { name: "Test 6", priceMax: 2000, priceMin: 1000, id: 6 },
        { name: "Test 7", priceMax: 2000, priceMin: 1000, id: 7 }
      ]
    };
  },
  methods: {
    ...mapActions(["fetchCarsAmount", "fetchCarsWithPagination"]),
    changeCategory: function(newValue) {
      this.category = newValue;
    },
    clickCallback: function(page) {
      this.currentPage = page;
    }
  },
  computed: {
    ...mapGetters(["getCars", "getCarsAmount", "getAllCars"]),
    pagesAmount() {
      return Math.ceil(this.getCarsAmount / this.onpageCarsAmount);
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
  mounted() {
    this.fetchCarsAmount();
  }
};
</script>

<style scoped lang="scss">
@import "public/css/variables";
@import "public/css/mixins";

.model-tab {
  width: 60vw;
}

.model-tab__radio-buttons {
  margin-top: 34px;
  display: flex;
  flex-direction: row;
}

.model-tab__car-models {
  margin: 48px 0 32px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pagination {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  @include fontStylesLight;
  font-size: 17px;
  margin: 0 0 20px 0;
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
  .model-tab__car-models {
    width: 80%;
  }
}
</style>
