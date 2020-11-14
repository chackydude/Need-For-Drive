<template>
  <Slider class="slider" animation="normal" height="100vh">
    <Slider-item
      v-for="slide in slides"
      :key="slide.title"
      class="slider__item-wrapper"
    >
      <PageSliderItemContent
        :title="slide.title"
        :description="slide.description"
        :background-image="slide.backgroundImage"
        :button-colors="slide.buttonColors"
      />
    </Slider-item>
  </Slider>
</template>

<script>
import { Slider, SliderItem } from "vue-easy-slider";
import backImage1 from "../assets/images/slide-1.png";
import backImage2 from "../assets/images/slide-2.png";
import backImage3 from "../assets/images/slide-3.png";
import backImage4 from "../assets/images/slide-4.png";
import PageSliderItemContent from "./elements/PageSliderItemContent";

export default {
  name: "PageSlider",
  components: {
    PageSliderItemContent,
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
          description: "Полная страховка автомобиля",
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
.slider {
  z-index: 0;
  color: #fff;
}
</style>
