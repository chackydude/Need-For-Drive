<template>
  <div class="model-tab">
    <div class="model-tab__radio-buttons">
      <RadioButton name="Все модели" id="all" @change="changeCategory" />
      <RadioButton name="Эконом" id="eco" @change="changeCategory" />
      <RadioButton name="Премиум" id="premium" @change="changeCategory" />
    </div>
    <transition-group  class="model-tab__car-models" tag="div">
      <CarItem
        v-for="car in getCars[currentPage - 1]"
        :key="car.id"
        :name="car.name"
        :price-max="car.priceMax"
        :price-min="car.priceMin"
        :img="car.thumbnail.path"
        class=""
      />
    </transition-group>
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
      onpageCarsAmount: 4
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
    ...mapGetters(["getCars", "getCarsAmount"]),
    pagesAmount() {
      return Math.ceil(this.getCarsAmount / this.onpageCarsAmount);
    }
  },
  mounted() {
    this.fetchCarsAmount();
    this.fetchCarsWithPagination({pagesAmount: this.pagesAmount, onpageCarsAmount: this.onpageCarsAmount});
}
};
</script>

<style scoped lang="scss">
@import "public/css/variables";
@import "public/css/mixins";

.list-enter-active,
.list-leave-active {
  transition: all 0.9s;
  opacity: 1;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
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
