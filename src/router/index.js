import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobResultsView from "@/views/JobResultsView.vue";
import JobView from "@/views/JobView.vue";
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

export default router;