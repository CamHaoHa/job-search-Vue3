<script lang="ts" setup>
import { useJobsStore } from "@/stores/jobs";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const onJobResultsPage = computed(() => route.name === "JobResultsView");
/// the route.name is the reactive object, and use computed() to track the route.name, Here the onJobResultsPage return the true or false value.
const jobsStore = useJobsStore();
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
//the reason computed here is to create a reactive data property that actumatively updates when jobsStore.FILTERED_JOB changes.
</script>
<template>
  <div
    class="bo text h-16 w-full border-b border-solid border-brand-gray-1 text-lg"
  >
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span>
          jobs matched</span
        >
      </div>
    </div>
  </div>
</template>
