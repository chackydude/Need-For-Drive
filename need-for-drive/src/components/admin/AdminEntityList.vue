<template>
  <div class="admin-order-list">
    <div class="admin-order-list__filters filters">
      <div class="filters__select-container">
        <v-select
          v-for="searchFilter in searchFilters"
          :key="searchFilter.id"
          type="text"
          class="filters__select"
          :placeholder="searchFilter.name"
          :options="searchFilter.options"
          v-model="searchFilter.modelingValue.value"
        ></v-select>
      </div>
      <button class="filters__accept-button admin-button" @click="clickCallback">
        Применить
      </button>
    </div>
    <div class="admin-order-list__content">
      <slot />
    </div>
    <div class="admin-order-list__pagination">
      <paginate
        :pageCount="Math.floor(totalAmount / pageLimit) + 1"
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
import "vue-select/dist/vue-select.css";

export default {
  name: "AdminOrderList",
  props: {
    totalAmount: Number,
    pageLimit: Number,
    forClickCallback: Function,
    searchFilters: {
      type: Array,
      default: function() {
        return [
          {
            id: 0,
            name: "Placeholder",
            options: ["you", "forgot", "to pass", "filter", "parameters"],
            modelingValue: { name: "option", value: "" }
          },
        ];
      }
    }
  },
  components: {
    Paginate
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    clickCallback: function(page) {
      this.currentPage = page;
      this.forClickCallback({ page: this.currentPage, limit: this.pageLimit, params: this.searchFilters.map(searchFilter => searchFilter.modelingValue) });
    }
  }
};
</script>

<style lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.filters__select-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.v-select {
  min-height: 29px;
  min-width: 110px;
  border-radius: 3px;
  margin: 8px 15px 0 0;
}

.vs__search::placeholder,
.vs__dropdown-toggle,
.vs__dropdown-menu {
  @include fontStylesLight;
  font-weight: lighter !important;
}

.vs__open-indicator {
  display: none;
}

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
  padding: 10px 20px 15px 20px;
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
  margin: 0 5px 0 5px;
  padding: 1px 5px 1px 5px;
  border-radius: 4px;
  width: fit-content;
}

.nav-item {
  margin: 0 5px 0 5px;
  padding: 1px 4px 1px 4px;
}

.nav-item:active,
.page-item:active {
  color: #fff;
  background-color: $admin-blue-color;
  border-radius: 4px;
}

.page-item--active {
  color: #fff;
  background-color: $admin-blue-color;
}

@media (max-width: 850px) {
  .filters__accept-button {
    font-size: 8px;
    height: 25px;
    margin: 5px 5px 0 0;
  }

  .v-select {
    height: 25px;
    width: 65px;
    margin: 5px 5px 0 0 !important;
  }

  .v-select,
  .vs__search::placeholder,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    font-size: 10px;
  }
}
</style>
