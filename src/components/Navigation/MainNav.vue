<script lang="ts" setup>
import ActionButton from "@/components/Share/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";

import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
const menuItems = ref([
  { text: "Teams", url: "/teams" },
  { text: "Location", url: "/" },
  { text: "Benefits", url: "/" },
  { text: "Jobs", url: "/jobs/results" },
  { text: "Students", url: "/" },
  { text: "About Us", url: "/" },
]);
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const LOGIN_USER = userStore.LOGIN_USER;

const headerHeightClass = computed(() => ({
  "h-16": !isLoggedIn.value,
  "h-32": isLoggedIn.value,
}));
</script>

<template>
  <header :class="['w - full', headerHeightClass]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-3xl font-semibold"
          >VueJobs.com</router-link
        >

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none text-lg font-medium">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-5"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="userStore.isLoggedIn" />
          <action-button v-else text="Sign in" @click="LOGIN_USER" />
        </div>
      </div>

      <TheSubnav v-if="userStore.isLoggedIn" />
    </div>
  </header>
</template>
