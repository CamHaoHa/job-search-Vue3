<script>
import MainNav from "@/components/Navigation/MainNav.vue";
export default {
  name: "App",
  components: {
    MainNav,
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      <main-nav />
      <router-view />
    </div>
  </header>

  <main></main>
</template>
