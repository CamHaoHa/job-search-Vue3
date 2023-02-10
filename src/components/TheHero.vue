<script>
import TheHeadline from "@/components/TheHeadline.vue";
import JobSearchForm from "@/components/JobSearchForm.vue";

export default {
  name: "TheHero",
  components: { TheHeadline, JobSearchForm },
};
</script>
<template>
  <main>
    <section class="flex h-screen flex-col pt-10 pb-20">
      <div class="grid-col-12 grid">
        <div class="col-span-1 col-start-1">1</div>
        <div class="col-span-5 col-start-2">
          <the-headline />
          <job-search-form />
        </div>
        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <img class="h-80 w-80 object-contain" />
        </div>
        <div class="col-span-1 col-start-12">1</div>
      </div>
    </section>
  </main>
</template>
