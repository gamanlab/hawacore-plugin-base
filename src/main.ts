import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { name: "HomePage", path: "/", component: () => import("./HomePage.vue") },
  ],
});

createApp(App).use(Router).use(Quasar, quasarUserOptions).mount("#app");
