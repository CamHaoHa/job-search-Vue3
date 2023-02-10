import { render, screen } from "@testing-library/vue";
import TheSubNav from "@/components/Navigation/TheSubNav.vue";

describe("TheSubnav", () => {
  describe("when the user is on jobs page", () => {
    it("displays the job count", () => {
      const $route = { name: "JobResultsView" };
      render(TheSubNav, {
        global: {
          mocks: { $route: $route }, //a mocking prop simulates global this.$route
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const jobCount = screen.getByText("9999");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when the user is not on jobs page", () => {
    it("not displays the job count", () => {
      const $route = { name: "NOTJobResultsView" };
      render(TheSubNav, {
        global: {
          mocks: { $route: $route },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const jobCount = screen.queryByText("9999");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
