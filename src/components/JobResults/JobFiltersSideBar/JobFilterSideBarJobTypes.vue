<script>
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";
import { mapState, mapActions } from "pinia";
import { useJobsStore, UNIQUE_JOB_TYPES } from "@/stores/jobs.js";
import { useUserStore, ADD_SELECTED_JOB_TYPES } from "@/stores/user.js";

export default {
  name: "JobFilterSideBarJobTypes",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
    selectJobStypes() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
    },
  },
};
</script>

<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in UNIQUE_JOB_TYPES"
            :key="jobType"
            class="h-8 w-1/2"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobStypes"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
