<template>
  <div class="edit-item">
    <label>{{ labelName }}</label>
    <input
      :type="type"
      :placeholder="placehoder"
      v-model="modelingValue.value"
    />
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    labelName: String,
    type: String,
    placehoder: String,
    modelingValue: Object
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.edit-item {
  display: flex;
  flex-direction: column;
  width: 320px;
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
</style>
