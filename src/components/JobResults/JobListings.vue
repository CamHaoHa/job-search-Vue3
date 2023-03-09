<script setup>
import JobListing from "@/components/JobResults/JobListing.vue";
import { useJobsStore } from "@/stores/jobs";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const route = useRoute();
const currentPage = computed(() => Number.parseInt(route.query.page || "1"));
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

// const previousPage = computed(() => {
//   const minPage = 1;
//   const previousPage = currentPage.value - 1;
//   return previousPage >= minPage ? previousPage : undefined;
// });

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);
//using computed here to make filtered_job become reactive object
// const nextPage = computed(() => {
//   const nextPage = currentPage.value + 1;
//   return nextPage <= maxPage ? nextPage : undefined;
// });
const displayedJob = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
</script>
<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJob" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex-no-wrap flex flex-row">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="item-center flex justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResultsView', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResultsView', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
