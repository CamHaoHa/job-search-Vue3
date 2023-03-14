import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const CLEAR_USER_JOB_FILTERS_SELECTION =
  "CLEAR_USER_JOB_FILTERS_SELECTION";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);

  //actions
  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };
  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations;
  };
  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };
  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };
  const CLEAR_USER_JOB_FILTERS_SELECTION = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
  };

  return {
    isLoggedIn,
    selectedDegrees,
    selectedOrganizations,
    selectedJobTypes,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_DEGREES,
    ADD_SELECTED_JOB_TYPES,
    LOGIN_USER,
    CLEAR_USER_JOB_FILTERS_SELECTION,
  };
});
