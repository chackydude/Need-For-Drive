<template>
  <div class="tabs">
    <div class="tabs__links links">
      <div
        v-for="tab in tabs"
        :class="{ 'is-active': tab.isActive }"
        :key="tab.name"
      >
        <a class="links__link link" @click="selectTab(tab)">
          {{ tab.name }}
        </a>
        <img
          v-if="!tab.isLast"
          class="links__icon icon"
          src="@/assets/icons/next.svg"
          alt="next"
        />
      </div>
    </div>

    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {
      tabs: []
    };
  },

  created() {
    this.tabs = this.$children;
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../public/css/variables";

$padding: 64px;

.tabs {
  display: flex;
  flex-direction: column;
}

.links {
  padding: 0 $padding 0 $padding;
  border-top: 1px solid $gray-light-color;
  border-bottom: 1px solid $gray-light-color;
  height: 32px;
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: bold;
}

.page-content {
  padding: 0 $padding 0 $padding;
}

.link {
  text-decoration: none;
  cursor: pointer;
  color: $gray-color;
}

.links__link,
.links__icon {
  margin-right: 18px;
}

.none {
  display: none;
}

.is-active a {
  color: $main-accent-color;
}
</style>
