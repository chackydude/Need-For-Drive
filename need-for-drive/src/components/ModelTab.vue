<template>
  <div class="model-tab">
    <div class="model-tab__radio-buttons">
      <RadioButton
        name="Все модели"
        id="all"
        @change="changeCategory"
        :isChecked="getCategory === 'Все модели'"
      />
      <RadioButton
        name="Эконом"
        id="eco"
        @change="changeCategory"
        :isChecked="getCategory === 'Эконом'"
      />
      <RadioButton
        name="Премиум"
        id="premium"
        @change="changeCategory"
        :isChecked="getCategory === 'Премиум'"
      />
    </div>
    <div
      class="model-tab__car-models"
      :class="{
        'car-models--loading': getAllCars.length == 0
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "ModelTab",
  components: { CarItem, RadioButton, Paginate, PulseLoader },
  data() {
    return {
      category: "Все модели",
      currentPage: 1,
      onpageCarsAmount: 4,
      cars: [
        {
          name: "Test 1",
          priceMax: 2000,
          priceMin: 1000,
          id: 1,
          categoryId: { name: "Премиум" }
        },
        {
          name: "Test 2",
          priceMax: 2000,
          priceMin: 1000,
          id: 2,
          categoryId: { name: "Эконом" }
        },
        {
          name: "Test 3",
          priceMax: 2000,
          priceMin: 1000,
          id: 3,
          categoryId: { name: "Премиум" }
        },
        {
          name: "Test 4",
          priceMax: 2000,
          priceMin: 1000,
          id: 4,
          categoryId: { name: "Премиум" }
        },
        {
          name: "Test 5",
          priceMax: 2000,
          priceMin: 1000,
          id: 5,
          categoryId: { name: "Эконом" }
        },
        {
          name: "Test 6",
          priceMax: 2000,
          priceMin: 1000,
          id: 6,
          categoryId: { name: "Премиум" }
        },
        {
          name: "Test 7",
          priceMax: 2000,
          priceMin: 1000,
          id: 7,
          categoryId: { name: "Эконом" }
        }
      ]
    };
  },
  methods: {
    ...mapActions(["fetchCars"]),
    ...mapMutations(["updateCategory"]),
    changeCategory: function(newValue) {
      this.updateCategory(newValue);
    },
    clickCallback: function(page) {
      this.currentPage = page;
    }
  },
  computed: {
    ...mapGetters(["getCarsAmount", "getAllCars", "getCategory"]),
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
  mounted() {
    this.fetchCars();
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
  min-height: 60vh;
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
  .model-tab {
    width: auto;
  }

  .model-tab__car-models {
    width: 80%;
  }
}
</style>
