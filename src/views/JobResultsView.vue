<script lang="ts" setup>
import JobFiltersSideBar from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
</script>
<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filters-side-bar />
    <job-listings />
  </div>
</template>
