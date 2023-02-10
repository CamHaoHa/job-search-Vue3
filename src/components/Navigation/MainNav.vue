<script>
import ActionButton from "@/components/Share/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";
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
        { text: "Teams", url: "/" },
        { text: "Location", url: "/" },
        { text: "Benefits", url: "/" },
        { text: "Jobs", url: "/jobs/results" },
        { text: "Students", url: "/" },
        { text: "About Us", url: "/" },
      ],
      isLoggedIn: false,
    };
  },
  computed: {
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
};
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
          >{{ company }}</router-link
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
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sign in" @:click="loginUser" />
        </div>
      </div>

      <TheSubnav v-if="isLoggedIn" />
    </div>
  </header>
</template>
