<script>
import JobListing from "@/components/JobResults/JobListing.vue";
import axios from "axios";
export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    displayedJob() {
      const pageString = this.$route.query.page || "1";
      const pageNumber = Number.parseInt(pageString);
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      console.log(firstJobIndex, lastJobIndex);
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/jobs");
    this.jobs = response.data;
  },
};
</script>
<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJob" :key="job.id" :job="job" />
    </ol>
  </main>
</template>
