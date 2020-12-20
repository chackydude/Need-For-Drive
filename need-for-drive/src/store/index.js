import Vue from "vue";
import Vuex from "vuex";
import order from "./modules/order";
import tabs from "./modules/tabs";
import place from "./modules/place";
import map from "./modules/map";
import cars from "./modules/cars";
import tabsMapping from "./modules/tabsMapping";
import adminOrders from "./modules/admin/adminOrders";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    order,
    tabs,
    place,
    map,
    cars,
    tabsMapping,
    adminOrders
  }
});
