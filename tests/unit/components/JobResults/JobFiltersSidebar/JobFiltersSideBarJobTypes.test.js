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
    render(JobFilterSideBarJobTypes, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
        plugins: [pinia],
      },
    });
    return { jobsStore, userStore };
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

  // it("communicates that the user has selected the filter jobType checkbox", async () => {
  //   const { jobsStore, userStore } = renderJobFilterSideBarJobTypes();
  //   jobsStore.UNIQUE_JOB_TYPES = new Set([["Full-time", "Part-time"]]);
  //   const button = screen.getByRole("button", {
  //     name: /job type/i,
  //   });
  //   await userEvent.click(button);
  //   const fullTimeCheckbox = screen.getByRole("checkbox", {
  //     name: /part time/i,
  //   });
  //   await userEvent.click(fullTimeCheckbox);
  //   expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
  //     "Part-time",
  //   ]);
  // });
});
