<script>
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";
import { mapState, mapActions } from "pinia";
import { useJobsStore, UNIQUE_ORGANIZATIONS } from "@/stores/jobs.js";
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from "@/stores/user.js";

export default {
  name: "JobFilterSideBarOrganisation",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedOrganization: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
    selectOrganiztion() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganization);
      this.$router.push({ name: "JobResultsView" });
    },
  },
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
              @change="selectOrganiztion"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
