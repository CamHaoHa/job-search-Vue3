<script>
import ActionButton from "@/components/Share/ActionButton.vue";
import JobFilterSideBarOrganisation from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarOrganisation.vue";
import JobFilterSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarJobTypes.vue";
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSideBar",
  components: {
    ActionButton,
    CollapsibleAccordion,
    JobFilterSideBarOrganisation,
    JobFilterSideBarJobTypes,
  },
};
</script>

<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filter" />
        </div>
      </div>
      <collapsible-accordion header="Job Types">
        <div>placeholder</div>
      </collapsible-accordion>

      <collapsible-accordion></collapsible-accordion>

      <collapsible-accordion></collapsible-accordion>

      <job-filter-side-bar-organisation />
      <job-filter-side-bar-job-types />
    </section>
  </div>
</template>
