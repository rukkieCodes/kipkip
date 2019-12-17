import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueFirestore from "vue-firestore";
import { fb } from "./firebaseConfig";

Vue.use(VueFirestore);

Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});