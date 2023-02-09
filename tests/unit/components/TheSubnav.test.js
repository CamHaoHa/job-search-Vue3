import { render, screen } from "@testing-library/vue";
import TheSubNav from "@/components/TheSubNav.vue";

describe("TheSubnav", () => {
  describe("when the user is on jobs page", () => {
    it("displays the job cout", () => {
      render(TheSubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultsPage: true,
          };
        },
      });
      const jobCount = screen.getByText("9999");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when the user is not on jobs page", () => {
    it("not displays the job count", () => {
      render(TheSubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultsPage: false,
          };
        },
      });
      const jobCount = screen.queryByText("9999");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
