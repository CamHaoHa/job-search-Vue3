<script lang="ts" setup>
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";

import JobFilterSideBarDegrees from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarDegrees.vue";
import JobFilterSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarJobTypes.vue";
import JobFilterSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarOrganizations.vue";
import JobFilterSideBarPrompt from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarPrompt.vue";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <job-filter-side-bar-prompt />
      <!-- <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear Filter"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTERS_SELECTION"
          />
        </div>
      </div> -->
      <collapsible-accordion header="Orgainizations">
        <job-filter-side-bar-organizations
      /></collapsible-accordion>

      <collapsible-accordion header="Job Types">
        <job-filter-side-bar-job-types
      /></collapsible-accordion>

      <collapsible-accordion header="Degrees"
        ><job-filter-side-bar-degrees />
      </collapsible-accordion>
    </section>
  </div>
</template>
