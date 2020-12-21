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
      <div class="admin-info__actions actions dropdown" @click="showActions = !showActions">
        <div class="actions__info-wrapper">
          <img src="@/assets/images/admin/user-avatar.png" alt="avatar" class="actions__admin-avatar">
          <p class="actions__nickname">Admin</p>
          <img src="@/assets/icons/admin/dropdown_icon.svg" alt="dropdown" class="actions__dropdown"/>
        </div>
        <div class="dropdown-content">
          <router-link to="/admin" tag="p">Logout</router-link>
        </div>
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
  background-color: #fff;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 27px 0 27px;
}

.search-bar__input {
  border: none;
  margin-left: 10px;
  width: 100%;
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
  padding: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions {
  width: 218px;
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
}

.actions__admin-avatar {
  border-radius: 50%;
}

.actions__info-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.actions__nickname {
  font-size: 15px;
  color: #5a6169;
  margin-left: 10px;
}

.actions__action {
  position: absolute;
  top: 80px;
  font-size: 15px;
  color: #5a6169;
  border: 1px solid black;
}

.actions__dropdown {
  margin-left: 10px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 15px;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
  border-radius: 5px;
  font-size: 15px;
  color: #5a6169;
  text-align: center;
  border: 1px solid #e1e5eb;
}

.dropdown:hover .dropdown-content {
  display: block;
}

@media (max-width: 600px) {
  .actions__dropdown, .actions__nickname {
    display: none;
  }

  .admin-info__notifications {
    width: auto;
  }

  .actions {
    width: auto;
  }
}
</style>
