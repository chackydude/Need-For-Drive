<template>
  <div class="admin-footer">
    <div class="admin-footer__links admin-links">
      <router-link to="/" class="admin-links__link"
        >Главная страница</router-link
      >
      <router-link to="/" class="admin-links__link"
      >Ссылка</router-link
      >
    </div>
    <div class="admin-footer__copyright">
      Copyright © 2020 Simbirsoft
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminFooter"
};
</script>

<style scoped lang="scss">
.admin-footer {
  width: 100%;
  height: 68px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
}

.admin-links__link {
  text-decoration: none;
  color: #007bff;
  margin-right: 16px;
  /*&:visited {*/
  /*    color: #6d35b5;*/
  /*}*/
}

.admin-footer__copyright {
  color: #818ea3;
}

.admin-footer__links,
.admin-footer__copyright {
  font-size: 14px;
}

@media (max-width: 600px) {
  .admin-footer__links,
  .admin-footer__copyright {
    font-size: 10px;
  }
}
</style>
