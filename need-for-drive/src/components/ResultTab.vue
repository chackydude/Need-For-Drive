<template>
  <div class="result-tab">
    <div class="result-tab__car-info car-info">
      <p class="car-info__name">{{ getModel.name }}</p>
      <p class="car-info__number">{{ getModel.number | toNumber }}</p>
      <p class="car-info__tank">
        Топливо:
        <span class="car-info__property-value">{{ getModel.tank }}%</span>
      </p>
      <p class="car-info__date">
        Доступна с
        <span class="car-info__property-value">{{ getDateFrom }}</span>
      </p>
    </div>
    <div class="result-tab__car-image car-image">
      <img
        :src="
          'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/' +
            getModel.thumbnail
        "
        alt="car-image"
        class="car-item__image"
        crossOrigin="anonymous"
        referrerPolicy="origin"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ResultTab",
  computed: {
    ...mapGetters(["getModel", "getDateFrom"])
  },
  filters: {
    toNumber(num) {
      return (
        num.slice(0, 1) +
        " " +
        num.slice(1, 4) +
        " " +
        num.slice(4)
      ).toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";
.result-tab {
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 726px;
}

.car-info__name {
  font-size: 18px;
}

.car-info__property-value {
  @include fontStylesLight;
}

.car-info p {
  margin-bottom: 14px;
}

.car-info__number {
  border: 1px $gray-color solid;
  width: fit-content;
  padding: 7px 9px 7px 9px;
  border-radius: 4px;
}

.car-info__tank,
.car-info__date {
  font-weight: bold;
}

@media (max-width: 1324px) {
  .result-tab {
    flex-direction: column-reverse;
    align-items: center;
    width: auto;
  }

  .car-item__image {
    margin-bottom: 20px;
  }
}
</style>
