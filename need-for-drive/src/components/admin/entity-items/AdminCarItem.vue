<template>
  <div class="car-item">
    <div class="car-item__name">Hyundai, Tucson</div>
    <div class="car-item__category">Премиум</div>
    <div class="car-item__number">м000ок</div>
    <div class="car-item__colors">
      Черный, Красный, Белый, Зеленый
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCarItem"
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.car-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-height: 88px;
  padding: 13px 21px 13px 21px;
}

.car-item > div {
    text-align: center;
    justify-self: center;
    padding: 7px;
}

.car-item__number {
  border: 1px $gray-color solid;
  width: fit-content;
  padding: 7px 9px 7px 9px;
  border-radius: 4px;
}

@media (max-width: 850px) {
  .car-item {
    font-size: 11px;
  }
}
</style>
