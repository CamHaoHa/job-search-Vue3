<script lang="ts" setup>
import MainNav from "@/components/Navigation/MainNav.vue";
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
