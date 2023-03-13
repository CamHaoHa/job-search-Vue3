import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
// import { useJobsStore } from "@/stores/jobs.js";
// import { useUserStore } from "@/stores/user.js";
import { createTestingPinia } from "@pinia/testing";
import JobFilterSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarCheckboxGroup.vue";
import { useRouter } from "vue-router";
vi.mock("vue-router");
const useRouterMock = useRouter as Mock;
describe("JobFilterSideBarCheckboxGroup", () => {
  interface JobFilterSideBarCheckboxGroupProps {
    header: string;
    uniqueValues: Set<string>;
    action: Mock;
  }
  const createProps = (
    props: Partial<JobFilterSideBarCheckboxGroupProps> = {}
  ): JobFilterSideBarCheckboxGroupProps => ({
    header: "A header",
    uniqueValues: new Set(["value1", "value2"]),
    action: vi.fn(),
    ...props,
  });
  const renderJobFilterSideBarCheckboxGroup = (
    props: JobFilterSideBarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia();
    render(JobFilterSideBarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
        plugins: [pinia],
      },
    });
  };

  it("render unique list of values", async () => {
    const props = createProps({
      header: "organisation",
      uniqueValues: new Set(["Google", "Amazon"]),
    });
    renderJobFilterSideBarCheckboxGroup(props);
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
    it("communicates the values that the user has selected through  the filter checkbox", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: "organisations",
        uniqueValues: new Set(["Google", "Amazon"]),
        action,
      });
      renderJobFilterSideBarCheckboxGroup(props);
      const button = screen.getByRole("button", {
        name: /organisations/i,
      });
      await userEvent.click(button);
      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);
      expect(action).toHaveBeenCalledWith(["Google"]);
    });

    it("navigate to the job result page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const props = createProps({
        header: "organisations",
        uniqueValues: new Set(["Google"]),
      });
      renderJobFilterSideBarCheckboxGroup(props);
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
