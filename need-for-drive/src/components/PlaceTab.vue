<template>
  <div class="place-tab">
    <div class="place-tab__inputs inputs">
      <div class="inputs__input input-field">
        <p class="input-field__title">Город</p>
        <input
          type="search"
          class="input-field__input"
          placeholder="Ваш город"
        />
      </div>
      <div class="inputs__input input-field">
        <p class="input-field__title">Пункт выдачи</p>
        <input
          type="search"
          class="input-field__input"
          placeholder="Начните вводить пункт..."
        />
      </div>
    </div>
    <div class="place-tab__map map-area">
      <p class="map-area__title">Выберите на карте:</p>
      <div class="map-area__map">
        <img src="@/assets/images/map-example.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaceTab"
};
</script>

<style scoped lang="scss">
@mixin fontStyles() {
  font-size: 14px;
  font-weight: lighter;
}

.place-tab__inputs {
  margin-top: 32px;
}

.inputs {
  display: flex;
  flex-direction: column;

  .input-field {
    margin-top: 10px;
  }
}

.input-field {
  display: flex;
  flex-direction: row;

  .input-field__input {
    margin-left: 8px;
  }
}

.input-field__title {
  text-align: right;
  min-width: 92px;
  @include fontStyles;
}

.input-field__input {
  border: none;
  border-bottom: 1px solid;
  @include fontStyles;
  min-width: 224px;
}

.place-tab__map {
    margin-top: 45px;
}

.map-area__title {
  @include fontStyles;
    margin-bottom: 16px;
}
</style>
