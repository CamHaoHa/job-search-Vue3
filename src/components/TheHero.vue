<script>
import TheHeadline from "@/components/TheHeadline.vue";

export default {
  name: "TheHero",
  components: { TheHeadline },
};
</script>
<template>
  <main>
    <section class="flex h-screen flex-col bg-yellow-200 pt-10 pb-20">
      <div class="grid-col-12 grid">
        <div class="col-span-1 col-start-1 border border-blue-100">1</div>
        <div class="col-span-5 col-start-2 border border-blue-100">
          <the-headline />
        </div>
        <div class="col-span-5 col-start-7 border border-blue-100">5</div>
        <div class="col-span-1 col-start-12 border border-blue-700">1</div>
      </div>
    </section>
  </main>
</template>
