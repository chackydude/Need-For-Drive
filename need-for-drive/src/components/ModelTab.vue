<template>
  <div class="model-tab">
    <div class="model-tab__radio-buttons">
      <input
        type="radio"
        class="radio-button"
        name="contact"
        value="Все категории"
        id="all"
      />
      <label class="radio-button__label" for="all">Все категории</label>

      <input
        type="radio"
        class="radio-button"
        name="contact"
        value="Эконом"
        id="eco"
      />
      <label class="radio-button__label" for="eco">Эконом</label>

      <input
        type="radio"
        class="radio-button"
        name="contact"
        value="Премиум"
        id="premium"
      />
      <label class="radio-button__label" for="premium">Премиум</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelTab",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "public/css/variables";
@import "public/css/mixins";
.model-tab__radio-buttons {
  margin-top: 34px;
}

.radio-button {
  margin-top: -2px;
}

.radio-button__label {
  @include fontStylesLight;
  margin: 0 15px 0 8px;
}

input[type='radio']:after {
  box-sizing: border-box;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  left: 0px;
  top: 0px;
  position: relative;
  background-color: #fff;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 1px solid #000;
}

input[type='radio']:checked:after {
  box-sizing: border-box;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  left: 0px;
  top: 0px;
  position: relative;
  background-color: #fff;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 3px solid $main-accent-color;
}
</style>
