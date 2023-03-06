<script setup>
import { ref, computed } from "vue";
defineProps({
  header: {
    type: String,
    required: true,
  },
});
const isOpen = ref(false);
const open = () => {
  isOpen.value = !isOpen.value;
};
const caretIcon = computed(() => {
  return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
});
</script>

<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <slot> <p>Default Slot</p></slot>
    </div>
  </div>
</template>
