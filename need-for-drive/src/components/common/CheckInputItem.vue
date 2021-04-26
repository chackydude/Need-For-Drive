<template>
  <div class="radio-button">
    <input
      :type="inputType"
      class="radio-button__checker"
      :name="groupName"
      :value="value"
      :id="id"
      @click="change"
      :checked="getCheckState"
    />
    <label class="radio-button__label" :for="id"> {{ name }} </label>
  </div>
</template>

<script>
export default {
  name: "CheckInputItem",
  props: {
    name: String,
    id: String,
    isChecked: Boolean,
    comparingValue: [String, Array],
    groupName: String,
    value: Object,
    isLocked: {
      type: Boolean,
      default: false
    },
    inputType: {
      default: "radio"
    }
  },
  methods: {
    change() {
      if (this.isLocked) this.preventStop(event);
      this.$emit("change", this.value);
    },
    preventStop(e) {
      e.preventDefault();
      return false;
    }
  },
  computed: {
    getCheckState() {
      if (this.isChecked) return true;
      if (this.comparingValue instanceof Array) {
        for (let i = 0; i < this.comparingValue.length; i++) {
          if (this.comparingValue[i].text === this.value.text) {
            return true;
          }
        }
        return false;
      } else {
        return this.value.text === this.comparingValue;
      }
    }
  }
};
</script>

<style lang="scss">
@import "public/css/variables";
@import "public/css/mixins";

.radio-button {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.radio-button__label {
  @include fontStylesLight;
  padding: 0 15px 0 8px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
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
