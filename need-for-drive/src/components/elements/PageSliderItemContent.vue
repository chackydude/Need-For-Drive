<template>
  <div
    class="slider__item-wrapper"
    :style="{
      background:
        'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.5), rgba(0,0,0,1)), ' +
        `url(${backgroundImage})` +
        ' 50% / cover'
    }"
  >
    <div class="item__content slide-content">
      <p class="slide-content__title">{{ title }}</p>
      <p class="slide-content__description">
        {{ description }}
      </p>
      <router-link
        :to="`/order/${getOrderId}`"
        tag="button"
        class="slide-content__button"
        :style="
          'background: linear-gradient(90deg,' +
            buttonColors[0] +
            ',' +
            buttonColors[1] +
            ');'
        "
      >
        Подробнее
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageSliderItem",
  props: {
    title: String,
    description: String,
    backgroundImage: String,
    buttonColors: Array
  },
  computed: {
    ...mapGetters(["getOrderId"])
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/css/mixins";
.slider__item-wrapper {
  background-repeat: no-repeat;
  padding: 0 8vw 0 8vw;
}

.item__content {
  margin: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  line-height: 1;
}

.slide-content__title {
  font-size: 40px;
  margin-bottom: 22px;
  font-weight: bold;
}

.slide-content__description {
  font-size: 24px;
  font-weight: 300;
}

.slide-content__button {
  width: 165px;
  height: 48px;
  color: #fff;
  font-size: 18px;
  border-radius: 4px;
  margin-top: 32px;
  border: none;
  cursor: pointer;
  @include buttonStyles;
}
</style>
