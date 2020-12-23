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
  font-weight: normal;
  font-size: 50px;
  color: $admin-text-dark;
  margin-bottom: 15px;
}

.admin-error__advice {
  font-weight: normal;
  font-size: 20px;
  color: $admin-text-light;
  margin-bottom: 20px;
}

.admin-error__back-button {
  height: 29px;
  width: 95px;
  color: white;
  background-color: $admin-blue-color;
  border-radius: 3px;
  font-weight: lighter;
  border: none;
  @include buttonStylesByColor($admin-blue-color);
  cursor: pointer;
  padding: 0 8px 0 8px;
}


</style>
