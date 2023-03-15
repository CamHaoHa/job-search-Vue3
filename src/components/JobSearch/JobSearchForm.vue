<script lang="ts" setup>
import ActionButton from "@/components/Share/ActionButton.vue";
import TextInput from "@/components/Share/TextInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const role = ref("");
const location = ref("");
const router = useRouter();
const searchJob = () => {
  router.push({
    name: "JobResultsView",
    query: { role: role.value, location: location.value },
  });
};
</script>
<template>
  <form
    class="border-grand-gray-3 flex h-16 w-full items-center rounded-3xl border border-solid"
    @submit.prevent="searchJob"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="mr-3 ml-4" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="absolute left-0 -top-10 font-normal"
          >Role</label
        >
        <text-input id="role" v-model="role" placeholder="Vue" />
      </div>

      <span
        class="flex h-full items-center border-l border-r border-brand-gray-2 bg-brand-gray-2 px-3"
        >in
      </span>

      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="absolute left-0 -top-10 font-normal"
          >Company
        </label>
        <text-input id="location" v-model="location" placeholder="Vue and Me" />
      </div>

      <ActionButton type="secondary" text="Search" class="rounded-r-3xl" />
    </div>
  </form>
</template>
