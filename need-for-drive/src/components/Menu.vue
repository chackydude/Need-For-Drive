<template>
  <div>
    <div
      class="side-bar__menu-wrapper menu-wrapper"
      v-on:click="isActive = !isActive"
    >
      <div
        class="menu-wrapper__hamburger-menu hamburger-menu"
        v-bind:class="{ 'hamburger-menu--active': isActive }"
      ></div>
    </div>
    <div class="nav-bar" v-bind:class="{ 'nav-bar--active': isActive }">
      <div class="nav-bar__links links">
        <div class="links__pages">
          <a href="" class="page-link">ПАРКОВКА</a>
          <a href="" class="page-link">СТРАХОВАНИЕ</a>
          <a href="" class="page-link">БЕНЗИН</a>
          <a href="" class="page-link">ОБСЛУЖИВАНИЕ</a>
        </div>
        <div class="links__social-media">
          <img src="@/assets/icons/telegram.svg" alt="current-city" />
          <img src="@/assets/icons/facebook.svg" alt="current-city" />
          <img src="@/assets/icons/instagram.svg" alt="current-city" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style lang="scss">
@import "public/css/variables";



.nav-bar__links {
  margin-left: 100px;
  height: 100vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .page-link {
    margin-top: 30px;
  }
}

.links__pages {
  display: flex;
  flex-direction: column;
}

.page-link {
  text-decoration: none;
  font-size: 32px;
  color: #fff;

  &:hover {
    color: $main-accent-color;
  }
}

.links__social-media {
  margin-top: 40px;
  display: flex;
  flex-direction: row;

  img {
    margin-right: 24px;
  }
}

$bar-width: 24px;
$bar-height: 3px;
$bar-spacing: 8px;
$bar-border-rad: 2px;
$bar-color-light: #fff;
$bar-color-dark: #000;

.side-bar__menu-wrapper {
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}

.menu-wrapper {
  position: absolute;
  top: 40px;
  left: 20px;
  z-index: 2;
  cursor: pointer;
  width: $bar-width;
  height: $bar-height + $bar-spacing * 2;
}

.hamburger-menu,
.hamburger-menu:after,
.hamburger-menu:before {
  width: $bar-width;
  height: $bar-height;
  border-radius: $bar-border-rad;
}

.hamburger-menu {
  transform: translateY($bar-spacing);
  background: $bar-color-light;
  transition: all 0ms 300ms;

  &.hamburger-menu--active {
    background: rgba(255, 255, 255, 0);
  }
}

.hamburger-menu:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: $bar-spacing;
  background: $bar-color-light;
  transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.hamburger-menu:after {
  content: "";
  position: absolute;
  left: 0;
  top: $bar-spacing;
  background: $bar-color-light;
  transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.hamburger-menu.hamburger-menu--active:after {
  top: 0;
  transform: rotate(45deg);
  transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.hamburger-menu.hamburger-menu--active:before {
  bottom: 0;
  transform: rotate(-45deg);
  transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #151b1f;
  height: 100vh;
  width: 100vw;
  display: none;
}

.nav-bar--active {
  z-index: 1;
  display: block;
  opacity: 0.98;
  animation: menu 0.1s;
}

@keyframes menu {
  0% { opacity: 0; }
  100% { opacity: 0.9; }
}

.nav-bar__links {
  height: 100vh;
}

@media (max-width: 768px) {
  .menu-wrapper {
    top: 20px;
  }

  .hamburger-menu,
  .hamburger-menu:after,
  .hamburger-menu:before {
    background: $bar-color-dark;
  }

  .hamburger-menu--active,
  .hamburger-menu--active:after,
  .hamburger-menu--active:before {
    background: $bar-color-light;
  }
}
</style>
