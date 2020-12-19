<template>
  <div class="auth-page">
    <div class="auth-page__content content"  v-if="!loading">
      <div class="content__title auth-title">
        <img
          src="@/assets/icons/logo.svg"
          alt="logo"
          class="auth-title__logo"
        />
        <h1 class="auth-title__text">Need for drive</h1>
      </div>
      <AuthForm class="content__form" @sending="sendAuthRequest"/>
    </div>
    <pulse-loader
      v-if="loading"
      :loading="isLoading"
      color="#007BFF"
    ></pulse-loader>
  </div>
</template>

<script>
import AuthForm from "../components/AuthForm";
import PulseLoader from "vue-spinner/src/PulseLoader";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Auth",
  components: {
    AuthForm,
    PulseLoader
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions(["authUser"]),
    sendAuthRequest(userData) {
      this.authUser({
        username: userData.email,
        password: userData.password
      });
      this.loading = true;
    }
  },
  computed: {
    ...mapGetters(["getAccessToken"]),
    isLoading() {
      return this.getAccessToken === "";
    }
  },
  watch: {
    getAccessToken: function() {
      this.$router.push("admin/panel");
    }
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.auth-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background-admin;
}

.auth-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.auth-title__text {
  @include fontStylesLight;
  font-weight: 500;
  font-size: 24px;
  color: #3d5170;
  margin-left: 12px;
}

.content__form {
  margin-top: 17px;
}
</style>
