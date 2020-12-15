import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/Order")
  },
  {
    path: "/order/:id",
    name: "orderId",
    component: () => import("../views/Total")
  },
  {
    path: "/admin",
    name: "auth",
    component: () => import("../views/Auth")
  },
  {
    path: "/admin/*",
    component: () => import("../views/Admin"),
    // route check function
    beforeEnter(to, from, next) {
      if (localStorage.getItem("authId")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL
});

export default router;
