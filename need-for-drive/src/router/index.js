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
    component: () => import("../views/admin/Auth")
  },
  {
    path: "/admin/orders/",
    component: () => import("../views/admin/AdminOrders"),

    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  },
  {
    path: "/admin/orders/:id",
    component: () => import("../views/admin/edit/AdminOrderEdit"),

    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  },
  {
    path: "/admin/edit/",
    component: () => import("../views/admin/edit/AdminCarEdit"),

    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  },
  {
    path: "/admin/cars/",
    component: () => import("../views/admin/AdminCars"),

    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  },
  {
    path: "/admin/cities/",
    component: () => import("../views/admin/AdminCities"),

    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  },
  {
    path: "/admin/cities/:id",
    component: () => import("../views/admin/edit/AdminCitiesEdit"),

    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  },
  {
    path: "/admin/error/",
    component: () => import("../views/admin/AdminErrorExample"),

    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  },
  {
    path: "/admin/*",
    component: () => import("../views/admin/AdminOrders"),

    // route check function
    beforeEnter(to, from, next) {
      if (localStorage.getItem("auth")) {
        next();
      } else {
        next({ name: "auth" });
      }
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "hash",
  base: process.env.BASE_URL
});

export default router;
