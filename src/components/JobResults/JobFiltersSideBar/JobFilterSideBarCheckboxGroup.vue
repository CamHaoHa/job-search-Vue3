<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore, CLEAR_USER_JOB_FILTERS_SELECTION } from "@/stores/user";
const props = defineProps({
  uniqueValues: {
    type: [Set<string>, Array<string>],
    required: true,
  },
  //const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
  action: {
    type: Function,
    required: true,
  },
  //userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value);
});
const router = useRouter();
const selectedValues = ref<string[]>([]);
//const selectedJobTypes = ref([]);
const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "JobResultsView" });
};
const userStore = useUserStore();
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTERS_SELECTION) {
      selectedValues.value = [];
    }
  });
});
</script>

<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            @change="selectValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>
