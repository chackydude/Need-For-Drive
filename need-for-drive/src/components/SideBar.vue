<template>
  <div class="side-bar">
    <Menu class="side-bar__menu" />
    <button class="side-bar__lang-button lang-button">
      Eng
    </button>
  </div>
</template>

<script>
import Menu from "./utils/Menu";
export default {
  name: "SideBar",
  components: {
    Menu
  }
};
</script>

<style scoped lang="scss">
@import "../../public/css/hamburger-menu";
@import "public/css/variables";
.side-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 65px;
  height: 100vh;
  background-color: #151b1f;
  padding: 38px 0 20px 0;
}

.lang-button {
  background-color: #151b1f;
  color: $main-accent-color;
  font-size: 13px;
  width: 45px;
  padding: 13px 0 13px 0;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #151b1f;
  border-radius: 50%;
  outline: none; /*где-то в мире разозлился один Вадим Макеев*/

  &:hover {
    color: #fff;
    border-color: #fff;
    transition: all 0.3s;
  }

  &:active {
    color: $main-accent-color;
  }
}
</style>
