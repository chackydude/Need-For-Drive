<template>
  <div class="car-item">
    <div class="car-item__image-container">
      <img
        :src="imgPathHandled"
        alt="car-image"
        class="car-item__image"
        crossOrigin="anonymous"
        referrerPolicy="origin"
      />
    </div>
    <div class="car-item__info">
      <div class="car-item__name">{{ modelName | valueHandle }}</div>
      <div class="car-item__number">{{ number | valueHandle }}</div>
    </div>
    <div class="car-item__category">{{ categoryName | valueHandle }}</div>
    <div class="car-item__colors">
      {{ colorsHandle.toString() }}
    </div>
    <div class="car-item__edit">
      <button class="action-button" @click="toEditEntity">
        <img src="@/assets/icons/admin/buttons/edit.svg" alt="edit" />
        <p class="action-button__text">Изменить</p>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../../../router";

export default {
  name: "AdminCarItem",
  props: {
    id: String,
    imgPath: String,
    modelName: String,
    number: String,
    categoryName: String,
    colors: Array
  },
  methods: {
    ...mapActions(["fetchCarById"]),
    toEditEntity() {
      this.fetchCarById(this.id);
      router.push(`/admin/edit`);
    }
  },
  computed: {
    ...mapGetters(["getLastCar"]),
    imgPathHandled() {
      return (
        "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/" +
        this.imgPath
      );
    },
    colorsHandle() {
      if (this.colors.length === 0) {
        return "NO DATA";
      } else {
        return this.colors.map(
          color => " " + color.charAt(0).toUpperCase() + color.slice(1)
        );
      }
    }
  },
  filters: {
    valueHandle(value) {
      if (value === undefined) {
        return "NO DATA";
      } else {
        return value;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.car-item {
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  padding: 13px 21px 13px 21px;
  border-bottom: 1px $gray-light-color solid;
  transition: 1s;

  &:hover {
    background-color: $admin-light-gray;
  }
}

.car-item {
  div {
    text-align: center;
    justify-self: center;
    padding: 7px;
  }
}

.car-item__main-info {
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: center;
}

.car-item__info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.car-item__image-container {
  width: 200px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: lighten($admin-blue-color, 40);
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}

.car-item__image {
  height: 5vw;
  width: auto;
}

.car-item__number {
  border: 1px $gray-color solid;
  width: fit-content;
  max-height: 30px;
  padding: 7px 9px 7px 9px;
  border-radius: 0 4px 4px 0;
}

.car-item__name {
  background-color: $admin-blue-color;
  color: #fff;
  border-radius: 4px 0 0 4px;
  border: 1px $admin-blue-color solid;
  max-height: 30px;
}

.car-item__colors {
  width: 250px;
}

.action-button {
  height: 24px;
  width: auto;
  min-width: 71px;
  padding: 8px;
  font-size: 11px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: $admin-text-gray !important;
  border: 1px solid #becad6 !important;
  border-radius: 4px !important;
  @include buttonStylesByColor(#fff);
  cursor: pointer;

  img {
    margin-right: 3px;
  }
}

@media (max-width: 1260px) {
  .car-item__image-container {
    display: none;
  }
}

@media (max-width: 850px) {
  .car-item {
    font-size: 11px;
  }

  .car-item__name {
    font-size: 11px;
  }

  .car-item__colors {
    display: none;
  }
}

@media (max-width: 500px) {
  .car-item__category {
    display: none;
  }

  .car-item__name {
    font-size: 7px;
    min-height: 28px;
    display: flex;
    align-items: center;
  }

  .car-item__number {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 340px) {
  .car-item__number {
    min-height: 30px;
  }
}
</style>
