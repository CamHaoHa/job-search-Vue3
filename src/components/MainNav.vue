<script>
import ActionButton from "@/components/ActionButton.vue";
import ProfileImage from "@/components/ProfileImage.vue";
import TheSubnav from "@/components/TheSubnav.vue";
export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav,
  },
  data() {
    return {
      company: "VueJobs.com",
      url: "https://google.com",
      menuItems: [
        "Teams",
        "Location",
        "Benefits",
        "Jobs",
        "Students",
        "About Us",
      ],
      isLoggedIn: false,
    };
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
};
</script>

<template>
  <header class="w-full">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <a
          :href="url"
          class="flex h-full items-center text-3xl font-semibold"
          >{{ company }}</a
        >

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none text-lg font-medium">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              class="ml-9 h-full first:ml-5"
            >
              <a href="" class="flex h-full items-center py-2.5">{{
                menuItem
              }}</a>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" @:click="loginUser" />
        </div>
      </div>

      <TheSubnav v-if="isLoggedIn" />
    </div>
  </header>
</template>
