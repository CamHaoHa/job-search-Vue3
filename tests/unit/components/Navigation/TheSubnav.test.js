import { render, screen } from "@testing-library/vue";
import TheSubNav from "@/components/Navigation/TheSubNav.vue";

describe("TheSubnav", () => {
  const renderThesubNav = (routeName) => {
    render(TheSubNav, {
      global: {
        mocks: { $route: { name: routeName } }, //a mocking prop simulates global this.$route
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  describe("when the user is on jobs page", () => {
    it("displays the job count", () => {
      const routeName = "JobResultsView";
      renderThesubNav(routeName);
      const jobCount = screen.getByText("9999");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when the user is not on jobs page", () => {
    it("not displays the job count", () => {
      const routeName = "NOTJobResultsView";
      renderThesubNav(routeName);
      const jobCount = screen.queryByText("9999");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
