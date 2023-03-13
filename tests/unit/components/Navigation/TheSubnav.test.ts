import type { Mock } from "vitest";

import { render, screen } from "@testing-library/vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";

import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
vi.mock("vue-router");
//vi-mock loop through view-router library and replace anything with vue test mocks functions include useRoute
const useRouteMock = useRoute as Mock;

describe("TheSubnav", () => {
  const renderTheSubNav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    render(TheSubnav, {
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
      useRouteMock.mockReturnValue({ name: "JobResultsView" });
      //when the useRoute involve, the object with a name property is returned
      const { jobsStore } = renderTheSubNav();
      const numberOfJobs = 200;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when the user is not on jobs page", () => {
    it("not displays the job count", () => {
      useRouteMock.mockReturnValue({ name: "!JobResultsView" }); //name: is not jobResultView
      const { jobsStore } = renderTheSubNav();
      const numberOfJobs = 200;
      // @ts-expect-error: Getter is read only

      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
