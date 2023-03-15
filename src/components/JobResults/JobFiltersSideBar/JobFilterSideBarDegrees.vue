<script lang="ts" setup>
import JobFilterSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarCheckboxGroup.vue";

import { computed } from "vue";

import { useDegreesStore } from "@/stores/degrees";
import { useUserStore } from "@/stores/user";

const degreesStore = useDegreesStore();
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);

const userStore = useUserStore();
</script>
<template>
  <job-filter-side-bar-checkbox-group
    :unique-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>
