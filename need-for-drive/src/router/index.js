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
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL
});

export default router;
