import { createRouter, createWebHistory } from "vue-router";
import AllTasksView from "../views/AllTasksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AllTasks",
      component: AllTasksView,
    },
  ],
});

export default router;
