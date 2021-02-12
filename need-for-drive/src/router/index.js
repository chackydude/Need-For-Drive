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
    path: "/admin/orders/",
    component: () => import("../views/AdminOrders"),
  },
  {
    path: "/admin/edit/",
    component: () => import("../views/AdminEntityEdit")
  },
  {
    path: "/admin/entity/",
    component: () => import("../views/AdminEntityExample")
  },
  {
    path: "/admin/*",
    component: () => import("../views/AdminOrders"),

    // route check function
    // beforeEnter(to, from, next) {
    //   if (localStorage.getItem("auth")) {
    //     next();
    //   } else {
    //     next({ name: "auth" });
    //   }
    // }
  }
];

const router = new VueRouter({
  routes,
  mode: "hash",
  base: process.env.BASE_URL
});

export default router;
