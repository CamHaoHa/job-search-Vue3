import { render, screen } from "@testing-library/vue";
import TheSubNav from "@/components/Navigation/TheSubNav.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs.js";

describe("TheSubnav", () => {
  const renderThesubNav = (routeName) => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    render(TheSubNav, {
      global: {
        plugins: [pinia],
        mocks: { $route: { name: routeName } }, //a mocking prop simulates global this.$route
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    return { jobsStore };
  };

  describe("when the user is on jobs page", () => {
    it("displays the job count", async () => {
      const routeName = "JobResultsView";
      const { jobsStore } = renderThesubNav(routeName);
      const numberOfJobs = 200;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when the user is not on jobs page", () => {
    it("not displays the job count", () => {
      const routeName = "NOTJobResultsView";
      const { jobsStore } = renderThesubNav(routeName);
      const numberOfJobs = 200;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
