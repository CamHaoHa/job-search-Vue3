<script setup>
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";
import { useJobsStore } from "@/stores/jobs.js";
import { useUserStore } from "@/stores/user.js";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const selectedJobTypes = ref([]);
const jobsStore = useJobsStore();
const userStore = useUserStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
const selectJobTypes = () => {
  userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value);
  router.push({ name: "JobResultsView" });
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
              @change="selectJobTypes"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
