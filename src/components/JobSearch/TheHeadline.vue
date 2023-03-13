<script lang="ts" setup>
import nextElementInList from "@/utils/nextElementInList";

import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const action = ref("Build");
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => {
  return {
    [action.value.toLowerCase()]: true,
  };
});
const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ["Build", "Create", "Design", "Code"];
    action.value = nextElementInList(actions, action.value);
  }, 2000);
};

onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));
</script>

<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-normal">Find your next dream job with us.</h2>
  </section>
</template>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
