<template>
  <div class="tab-bar">
    <div class="tab-bar_tab" v-for="tab in tabs" :key="tab">
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      tabs: ["Местоположение", "Модель", "Дополнительно", "Итого"]
    };
  }
};
</script>

<style scoped></style>
