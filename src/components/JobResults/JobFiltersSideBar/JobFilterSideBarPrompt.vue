<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import ActionButton from "@/components/Share/ActionButton.vue";
const userStore = useUserStore();
</script>
<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear Filter"
        type="secondary"
        @click="userStore.CLEAR_USER_JOB_FILTERS_SELECTION"
      />
    </div>
  </div>
</template>
