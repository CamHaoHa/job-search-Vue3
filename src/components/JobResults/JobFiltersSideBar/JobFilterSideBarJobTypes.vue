<script lang="ts" setup>
import { computed } from "vue";
import JobFilterSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarCheckboxGroup.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const jobStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES);
const userStore = useUserStore();
</script>
<template>
  <job-filter-side-bar-checkbox-group
    :unique-values="UNIQUE_JOB_TYPES"
    :action="userStore.ADD_SELECTED_JOB_TYPES"
  />
</template>
