<template>
  <div class="car-item">
    <img
      src="@/assets/images/car-example.png"
      alt="car-image"
      class="car-item__image"
    />
    <div class="car-item__info">
      <div class="car-item__name">Hyundai, Tucson</div>
      <div class="car-item__number">м000ок</div>
    </div>
    <div class="car-item__category">Премиум</div>
    <div class="car-item__colors">
      Черный, Красный, Белый, Зеленый
    </div>
    <div class="car-item__edit">
      <button class="action-button">
        <img src="@/assets/icons/admin/buttons/edit.svg" alt="edit" />
        <p class="action-button__text">Изменить</p>
      </button>
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
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  padding: 13px 21px 13px 21px;
  border-bottom: 1px $gray-light-color solid;
}

.car-item {
  div {
    text-align: center;
    justify-self: center;
    padding: 7px;
  }
}

.car-item__main-info {
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: center;
}

.car-item__info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.car-item__image {
  height: 5vw;
  margin-bottom: 10px;
}

.car-item__number {
  border: 1px $gray-color solid;
  width: fit-content;
  max-height: 30px;
  padding: 7px 9px 7px 9px;
  border-radius: 0 4px 4px 0;
}

.car-item__name {
  background-color: $admin-blue-color;
  color: #fff;
  border-radius: 4px 0 0 4px;
  border: 1px $admin-blue-color solid;
  max-height: 30px;
}

.action-button {
  height: 24px;
  width: auto;
  min-width: 71px;
  padding: 8px;
  font-size: 11px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: $admin-text-gray;
  border: 1px solid #becad6;
  border-radius: 4px;
  @include buttonStylesByColor(#fff);
  cursor: pointer;

  img {
    margin-right: 3px;
  }
}

@media (max-width: 1260px) {
  .car-item__image {
    display: none;
  }
}

@media (max-width: 850px) {
  .car-item {
    font-size: 11px;
  }

  .car-item__name {
    font-size: 11px;
  }

  .car-item__colors {
    display: none;
  }
}

@media (max-width: 500px) {
  .car-item__category {
    display: none;
  }

  .car-item__name {
    font-size: 7px;
    min-height: 28px;
    display: flex;
    align-items: center;
  }

  .car-item__number {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 340px) {
  .car-item__number {
    min-height: 30px;
  }
}
</style>
