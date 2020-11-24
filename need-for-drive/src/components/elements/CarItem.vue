<template>
  <div class="car-item">
    <div class="car-item__info">
      <div class="car-item__name">
        {{ name }}
      </div>
      <div class="car-item__price">{{ priceMin }} - {{ priceMax }} ₽</div>
    </div>

    <img
      :src="
        'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/files/' +
          img
      "
      alt="car-image"
      class="car-item__image"
      crossOrigin="anonymous"
      referrerPolicy="origin"
    />
  </div>
</template>
<script>
export default {
  name: "CarItem",
  props: {
    name: String,
    priceMin: Number,
    priceMax: Number,
    img: String
  }
};
</script>

<style lang="scss">
@import "public/css/variables";
@import "public/css/mixins";
.car-item {
  height: 224px;
  width: 369px;
  padding: 20px;
  border: 1px $gray-light-color solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
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
  height: 120px;
}

@media (max-width: 768px) {
  .car-item {
    width: 300px;
  }
}
</style>
