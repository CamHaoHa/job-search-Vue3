import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobResultsView from "@/views/JobResultsView.vue";
import JobView from "@/views/JobView.vue";
import TeamsView from "@/views/TeamsView.vue";
const routers = [
  {
    path: "/",
    component: HomeView,
    name: "Home",
  },
  {
    path: "/jobs/results",
    component: JobResultsView,
    name: "JobResultsView",
  },
  {
    path: "/jobs/results/:id",
    component: JobView,
    name: "JobListing",
  },
  {
    path: "/teams",
    component: TeamsView,
    name: "TeamsView",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
