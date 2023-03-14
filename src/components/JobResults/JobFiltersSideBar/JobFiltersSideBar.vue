<script lang="ts" setup>
import ActionButton from "@/components/Share/ActionButton.vue";
import JobFilterSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFilterSideBarCheckboxGroup.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { useDegreesStore } from "@/stores/degrees";
import { computed } from "vue";
const jobsStore = useJobsStore();
const userStore = useUserStore();
const degreesStore = useDegreesStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREEES);
</script>

<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filter" type="secondary" />
        </div>
      </div>
      <job-filter-side-bar-checkbox-group
        header="Organizations"
        :unique-values="UNIQUE_ORGANIZATIONS"
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
      />
      <job-filter-side-bar-checkbox-group
        header="Job Types"
        :unique-values="UNIQUE_JOB_TYPES"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
      />
      <job-filter-side-bar-checkbox-group
        header="Degress"
        :unique-values="UNIQUE_DEGREES"
        :action="userStore.ADD_SELECTED_DEGREES"
      />
    </section>
  </div>
</template>
