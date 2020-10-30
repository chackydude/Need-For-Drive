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
      <slider class="slider" animation="normal" height="100vh">
        <slider-item
          class="slider-item"
          v-for="slide in slides"
          :key="slide.title"
          :style="{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.5), #000), ' +
              `url(${slide.backgroundImage})` +
              ' 50% / cover'
          }"
        >
          <div class="item__content slide-content">
            <p class="slide-content__title">{{ slide.title }}</p>
            <p class="slide-content__description">
              {{ slide.description }}
            </p>
            <button
              class="slide-content__button"
              :style="
                'background: linear-gradient(90deg,' +
                  slide.buttonColors[0] +
                  ',' +
                  slide.buttonColors[1] +
                  ')'
              "
            >
              Подробнее
            </button>
          </div>
        </slider-item>
      </slider>
    </div>
  </div>
</template>

<script>
import { Slider, SliderItem } from "vue-easy-slider";
import SideBar from "../components/SideBar";
// that works only with imports, but i'm still trying to find another solution
import backImage1 from "../assets/images/slide-1.png";
import backImage2 from "../assets/images/slide-2.png";
import backImage3 from "../assets/images/slide-3.png";
import backImage4 from "../assets/images/slide-4.png";

export default {
  name: "Main",
  components: {
    SideBar,
    Slider,
    SliderItem
  },
  data() {
    return {
      slides: [
        {
          title: "Бесплатная парковка",
          description:
            "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
          buttonColors: ["#13493f", "#0c7b1b"],
          backgroundImage: backImage1
        },
        {
          title: "Страховка",
          description: "Полная страховка страховка автомобиля",
          buttonColors: ["#132949", "#0c7b67"],
          backgroundImage: backImage2
        },
        {
          title: "Бензин",
          description: "Полный бак на любой заправке города за наш счёт",
          buttonColors: ["#493013", "#7b0c3b"],
          backgroundImage: backImage3
        },
        {
          title: "Обслуживание",
          description: "Автомобиль проходит еженедельное ТО",
          buttonColors: ["#281349", "#720c7b"],
          backgroundImage: backImage4
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import "public/css/variables";
.page-wrapper {
  display: flex;
  flex-direction: row;
}

.main {
  flex-grow: 1;
  width: auto;
  padding: 32px 64px 32px 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  flex-grow: 5;
  color: #fff;
}

.slider {
  z-index: 0;
}

.slider-item {
  background-repeat: no-repeat;
}

.item__content {
  margin: auto;
  max-width: 485px;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  line-height: 2;
}

.slide-content__title {
  font-size: 40px;
  font-weight: bold;
}

.slide-content__description {
  font-size: 24px;
}

.slide-content__button {
  width: 165px;
  height: 48px;
  color: #fff;
  font-size: 18px;
  border-radius: 4px;
  margin-top: 32px;
  border: none;
}
</style>
