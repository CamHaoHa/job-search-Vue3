<script setup>
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";
import { useJobsStore } from "@/stores/jobs.js";
import { useUserStore } from "@/stores/user.js";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const selectedOrganization = ref([]);
const jobsStore = useJobsStore();
const userStore = useUserStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const selectOrganization = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganization.value);
  router.push({ name: "JobResultsView" });
};
</script>

<template>
  <collapsible-accordion header="Organisations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in UNIQUE_ORGANIZATIONS"
            :key="organization"
            class="h-8 w-1/2"
          >
            <input
              :id="organization"
              v-model="selectedOrganization"
              :value="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
