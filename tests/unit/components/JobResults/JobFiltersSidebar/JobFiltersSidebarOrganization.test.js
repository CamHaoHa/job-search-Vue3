import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useJobsStore } from "@/stores/jobs.js";
import { useUserStore } from "@/stores/user.js";
import { createTestingPinia } from "@pinia/testing";
import JobFilterSideBarOrganisation from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarOrganisation.vue";

describe("JobFilterSideBarOrganisation", () => {
  const renderJobFilterSideBarOrganisation = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };
    render(JobFilterSideBarOrganisation, {
      global: {
        mocks: { $router },
        stubs: {
          FontAwesomeIcon: true,
        },
        plugins: [pinia],
      },
    });
    return { jobsStore, userStore, $router };
  };

  it("render unique organisations from the jobs list", async () => {
    const { jobsStore } = renderJobFilterSideBarOrganisation();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", {
      name: /organisation/i,
    });

    await userEvent.click(button);

    const uniqueOrganizationList = screen.getAllByRole("listitem");

    const organization = uniqueOrganizationList.map((node) => node.textContent);

    expect(organization).toEqual(["Google", "Amazon"]);
  });

  // adding test to to check whether delivering correct dispact when user clicks on the filter checkbox
  describe("when user clicks on checkbox", () => {
    it("communicates that the user has selected the filter organization checkbox", async () => {
      const { jobsStore, userStore } = renderJobFilterSideBarOrganisation();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);
      const button = screen.getByRole("button", {
        name: /organisations/i,
      });
      await userEvent.click(button);
      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);
      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        "Google",
      ]);
    });

    it("navigate to the job result page to see fresh batch of filtered jobs", async () => {
      const { jobsStore, $router } = renderJobFilterSideBarOrganisation();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);
      const button = screen.getByRole("button", {
        name: /organisations/i,
      });
      await userEvent.click(button);
      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);
      expect($router.push).toHaveBeenCalledWith({ name: "JobResultsView" });
    });
  });
});
