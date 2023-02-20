<script>
import ActionButton from "@/components/Share/ActionButton.vue";
import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";
export default {
  name: "JobFiltersSideBar",
  components: { ActionButton, CollapsibleAccordion },
};
</script>

<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filter" />
        </div>
      </div>
      <collapsible-accordion header="Job Types">
        <div>placeholder</div>
      </collapsible-accordion>

      <collapsible-accordion></collapsible-accordion>

      <collapsible-accordion></collapsible-accordion>

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
    </section>
  </div>
</template>
