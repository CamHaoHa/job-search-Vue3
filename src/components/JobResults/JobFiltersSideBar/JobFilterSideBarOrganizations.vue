<script lang="ts" setup>
import JobFilterSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarCheckboxGroup.vue";

import { computed } from "vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const userStore = useUserStore();
</script>
<template>
  <job-filter-side-bar-checkbox-group
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>
