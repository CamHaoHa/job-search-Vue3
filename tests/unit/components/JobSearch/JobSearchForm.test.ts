import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
vi.mock("vue-router");
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import type { Mock } from "vitest";
const useRouterMock = useRouter as Mock;

describe("JobSearchForm", () => {
  describe("when user submit the form", () => {
    it("should navigate user to jobs/results page with correct query params", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      await userEvent.type(roleInput, "Web Developer");

      const locationInput = screen.getByRole("textbox", {
        name: /company/i,
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
