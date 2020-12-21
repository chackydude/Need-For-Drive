<template>
  <div class="admin-side-bar">
    <div class="admin-side-bar__logo logo">
      <img
        src="@/assets/icons/logo.svg"
        alt="logo"
        class="logo-image logo__image"
      />
      <router-link to="/" class="logo__text">Need for car</router-link>
    </div>
    <div
      class="admin-side-bar__item side-bar-item"
      :class="{ 'side-bar-item--active': active === 0 }"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="side-bar-item__icon"
      >
        <path
          id="car-card"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
          fill="#CACEDB"
        />
      </svg>

      <p class="side-bar-item__text">Карточка автомобиля</p>
    </div>
    <div
      class="admin-side-bar__item side-bar-item"
      :class="{ 'side-bar-item--active': active === 1 }"
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="side-bar-item__icon"
      >
        <path
          id="car-list"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.5 3.5V4.85714H7.83333V3.5H2.5ZM7.83333 7.57142H2.5V6.21428H7.83333V7.57142ZM2.5 10.2857H7.83333V8.92857H2.5V10.2857ZM2.5 13H7.83333V11.6429H2.5V13ZM14.5 3.5H9.16663V13H14.5V3.5Z"
          fill="#CACEDB"
        />
      </svg>

      <p class="side-bar-item__text">Список авто</p>
    </div>
    <div
      class="admin-side-bar__item side-bar-item"
      :class="{ 'side-bar-item--active': active === 2 }"
    >
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="side-bar-item__icon"
      >
        <path
          id="order"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.5 1H3.5C2.95 1 2.505 1.45 2.505 2L2.5 10C2.5 10.55 2.945 11 3.495 11H9.5C10.05 11 10.5 10.55 10.5 10V4L7.5 1ZM8.5 8H7V9.5H6V8H4.5V7H6V5.5H7V7H8.5V8ZM7 1.75V4.5H9.75L7 1.75Z"
          fill="#CACEDB"
        />
      </svg>

      <p class="side-bar-item__text">Заказы</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSideBar",
  props: {
    active: Number
  }
};
</script>

<style scoped lang="scss">
.admin-side-bar {
  color: #3d5170;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
  max-width: 285px;
  width: 100%;
  box-shadow: 6px 0 4px -4px rgba(38, 46, 52, 0.1);
  min-width: 70px;
  z-index: 2;
}

.logo-image {
  height: 22px;
  width: 22px;
  margin-right: 7px;
}

.logo {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  height: 67px;
}

.logo__text {
  text-decoration: none;
}

.logo__text:active,
.logo__text:visited {
  color: #3d5170;
}

.admin-side-bar {
  div {
    border-bottom: 1px solid #e1e5eb;
  }
}

.side-bar-item {
  display: flex;
  align-items: center;
  height: 58px;
  font-size: 15px;
  cursor: pointer;
}

.side-bar-item:hover {
  background-color: #e1e5eb;
}

.side-bar-item__icon {
  margin: 0 13px 0 28px;
  height: 20px;
  width: 20px;
}

.side-bar-item:active {
  border-left: 4px solid #007bff;
  color: #007bff;

  svg #car-card,
  svg #car-list,
  svg #order {
    fill: #007bff;
  }
}

.side-bar-item--active {
  border-left: 4px solid #007bff;
  color: #007bff;

  svg #car-card,
  svg #car-list,
  svg #order {
    fill: #007bff;
  }
}

@media (max-width: 1024px) {
  .admin-side-bar {
    width: 15%;
  }

  .side-bar-item__text,
  .logo__text {
    display: none;
  }

  .logo__image {
    margin: 0 auto;
  }
  .side-bar-item__icon {
    margin: 0 auto;
  }
}
</style>
