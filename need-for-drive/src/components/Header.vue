<template>
  <div class="header">
    <Menu class="page-wrapper__mobile-menu" dark />
    <div class="content">
      <router-link to="/" class="header__title">Need for drive</router-link>
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
import Menu from "./elements/Menu";
export default {
  name: "Header",
  components: {
    Menu
  }
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

.page-wrapper__mobile-menu {
  display: none;
}

.header__title {
  color: $main-accent-color;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
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

@media (max-width: 768px) {
  .page-wrapper__mobile-menu {
    display: block;
    position: absolute;
    left: 16px;
    top: 20px;
  }

  .header {
    justify-content: space-between;
  }

  .content {
    flex-direction: column;
    justify-content: center;
    padding: 0 32px 0 32px;
  }

  .header__title {
    font-size: 20px;
  }
}
</style>
