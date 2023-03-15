import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import JobFilterSideBarPromp from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarPrompt.vue";

describe("JobFilterSideBarPrompt", () => {
  describe("When the user click the clear filter button", () => {
    it("send message to clear all the filter checkboxes", async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();
      render(JobFilterSideBarPromp, {
        global: {
          plugins: [pinia],
        },
      });
      const clearButton = screen.getByRole("button", { name: /clear filter/i });
      await userEvent.click(clearButton);
      expect(userStore.CLEAR_USER_JOB_FILTERS_SELECTION).toHaveBeenCalled();
    });
  });
});
