<template>
  <div class="model-tab">
    <div class="model-tab__radio-buttons">
      <RadioButton name="Все модели" id="all" @change="changeCategory" />
      <RadioButton name="Эконом" id="eco" @change="changeCategory" />
      <RadioButton name="Премиум" id="premium" @change="changeCategory" />
    </div>
    <div class="model-tab__car-models">
      <CarItem v-for="car in cars" :key="car.id" :car="car" />
    </div>
  </div>
</template>

<script>
import RadioButton from "./common/RadioButton";
import CarItem from "./elements/CarItem";
export default {
  name: "ModelTab",
  components: { CarItem, RadioButton },
  data() {
    return {
      category: "",
      cars: [
        {
          name: "Hyundai, i30 N",
          maxPrice: 1000,
          minPrice: 5000,
          img: "@/assets/images/car-example.png"
        },
        {
          name: "Hyundai, i30 N",
          maxPrice: 1000,
          minPrice: 5000,
          img: "@/assets/images/car-example.png"
        },
        {
          name: "Hyundai, i30 N",
          maxPrice: 1000,
          minPrice: 5000,
          img: "@/assets/images/car-example.png"
        },
        {
          name: "Hyundai, i30 N",
          maxPrice: 1000,
          minPrice: 5000,
          img: "@/assets/images/car-example.png"
        },
        {
          name: "Hyundai, i30 N",
          maxPrice: 1000,
          minPrice: 5000,
          img: "@/assets/images/car-example.png"
        },
        {
          name: "Hyundai, i30 N",
          maxPrice: 1000,
          minPrice: 5000,
          img: "@/assets/images/car-example.png"
        },
      ]
    };
  },
  methods: {
    changeCategory: function(newValue) {
      this.category = newValue;
    }
  }
};
</script>

<style scoped lang="scss">
@import "public/css/variables";
@import "public/css/mixins";
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
