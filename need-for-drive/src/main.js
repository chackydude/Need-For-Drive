import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import EasySlider from "vue-easy-slider";
import Paginate from "vuejs-paginate";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
Vue.component("paginate", Paginate);
Vue.use(EasySlider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
