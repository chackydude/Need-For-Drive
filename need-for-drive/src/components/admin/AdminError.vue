<template>
  <div class="admin-error">
    <h2 class="admin-error__code">500</h2>
    <h1 class="admin-error__message">Что-то пошло не так</h1>
    <p class="admin-error__advice">Попробуйте перезагрузить страницу</p>
    <button class="admin-error__back-button">Назад</button>
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
</style>
