<script>
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";

export default {
  name: "JobFilterSideBarOrganisation",
  components: { CollapsibleAccordion },
};
</script>

<template>
  <collapsible-accordion header="Organisations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="VueOz" type="checkbox" class="mr-3" />
            <label for="VueOz">VueOz</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Between Vue And Me" type="checkbox" class="mr-3" />
            <label for="Between Vue and Me">Between Vue</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Et Vue Brute" type="checkbox" class="mr-3" />
            <label for="Et Vue Brute">Et Vue Brute</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Vue and a Half men" type="checkbox" class="mr-3" />
            <label for="Vue and a Half men">Vue and a Half men</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>
