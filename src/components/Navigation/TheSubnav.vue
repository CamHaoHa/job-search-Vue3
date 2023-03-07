<script setup>
import { useJobsStore } from "@/stores/jobs.js";
import { computed } from "vue";
import { useRoute } from "vue-router";
const router = useRoute();
const onJobResultsPage = computed(() => router.name === "JobResultsView");
const jobsStore = useJobsStore();
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
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
