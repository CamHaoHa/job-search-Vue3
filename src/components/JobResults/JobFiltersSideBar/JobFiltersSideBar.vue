<script lang="ts" setup>
import ActionButton from "@/components/Share/ActionButton.vue";
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";
import JobFilterSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarCheckboxGroup.vue";
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
          <action-button
            text="Clear Filter"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTERS_SELECTION"
          />
        </div>
      </div>
      <collapsible-accordion header="Orgainizations">
        <job-filter-side-bar-checkbox-group
          :unique-values="UNIQUE_ORGANIZATIONS"
          :action="userStore.ADD_SELECTED_ORGANIZATIONS"
        />
      </collapsible-accordion>
      <collapsible-accordion header="Job Types">
        <job-filter-side-bar-checkbox-group
          :unique-values="UNIQUE_JOB_TYPES"
          :action="userStore.ADD_SELECTED_JOB_TYPES"
        />
      </collapsible-accordion>
      <collapsible-accordion header="Degrees">
        <job-filter-side-bar-checkbox-group
          :unique-values="UNIQUE_DEGREES"
          :action="userStore.ADD_SELECTED_DEGREES"
        />
      </collapsible-accordion>
    </section>
  </div>
</template>
