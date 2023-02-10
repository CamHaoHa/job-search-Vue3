<script>
import ActionButton from "@/components/Share/ActionButton.vue";
import TextInput from "@/components/Share/TextInput.vue";
export default {
  name: "JobSearchForm",
  components: { ActionButton, TextInput },
  data() {
    return {
      role: "",
      location: "",
    };
  },
};
</script>
<template>
  <form
    class="border-grand-gray-3 flex h-16 w-full items-center rounded-3xl border border-solid"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="mr-3 ml-4" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label class="absolute left-0 -top-10 font-normal">Role</label>
        <text-input
          placeholder="Junior Web Developer"
          @handle-input="role = $event"
        />
      </div>

      <span
        class="flex h-full items-center border-l border-r border-brand-gray-2 bg-brand-gray-2 px-3"
        >in
      </span>

      <div class="relative flex h-full flex-1 items-center pl-3">
        <label class="absolute left-0 -top-10 font-normal">Where? </label>
        <text-input
          placeholder="Sydney, NSW, Australia"
          @handle-input="location = $event"
        />
      </div>

      <ActionButton type="secondary" text="Search" class="rounded-r-3xl" />
    </div>
  </form>
</template>
