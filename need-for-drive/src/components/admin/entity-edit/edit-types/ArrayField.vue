<template>
  <div class="wrapper">
    <div class="edit-item">
      <label for="car-color">Доступные цвета</label>
      <div>
        <input
          type="text"
          id="car-color"
          placeholder="Синий"
          v-model="currentItem"
        />
        <button @click="addItem">+</button>
      </div>
    </div>
    <div class="main-edit-items__colors">
      <CheckInputItem
        v-for="item in modelingValue.value"
        :key="item"
        input-type="checkbox"
        :value="{ text: item, amount: 0 }"
        :name="item"
        :is-checked="true"
        :is-locked="true"
      />
    </div>
  </div>
</template>

<script>
import CheckInputItem from "../../../common/CheckInputItem";
export default {
  name: "ArrayField",
  components: {
    CheckInputItem
  },
  props: {
    labelName: String,
    type: String,
    placehoder: String,
    modelingValue: Object,
  },
  data() {
    return {
      currentItem: "",
    };
  },
  methods: {
    addItem() {
      if (
        typeof this.currentItem === "string" &&
        this.currentItem.trim().length !== 0 &&
        !this.modelingValue.value
          .map(color => color.toLowerCase())
          .includes(this.currentItem.trim())
      ) {
        this.modelingValue.value.push(this.currentItem.trim());
        this.currentItem = "";
      }
    },
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.wrapper {
  max-width: 320px;
  width: 100%;
}

.edit-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  justify-content: flex-end;
  margin-right: 20px;

  label {
    font-size: 12px;
    margin-bottom: 5px;
  }

  input {
    height: 30px;
    font-size: 15px;
    padding: 10px;
    border-radius: 4px;
    border: 1px darken($admin-light-gray, 20) solid;
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      width: 30px;
      border: 1px darken($admin-light-gray, 20) solid;
      color: darken($admin-light-gray, 20);
      background-color: #fff;
      cursor: pointer;
      border-radius: 4px;
      justify-self: flex-end;
      margin-left: 10px;
      @include buttonStyles;
    }
  }
}

.main-edit-items__colors {
  margin-top: 15px;

  div {
    margin-top: 8px;
  }
}
</style>
