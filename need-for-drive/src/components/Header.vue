<template>
  <div class="header">
    <div class="content">
      <p class="header__title">Need for drive</p>
      <div class="header__current-city">
        <img src="@/assets/icons/place_icon.svg" alt="current-city" />
        <div>
          Ульяновск
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss">
@import "public/css/variables";

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin: 0 auto;
  padding: 0 64px 0 64px;
}

.header__title {
  color: $main-accent-color;
  font-size: 30px;
  font-weight: bold;
}

.header__current-city {
  font-size: 14px;
  color: $gray-color;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    margin-left: 8px;
  }
}
</style>
