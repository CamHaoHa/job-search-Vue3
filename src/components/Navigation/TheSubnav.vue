<script>
import { mapState } from "pinia";
import { useJobsStore, FILTER_JOBS_BY_ORGANIZATIONS } from "@/stores/jobs.js";
export default {
  name: "TheSubnav",
  computed: {
    ...mapState(useJobsStore, [FILTER_JOBS_BY_ORGANIZATIONS]),
    onJobResultsPage() {
      return this.$route.name === "JobResultsView";
    },
  },
};
</script>
<template>
  <div
    class="bo text h-16 w-full border-b border-solid border-brand-gray-1 text-lg"
  >
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{
            FILTER_JOBS_BY_ORGANIZATIONS.length
          }}</span>
          jobs matched</span
        >
      </div>
    </div>
  </div>
</template>
