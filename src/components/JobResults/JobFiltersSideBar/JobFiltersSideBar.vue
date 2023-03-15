<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";

import JobFilterSideBarDegrees from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarDegrees.vue";
import JobFilterSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarJobTypes.vue";
import JobFilterSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarOrganizations.vue";
import JobFilterSideBarPrompt from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarPrompt.vue";
import JobFilterSideBarSkill from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarSkills.vue";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const route = useRoute();
const parseSearchTerms = () => {
  const role = (route.query.role as string) || "";
  const company = (route.query.location as string) || "";
  userStore.ADD_SKILL_SEARCH_TERMS(role);
};
onMounted(parseSearchTerms);
</script>

<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <job-filter-side-bar-prompt />

      <collapsible-accordion header="Orgainizations">
        <job-filter-side-bar-organizations
      /></collapsible-accordion>

      <collapsible-accordion header="Job Types">
        <job-filter-side-bar-job-types
      /></collapsible-accordion>

      <collapsible-accordion header="Degrees"
        ><job-filter-side-bar-degrees />
      </collapsible-accordion>

      <collapsible-accordion header="Skills">
        <job-filter-side-bar-skill
      /></collapsible-accordion>
    </section>
  </div>
</template>
