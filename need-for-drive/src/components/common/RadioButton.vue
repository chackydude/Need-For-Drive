<template>
  <div class="radio-button">
    <input
      :type="inputType"
      class="radio-button__checker"
      :name="groupName"
      :value="name"
      :id="id"
      @click="change"
      :checked="getCheckState"
    />
    <label class="radio-button__label" :for="id"> {{ name }} </label>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: String,
    id: String,
    isChecked: Boolean,
    comparingValue: String,
    groupName: String,
    inputType: {
      default: "radio"
    }
  },
  methods: {
    change() {
      this.$emit("change", this.name);
    }
  },
  computed: {
    getCheckState() {
      return this.name === this.comparingValue;
    }
  }
};
</script>

<style scoped lang="scss">
@import "public/css/variables";
@import "public/css/mixins";

.radio-button {
  cursor: pointer;
}

.radio-button__label {
  @include fontStylesLight;
  padding: 0 15px 0 8px;
  cursor: pointer;
}

input[type="radio"]:after {
  box-sizing: border-box;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  left: 0px;
  top: 0px;
  position: relative;
  background-color: #fff;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 1px solid #000;
}

input[type="radio"]:checked:after {
  box-sizing: border-box;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  left: 0px;
  top: 0px;
  position: relative;
  background-color: #fff;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 3px solid $main-accent-color;
}

@media (max-width: 768px) {
  .radio-button__label {
    font-size: 12px;
  }
}
</style>
