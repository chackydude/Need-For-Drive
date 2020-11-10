<template>
  <div class="check-item">
    <p class="check-item__name">
      <slot name="name"></slot>
    </p>
    <div class="check-item__divider"></div>
    <p class="check-item__value">
      <slot name="value"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "OderListItem"
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.check-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: right;
  @include fontStylesLight;
}

.check-item__divider {
  border-bottom: 2px dotted $gray-color;
  flex-grow: 1;
  margin: 0 8px 0 8px;
}

.check-item__value {
  color: $gray-color;
}
</style>
