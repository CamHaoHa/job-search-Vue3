<script>
export default {
  name: "TheSubnav",
  data() {
    return {
      onJobResultsPage: true,
    };
  },
};
</script>
<template>
  <div
    class="bo text h-16 w-full border-b border-solid border-brand-gray-1 text-lg"
  >
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">9999</span> jobs matched</span>
      </div>
    </div>
  </div>
</template>
