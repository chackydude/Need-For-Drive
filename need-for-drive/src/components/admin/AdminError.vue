<template>
  <div class="admin-error">
    <h2 class="admin-error__code">500</h2>
    <h1 class="admin-error__message">Что-то пошло не так</h1>
    <p class="admin-error__advice">Попробуйте перезагрузить страницу</p>
    <button class="admin-error__back-button admin-button">Назад</button>
  </div>
</template>

<script>
export default {
  name: "AdminError",
};
</script>

<style lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.admin-error {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1 0 auto;
}

.admin-error__code {
  font-size: 75px;
  color: #CACEDB;
  margin-bottom: 20px;
}

.admin-error__message {
  font-size: 50px;
  color: #3D5170;
  margin-bottom: 15px;
}

.admin-error__advice {
  font-size: 20px;
  color: #818EA3;
  margin-bottom: 20px;
  @include fontStylesLight;
}

.admin-error__back-button {
  height: 29px;
  width: 95px;
  color: white;
  background-color: #007bff;
  border-radius: 3px;
  font-weight: lighter;
  border: none;
  @include buttonStylesByColor(#007bff);
  cursor: pointer;
  padding: 0 8px 0 8px;
}


</style>
