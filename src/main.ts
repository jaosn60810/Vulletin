import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import ViewNotes from "@/views/ViewNote.vue";
import ViewStats from "@/views/ViewStats.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "notes",
      component: ViewNotes,
    },
    {
      path: "/stats",
      name: "stats",
      component: ViewStats,
    },
  ],
});

createApp(App).use(router).mount("#app");
