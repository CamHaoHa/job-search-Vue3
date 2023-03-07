import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useJobsStore } from "@/stores/jobs.js";
import { useUserStore } from "@/stores/user.js";
import { createTestingPinia } from "@pinia/testing";
import JobFilterSideBarOrganisation from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarOrganisation.vue";
import { useRouter } from "vue-router";
vi.mock("vue-router");

describe("JobFilterSideBarOrganisation", () => {
  const renderJobFilterSideBarOrganisation = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    render(JobFilterSideBarOrganisation, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
        plugins: [pinia],
      },
    });
    return { jobsStore, userStore };
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
      useRouter.mockReturnValue({ push: vi.fn() });
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
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const { jobsStore } = renderJobFilterSideBarOrganisation();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);
      const button = screen.getByRole("button", {
        name: /organisations/i,
      });
      await userEvent.click(button);
      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "JobResultsView" });
    });
  });
});
