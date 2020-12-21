<template>
  <div v-if="isActive"><slot></slot></div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    name: String,
    selected: { default: false },
    isLast: { default: false },
    isActive: Boolean
  },

  mounted() {
    this.isActive = this.selected;
  }
};
</script>

<style scoped></style>
