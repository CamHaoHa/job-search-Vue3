import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useJobsStore } from "@/stores/jobs.js";
import { useUserStore } from "@/stores/user.js";
import { createTestingPinia } from "@pinia/testing";
import JobFilterSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarJobTypes.vue";

describe("JobFilterSideBarJobTypes", () => {
  const renderJobFilterSideBarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };
    render(JobFilterSideBarJobTypes, {
      global: {
        mocks: {
          $router,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
        plugins: [pinia],
      },
    });
    return { jobsStore, userStore, $router };
  };

  it("render unique jobtypes from the jobs list", async () => {
    const { jobsStore } = renderJobFilterSideBarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", {
      name: /job type/i,
    });

    await userEvent.click(button);

    const uniqueJobTypeList = screen.getAllByRole("listitem");

    const jobType = uniqueJobTypeList.map((node) => node.textContent);

    expect(jobType).toEqual(["Full-time", "Part-time"]);
  });

  // adding test to to check whether delivering correct dispact when user clicks on the filter checkbox
  describe("when user select the job types checkbox", () => {
    it("communicates that the user has selected the filter jobType checkbox", async () => {
      const { jobsStore, userStore } = renderJobFilterSideBarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);
      const button = screen.getByRole("button", {
        name: /job types/i,
      });
      await userEvent.click(button);
      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);
      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "Full-time",
      ]);
    });

    it("navigate user to job results page to receive fresh batch of filter", async () => {
      const { jobsStore, $router } = renderJobFilterSideBarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time"]);
      const button = screen.getByRole("button", {
        name: /job types/i,
      });
      await userEvent.click(button);
      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);
      expect($router.push).toHaveBeenCalledWith({ name: "JobResultsView" });
    });
  });
});
