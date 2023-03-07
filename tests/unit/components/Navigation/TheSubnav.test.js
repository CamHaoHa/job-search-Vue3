import { render, screen } from "@testing-library/vue";
import TheSubNav from "@/components/Navigation/TheSubNav.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs.js";
import { useRoute } from "vue-router";
vi.mock("vue-router");
//vi-mock loop through view-router library and replace anything with vue test mocks functions include useRoute

describe("TheSubnav", () => {
  const renderThesubNav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    render(TheSubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    return { jobsStore };
  };

  describe("when the user is on jobs page", () => {
    it("displays the job count", async () => {
      useRoute.mockReturnValue({ name: "JobResultsView" });
      //when the useRoute involve, the object with a name property is returned
      const { jobsStore } = renderThesubNav();
      const numberOfJobs = 200;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when the user is not on jobs page", () => {
    it("not displays the job count", () => {
      useRoute.mockReturnValue({ name: "!JobResultsView" }); //name: is not jobResultView
      const { jobsStore } = renderThesubNav();
      const numberOfJobs = 200;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
