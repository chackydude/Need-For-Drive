<template>
  <div class="admin-header">
    <div class="admin-header__search-bar search-bar">
      <img
        src="@/assets/icons/admin/search.svg"
        alt="logo"
        class="search-bar__icon"
      />
      <input type="search" placeholder="Поиск..." class="search-bar__input" />
    </div>
    <div class="admin-header__admin-info admin-info">
      <div class="admin-info__notifications">
        <img src="@/assets/icons/admin/notifications.svg" alt="notifications" />
      </div>
      <div class="admin-info__actions actions">
        <div class="actions__info-wrapper">
          <img src="@/assets/images/admin/user-avatar.png" alt="avatar" class="actions__admin-avatar">
          <p class="actions__nickname">Admin</p>
        </div>
        <img src="@/assets/icons/admin/dropdown_icon.svg" alt="dropdown" class="actions__dropdown" @click="showActions = !showActions"/>
        <div class="actions__logout" v-if="showActions">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHeader",
  data() {
    return {
      showActions: false
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/css/variables";
@import "../../../public/css/hamburger-menu";

.admin-header {
  width: 100%;
  height: 67px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 8px 4px -4px rgba(165, 182, 201, 0.1);
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar__icon {
  margin-left: 27px;
}

.search-bar__input {
  border: none;
  margin-left: 10px;
}

.admin-info {
  display: flex;
  flex-direction: row;
}

.admin-info__notifications,
.admin-info__actions {
  border-left: 1px solid #e1e5eb;
}

.admin-info__notifications {
  width: 67px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions {
  width: 218px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.actions__admin-avatar {
  border-radius: 50%;
}

.actions__info-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.actions__nickname {
  font-size: 15px;
  color: #5a6169;
  margin-left: 10px;
}

.actions__dropdown {
  cursor: pointer;
}

.actions__logout {
  position: absolute;
  top: 80px;
  font-size: 15px;
  color: #5a6169;
  border: 1px solid black;
}
</style>
