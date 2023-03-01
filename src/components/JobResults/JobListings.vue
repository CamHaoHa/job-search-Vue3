<script>
import { mapActions, mapState } from "pinia";

import JobListing from "@/components/JobResults/JobListing.vue";

import { useJobsStore, FETCH_JOBS, FILTERED_JOBS } from "@/stores/jobs";

export default {
  name: "JobListings",
  components: { JobListing },

  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },

    previousPage() {
      const previousPage = this.currentPage - 1;
      const minPage = 1;
      return previousPage >= minPage ? previousPage : undefined;
    },

    ...mapState(useJobsStore, {
      FILTERED_JOBS,
      nextPage() {
        const nextPage = this.currentPage + 1;
        const maxPage = Math.ceil(this.FILTERED_JOBS.length / 10);
        return nextPage <= maxPage ? nextPage : undefined;
      },

      displayedJob() {
        const pageString = this.currentPage;
        const pageNumber = Number.parseInt(pageString);
        const firstJobIndex = (pageNumber - 1) * 10;
        const lastJobIndex = pageNumber * 10;
        console.log(firstJobIndex, lastJobIndex);
        return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
      },
    }),
  },

  async mounted() {
    this.FETCH_JOBS();
  },

  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
  },
};
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
