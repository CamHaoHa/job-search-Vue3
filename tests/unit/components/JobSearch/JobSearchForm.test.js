import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("when user submit the form", () => {
    it("should navigate user to jobs/results page with correct query params", async () => {
      const push = vi.fn();
      const $router = { push };
      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
          mocks: {
            $router: $router,
          },
        },
      });
      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      await userEvent.type(roleInput, "Web Developer");

      const locationInput = screen.getByRole("textbox", {
        name: /location/i,
      });
      await userEvent.type(locationInput, "Sydney");

      const submitButton = screen.getByRole("button", {
        name: /search/i,
      });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResultsView",
        query: { role: "Web Developer", location: "Sydney" },
      });
    });
  });
});
