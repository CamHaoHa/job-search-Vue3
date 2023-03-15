import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Degree } from "@/api/types";
import getDegrees from "@/api/getDegrees";
import { useUserStore } from "@/stores/user";

export const useDegreesStore = defineStore("degrees", () => {
  const degrees = ref<Degree[]>([]);
  const FETCH_DEGREES = async () => {
    const degreesData = await getDegrees();
    degrees.value = degreesData;
  };
  const UNIQUE_DEGREES = computed(() => {
    const uniqueDegrees = new Set<string>();
    degrees.value.forEach((degree) => uniqueDegrees.add(degree.degree));
    return uniqueDegrees;
  });

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES };
});
