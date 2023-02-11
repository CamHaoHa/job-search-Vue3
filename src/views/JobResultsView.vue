<script>
import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar.vue";
import JobListings from "@/components/JobResults/JobListtings.vue";
export default {
  name: "JobResultsView",
  components: {
    JobFiltersSideBar,
    JobListings,
  },
};
</script>
<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filters-side-bar />
    <job-listings />
  </div>
</template>
