<template>
  <div class="side-bar">
    <div class="side-bar__menu-wrapper menu-wrapper" v-on:click="isActive = !isActive">
      <div class="menu-wrapper__hamburger-menu hamburger-menu" v-bind:class="{ 'hamburger-menu--active': isActive }"></div>
    </div>
    <button class="side-bar__lang-button">
      Eng
    </button>
    <div class="nav-bar" v-bind:class="{ 'nav-bar--active': isActive }"></div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../public/css/menu";
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

.side-bar__lang-button {
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
}

.nav-bar {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #151b1f;
  height: 100vh;
  width: 100vw;
  display: none;
}

.nav-bar--active {
  display: block;
  opacity: 0.98;
}

/*@keyframes menu {*/
/*  0% { opacity: 0; }*/
/*  100% { opacity: 0.9; }*/
/*}*/
</style>
