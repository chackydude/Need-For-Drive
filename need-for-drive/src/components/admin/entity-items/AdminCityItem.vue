<template>
  <div class="city-item">
    <div class="city-item__info">
      <div class="city-item__name">{{ name }}</div>
      <div class="city-item__updated-at">Обновлен: {{ updatedAt | toDate }}</div>
    </div>
    <div class="city-item__edit">
      <button class="action-button" @click="toEditEntity">
        <img src="@/assets/icons/admin/buttons/edit.svg" alt="edit" />
        <p class="action-button__text">Изменить</p>
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "AdminCityItem",
  props: {
    id: String,
    name: String,
    updatedAt: Number
  },
  methods: {
    toEditEntity() {}
  },
  filters: {
    toDate(date) {
      return dayjs(date).format("DD.MM.YYYY hh:mm");
    }
  }
};
</script>

<style lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.city-item {
  width: 100%;
  padding: 0 30px 0 30px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.city-item__info {
  display: flex;
  flex-direction: row;

  color: #889098;
  font-weight: lighter;
}

.city-item__name {
  min-width: 170px;
  justify-self: center;

  color: $black-color;
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

.city-item__name,
.city-item__updated-at {
  margin-right: 20px;
}

@media (max-width: 800px) {
  .city-item__name {
    min-width: 100px;
    font-size: 12px;
  }

  .city-item__updated-at {
    font-size: 12px;
  }
}

@media (max-width: 400px) {
  .city-item__info {
    flex-direction: column;
  }
}
</style>
