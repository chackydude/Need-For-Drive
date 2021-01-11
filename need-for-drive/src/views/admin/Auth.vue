<template>
  <div class="auth-page">
    <div class="auth-page__content content" v-if="!getAuthLoading">
      <div class="content__title auth-title">
        <img
          src="@/assets/icons/logo.svg"
          alt="logo"
          class="auth-title__logo"
        />
        <h1 class="auth-title__text">Need for drive</h1>
      </div>
      <AuthForm class="content__form" @sending="sendAuthRequest" />
      <div v-if="getAuthError" class="content__error">Проблема аутентификации</div>
    </div>
    <pulse-loader
      :loading="getAuthLoading"
      color="#007BFF"
    ></pulse-loader>
  </div>
</template>

<script>
import AuthForm from "../../components/AuthForm";
import PulseLoader from "vue-spinner/src/PulseLoader";
import { mapActions, mapGetters, mapMutations } from "vuex";

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
    ...mapMutations(["updateError", "updateLoading"]),
    sendAuthRequest(userData) {
      this.authUser({
        username: userData.email,
        password: userData.password
      });
      this.updateLoading(true);
    }
  },
  computed: {
    ...mapGetters(["getAccessToken", "getAuthError", "getAuthLoading"]),
  },
  watch: {
    getAccessToken: function() {
      this.$router.push("admin/orders");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/css/mixins";
@import "../../../public/css/variables";

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

.content__error {
  @include fontStylesLight;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffe0e8;
  color: $black-color;
  border-radius: 8px;
  align-self: center;
  margin-top: 15px;
}
</style>
