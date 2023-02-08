<script>
export default {
  name: "MainNav",
  data() {
    return {
      company: "Vue.com",
      url: "https://google.com",
      menuItems: [
        "Teams",
        "Location",
        "About Us",
        "Career",
        "Students",
        "Jobs",
      ],
    };
  },
};
</script>

<template>
  <header class="w-full text-xl font-bold">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <a :href="url" class="flex h-full items-center text-5xl">{{
          company
        }}</a>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              class="ml-9 h-full first:ml-0"
            >
              <a href="" class="flex h-full items-center py-2.5">{{
                menuItem
              }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
