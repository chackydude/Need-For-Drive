<template>
  <div class="admin-order-list">
    <div class="admin-order-list__filters filters">
      <div class="filters__select-container">
        <input type="text" class="filters__select" placeholder="Ваш город" />
        <input type="text" class="filters__select" placeholder="Ваш город" />
        <input type="text" class="filters__select" placeholder="Ваш город" />
        <input type="text" class="filters__select" placeholder="Ваш город" />
      </div>
      <button class="filters__accept-button admin-button">
        Применить
      </button>
    </div>
    <div class="admin-order-list__content">
      <slot />
    </div>
    <div class="admin-order-list__pagination">
      <paginate
        :pageCount="2"
        :containerClass="'pagination'"
        prev-text="«"
        next-text="»"
        :clickHandler="clickCallback"
        :page-class="'page-item'"
        :active-class="'page-item--active'"
        :next-class="'nav-item'"
        :prev-class="'nav-item'"
      ></paginate>
    </div>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
export default {
  name: "AdminOrderList",
  components: {
    Paginate
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    clickCallback: function(page) {
      this.currentPage = page;
    },
  }
};
</script>

<style lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.admin-order-list {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(38, 46, 52, 0.2);
  border-radius: 9px;
  min-height: 50vh;
  width: 100%;
}

.filters {
  min-height: 59px;
  width: 100%;
  border-bottom: 1px solid #e1e5eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
}

.filters__select {
  height: 29px;
  width: 110px;
  border-radius: 3px;
  margin-right: 15px;
  padding: 10px;
  border: 1px solid #e1e5eb;
  font-weight: lighter;
}

.admin-button {
  height: 29px;
  width: 95px;
  color: white;
  background-color: $admin-blue-color;
  border-radius: 3px;
  font-weight: lighter;
  border: none;
  @include buttonStylesByColor($admin-blue-color);
  cursor: pointer;
  padding: 0 8px 0 8px;
}

.admin-order-list__pagination {
  min-height: 59px;
  width: 100%;
  border-top: 1px solid #e1e5eb;
}

.admin-order-list__filters {
  display: flex;
  flex: 0 0 auto;
}

.admin-order-list__content {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}

.admin-order-list__pagination {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.pagination {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @include fontStylesLight;
  font-size: 15px;
  user-select: none;
}

.page-item {
  margin: 0 2px 0 2px;
  padding: 1px 5px 1px 5px;
  border-radius: 50%;
  width: 20px;
}

.nav-item {
  margin: 0 5px 0 5px;
  padding: 1px 4px 1px 4px;
}

.nav-item:active,
.page-item:active {
  color: #fff;
  background-color: $admin-blue-color;
}

.page-item--active {
  color: #fff;
  background-color: $admin-blue-color;
}

@media (max-width: 850px) {
  .filters__select, .filters__accept-button {
    font-size: 8px;
    height: 25px;
    width: 65px;
    margin: 5px 5px 0 0;
  }
}
</style>
