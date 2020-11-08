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
  },

  data() {
    return {
      isActive: false
    };
  },

  mounted() {
    this.isActive = this.selected;
  }
};
</script>

<style scoped></style>
