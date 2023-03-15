<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const skillSearchTerm = computed({
  get() {
    return userStore.skillSearchTerms;
  },
  set(value: string) {
    userStore.ADD_SKILL_SEARCH_TERMS(value);
  },
});
</script>
<template>
  <div class="mt-2">
    <input
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Web Developer, DeFinance"
      v-model.lazy.trim="skillSearchTerm"
    />
  </div>
</template>
