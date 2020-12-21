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
    component: () => import("../views/AdminOrders"),

    // route check function, commented cuz api drops sometimes
    // beforeEnter(to, from, next) {
    //   if (localStorage.getItem("auth")) {
    //     next();
    //   } else {
    //     next({ name: "auth" });
    //   }
    // }
  },
  {
    path: "/admin/orders/",
    component: () => import("../views/AdminOrders"),
  }
];

const router = new VueRouter({
  routes,
  mode: "hash",
  base: process.env.BASE_URL
});

export default router;
