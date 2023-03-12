<script lang="ts" setup>
import { ref } from "vue";
const imageURL = ref(
  "https://miro.medium.com/fit/c/160/160/1*Q6V0peqzR3p6lHdAQEye1A.png"
);
</script>
<template>
  <img
    :src="imageURL"
    alt="user profile image"
    class="h-8 w-8 rounded-3xl object-contain"
  />
</template>
