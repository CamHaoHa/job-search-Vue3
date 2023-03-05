<script>
import { ref, computed } from "vue";
export default {
  name: "CollapsibleAccordion",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  setup() {
    let isOpen = ref(false);
    const open = () => {
      isOpen.value = !isOpen.value;
    };
    const caretIcon = computed(() => {
      return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
    });

    return {
      open,
      isOpen,
      caretIcon,
    };
  },
};
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
