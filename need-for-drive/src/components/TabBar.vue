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
          class="links__icon icon"
          src="@/assets/icons/next.svg"
          alt="next"
        />
      </div>
    </div>

    <div class="tabs-details">
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
.tabs {
  padding: 0 64px 0 64px;
  height: 32px;
  display: flex;
  border-top: 1px solid $gray-light-color;
  border-bottom: 1px solid $gray-light-color;
}

.links {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: bold;
  align-self: center;
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
