<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import TheHero from "@/components/JobSearch/TheHero.vue";
export default {
  name: "App",
  components: {
    MainNav,
    TheHero,
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      <main-nav />
      <the-hero />
    </div>
  </header>

  <main></main>
</template>
