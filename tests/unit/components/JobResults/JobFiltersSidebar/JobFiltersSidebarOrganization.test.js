import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useJobsStore } from "@/stores/jobs.js";
import { createTestingPinia } from "@pinia/testing";
import JobFilterSideBarOrganisation from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarOrganisation.vue";

describe("JobFilterSideBarOrganisation", () => {
  it("render unique organisations from the jobs list", async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    render(JobFilterSideBarOrganisation, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
        plugins: [pinia],
      },
    });

    const button = screen.getByRole("button", {
      name: /organisation/i,
    });

    await userEvent.click(button);

    const uniqueOrganizationList = screen.getAllByRole("listitem");

    const organization = uniqueOrganizationList.map((node) => node.textContent);

    expect(organization).toEqual(["Google", "Amazon"]);
  });
});
