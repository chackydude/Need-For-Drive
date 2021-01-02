<template>
  <div class="result-tab">
    <div class="result-tab__car-info car-info"  v-if="!isLoading">
      <p class="car-info__name">{{ getModel.name }}</p>
      <p v-if="getModel.number" class="car-info__number">
        {{ getModel.number | toNumber }}
      </p>
      <p class="car-info__tank">
        Топливо:
        <span class="car-info__property-value">{{ tank }}%</span>
      </p>
      <p class="car-info__date">
        Доступна с
        <span class="car-info__property-value">{{ dateFrom }}</span>
      </p>
    </div>
    <div class="result-tab__car-image car-image" v-if="!isLoading">
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
    <div class="result-tab__loader" v-if="isLoading">
      <pulse-loader :loading="isLoading" color="#0ec261"></pulse-loader>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import dayjs from "dayjs";

export default {
  name: "ResultTab",
  components: {
    PulseLoader
  },
  computed: {
    ...mapGetters([
      "getModel",
      "getDateFrom",
      "getExtraServices",
      "getOrderStatus",
      "getSendStatus"
    ]),
    tank() {
      if (this.getModel.tank !== 100) {
        if (
          this.getExtraServices.map(item => item.text).indexOf("Полный бак") !==
          -1
        ) {
          return 100;
        } else {
          return this.getModel.tank;
        }
      } else {
        return this.getModel.tank;
      }
    },
    dateFrom() {
      return dayjs(this.getDateFrom).format("DD.MM.YYYY hh:mm");
    },
    isLoading() {
      return this.getSendStatus && !localStorage.getItem("orderId");
    }
  },
  methods: {
    ...mapMutations(["updateFillStatus"])
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
  },
  mounted() {
    this.updateFillStatus(true);
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/css/mixins";
@import "../../../public/css/variables";
.result-tab {
  margin-top: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 100%;
  width: 726px;
}

.result-tab__loader {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

.car-image {
  align-self: flex-end;
  height: 116px;
  margin-bottom: 20px;
}

.car-item__image {
  height: 116px;
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
