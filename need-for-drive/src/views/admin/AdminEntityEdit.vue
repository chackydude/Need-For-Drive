<template>
  <div class="admin-page">
    <AdminSideBar :active="0" class="admin-page__side-bar" />
    <div class="admin-page__main-content">
      <AdminHeader class="admin-page__header" />
      <div class="admin-page__content admin-content">
        <p class="admin-content__title">Карточка автомобиля</p>
        <div class="admin-content__items">
          <EntityFileInput
                  :progress="60"
          />
          <EntityFileInput
                  :progress="60"
          />
          <EntityFileInput
                  :progress="60"
          />
        </div>
      </div>
      <AdminFooter class="admin-page__footer" />
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";
// import AdminError from "../../components/admin/AdminError";
import EntityFileInput from "../../components/admin/entity-edit/EntityFileInput";

export default {
  name: "AdminEntityEdit",
  components: {
    // AdminError,
    AdminSideBar,
    AdminHeader,
    AdminFooter,
    EntityFileInput
  },
  data() {
    return {
      username: "",
      avatar: null
    };
  },
  methods: {
    onChangeFile(event) {
      this.avatar = event.target.files[0];
    },
    logData() {
      let fd = new FormData();
      fd.append("avatar", this.avatar, this.avatar.name);
      fd.append("username", this.username);
    }
  }
};
</script>

<style scoped lang="scss">
.admin-content__title {
  margin-bottom: 30px;
}

.admin-content__items {
  display: flex;
  flex-direction: row;

  div {
    margin-right: 20px;
  }
}
</style>
