<template>
  <div class="car-item">
    <div class="car-item__info">
      <div class="car-item__name">
        {{ car.name }}
      </div>
      <div class="car-item__price">
        {{ car.minPrice }} - {{ car.maxPrice }} ₽
      </div>
    </div>

    <img
      src="@/assets/images/car-example.png"
      alt="car-image"
      class="car-item__image"
    />
  </div>
</template>
<script>
export default {
  name: "CarItem",
  props: {
    car: Object
  }
};
</script>

<style lang="scss">
@import "public/css/variables";
@import "public/css/mixins";
.car-item {
  height: 224px;
  width: 369px;
  box-sizing: border-box;
  border: 1px $gray-light-color solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.car-item:hover {
  border: 1px $main-accent-color solid;
}

.car-item:active {
  border: 1px $gray-color solid;
}

.car-item__name {
  font-size: 18px;
}

.car-item__price {
  font-size: 14px;
  color: $gray-color;
}

.car-item__image {
  align-self: flex-end;
}
</style>
