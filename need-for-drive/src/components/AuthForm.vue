<template>
  <form class="auth-form">
    <h2 class="auth-form__title">Вход</h2>
    <div class="auth-form__inputs inputs">
      <label for="email" class="inputs__label auth-label">Почта</label>
      <input
        id="email"
        type="email"
        class="inputs__input auth-input"
        v-model.trim="email"
        required
      />

      <label for="pass" class="inputs__label auth-label">Пароль</label>
      <input
        id="pass"
        type="password"
        class="inputs__input auth-input"
        v-model.trim="password"
        required
      />
    </div>
    <div class="auth-form__buttons">
      <button class="access-button">
        Запросить доступ
      </button>
      <button
        class="enter-button"
        @click="sendAuthRequest()"
        type="submit"
        :class="{
          'enter-button--blocked': this.password === '' || this.email === ''
        }"
      >
        Войти
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AuthForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    sendAuthRequest() {
      this.$emit("sending", { email: this.email, password: this.password });
    }
  }
};
</script>

<style scoped lang="scss">
@import "public/css/mixins";
@import "public/css/variables";
* {
  font-family: "Helvetica Neue", sans-serif;
}

.auth-form {
  height: 253px;
  width: 376px;
  border-radius: 9px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 23px 17px 0px 17px;
  display: flex;
  flex-direction: column;
}

.auth-form__title {
  @include fontStyleRegular;
  font-size: 17px;
  text-align: center;
  color: #3d5170;
  margin-bottom: 10px;
}

.auth-form__inputs {
  display: flex;
  flex-direction: column;
  color: #495057;
}

.inputs__label {
  margin-top: 18px;
}

.inputs__input {
  margin-top: 9px;
}

.auth-label {
  color: #495057;
  font-weight: 300;
  font-size: 10px;
}

.auth-input {
  height: 29px;
  border: 1px #becad6 solid;
  border-radius: 3px;

  color: #495057;
  font-weight: 300;
  font-size: 11px;
  padding: 0 11px 0 11px;
}

.auth-form__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.access-button {
  border: none;
  background-color: white;
  color: $blue-color;
  cursor: pointer;
  font-size: 11px;
}

.enter-button {
  border: none;
  font-size: 11px;
  color: #fff;
  background-color: $blue-color;
  border-radius: 4px;
  height: 29px;
  width: 110px;
  cursor: pointer;
  @include buttonStylesByColor($blue-color);
}

.enter-button--blocked {
  @include buttonBlocked();
}

@media (max-width: 450px) {
  .auth-form {
    width: 250px;
  }

  .enter-button {
    width: 80px;
  }
}
</style>
