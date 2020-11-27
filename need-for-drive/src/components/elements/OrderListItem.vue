<template>
  <div class="check-item">
    <div class="check-item__name">
      {{ name }}
    </div>
    <div class="check-item__divider"></div>
    <p class="check-item__value">
      {{ value }}
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "OderListItem",
  props: {
    name: String,
    value: [String, Array]
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.check-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @include fontStylesLight;
}

.check-item__name {
  flex-shrink: 0;
}

.check-item__divider {
  border-bottom: 2px dotted $gray-color;
  margin: 0 8px 0 8px;
  flex-grow: 1;
  width: 100%;
  flex-shrink: 1;
}

.check-item__value {
  color: $gray-color;
  text-align: right;
  flex-shrink: 0;
}

.check-item__value, .check-item__name, .check-item__divider {
  align-self: flex-end;
}
</style>
