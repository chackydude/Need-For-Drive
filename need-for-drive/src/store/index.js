import Vue from "vue";
import Vuex from "vuex";
import order from "./modules/order";
import tabs from "./modules/tabs";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    order,
    tabs
  }
});
