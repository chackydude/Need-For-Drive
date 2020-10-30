<template>
  <div class="main-content">
    <NavBar />
  </div>
</template>

<script>
import NavBar from "../components/SideBar";
export default {
  name: "Main",
  components: { NavBar }
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
}
</style>