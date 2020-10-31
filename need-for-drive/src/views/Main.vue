<template>
  <div class="page-wrapper">
    <SideBar class="page-wrapper__sidebar" />
    <div class="page-wrapper__main main">
      <header class="main__header header">
        <p class="header__title">Need for drive</p>
        <div class="header__current-city">
          <img src="@/assets/icons/place_icon.svg" alt="current-city" />
          <div>
            Ульяновск
          </div>
        </div>
      </header>
      <main class="main__welcome-area welcome">
        <div class="welcome-area__title title">
          <p class="title__first-phrase">Каршеринг</p>
          <p class="title__second-phrase">Need for drive</p>
          <p class="title__description">Поминутная аренда авто твоего города</p>
        </div>
        <button class="welcome-area__button">
          Забронировать
        </button>
      </main>
      <footer class="main__footer footer">
        <p class="footer__copyright">© 2016-2019 «Need for drive»</p>
        <p class="footer__telephone">8 (495) 234-22-44</p>
      </footer>
    </div>
    <div class="page-wrapper__slider">
      <PageSlider />
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import PageSlider from "../components/PageSlider";

export default {
  name: "Main",
  components: {
    SideBar,
    PageSlider
  }
};
</script>

<style scoped lang="scss">
@import "public/css/variables";
@import "../../public/css/mixins";
.page-wrapper {
  display: flex;
  flex-direction: row;
}

.main {
  width: auto;
  padding: 32px 64px 32px 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
}

.main__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.welcome-area__title {
  line-height: 0.9;
}

.title__first-phrase,
.title__second-phrase {
  font-size: 70px;
  font-weight: bold;
}

.title__first-phrase {
  color: $black-color;
}

.title__second-phrase {
  color: $main-accent-color;
}

.title__description {
  color: $gray-color;
  font-size: 26px;
  margin-top: 35px;
}

.welcome-area__button {
  margin-top: 66px;
  background-color: $main-accent-color;
  border: none;
  color: white;
  border-radius: 8px;
  height: 48px;
  width: 250px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  @include buttonStulesByColor($main-accent-color);
}

.main__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;
}

.footer__copyright {
  color: $gray-color;
}

.footer__telephone {
  color: $black-color;
}

.page-wrapper__slider {
  background-color: $black-color;
  height: 100vh;
  flex: 1 0 40%;
  color: #fff;
}

@media (max-width: 1024px) {
  .page-wrapper__slider {
    display: none;
  }
}
</style>
