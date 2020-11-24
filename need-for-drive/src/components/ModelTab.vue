<template>
  <div class="model-tab">
    <div class="model-tab__radio-buttons">
      <RadioButton name="Все модели" id="all" @change="changeCategory" />
      <RadioButton name="Эконом" id="eco" @change="changeCategory" />
      <RadioButton name="Премиум" id="premium" @change="changeCategory" />
    </div>
    <transition-group name="list" class="model-tab__car-models" tag="div">
      <!--      <CarItem-->
      <!--        v-for="car in getCars"-->
      <!--        :key="car.id"-->
      <!--        :name="car.name"-->
      <!--        :price-max="car.priceMax"-->
      <!--        :price-min="car.priceMin"-->
      <!--        :img="car.thumbnail.originalname"-->
      <!--      />-->
      <CarItem
        v-for="car in getCars"
        :key="car.id"
        :name="car.name"
        :price-max="car.priceMax"
        :price-min="car.priceMin"
      />
    </transition-group>
  </div>
</template>

<script>
import RadioButton from "./common/RadioButton";
import CarItem from "./elements/CarItem";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ModelTab",
  components: { CarItem, RadioButton },
  data() {
    return {
      category: "",
      cars: []
    };
  },
  methods: {
    ...mapActions(["fetchCars"]),
    changeCategory: function(newValue) {
      this.category = newValue;
    }
  },
  computed: {
    ...mapGetters(["getCars"])
  },
  mounted() {
    this.fetchCars();
    // this.cars = [
    //   {
    //     id: 1,
    //     name: "Hyundai, i30 N",
    //     maxPrice: 1000,
    //     minPrice: 5000,
    //     img: "@/assets/images/car-example.png"
    //   },
    //   {
    //     id: 2,
    //     name: "Hyundai, i30 N",
    //     maxPrice: 1000,
    //     minPrice: 5000,
    //     img: "@/assets/images/car-example.png"
    //   },
    //   {
    //     id: 3,
    //     name: "Hyundai, i30 N",
    //     maxPrice: 1000,
    //     minPrice: 5000,
    //     img: "@/assets/images/car-example.png"
    //   },
    //   {
    //     id: 4,
    //     name: "Hyundai, i30 N",
    //     maxPrice: 1000,
    //     minPrice: 5000,
    //     img: "@/assets/images/car-example.png"
    //   },
    //   {
    //     id: 5,
    //     name: "Hyundai, i30 N",
    //     maxPrice: 1000,
    //     minPrice: 5000,
    //     img: "@/assets/images/car-example.png"
    //   },
    //   {
    //     id: 6,
    //     name: "Hyundai, i30 N",
    //     maxPrice: 1000,
    //     minPrice: 5000,
    //     img: "@/assets/images/car-example.png"
    //   }
    // ];
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
