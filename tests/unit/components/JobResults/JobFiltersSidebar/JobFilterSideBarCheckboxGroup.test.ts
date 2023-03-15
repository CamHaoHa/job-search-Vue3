import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
// import { useJobsStore } from "@/stores/jobs.js";
import { useUserStore } from "@/stores/user";
import { createTestingPinia } from "@pinia/testing";
import JobFilterSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarCheckboxGroup.vue";
import { useRouter } from "vue-router";
vi.mock("vue-router");
const useRouterMock = useRouter as Mock;

describe("JobFilterSideBarCheckboxGroup", () => {
  interface JobFilterSideBarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }
  const createProps = (
    props: Partial<JobFilterSideBarCheckboxGroupProps> = {}
  ): JobFilterSideBarCheckboxGroupProps => ({
    uniqueValues: new Set(["value1", "value2"]),
    action: vi.fn(),
    ...props,
  });
  const renderJobFilterSideBarCheckboxGroup = (
    props: JobFilterSideBarCheckboxGroupProps
  ) => {
    //our actions are no longer stubbed, which mean they are real immplementation,real action running, have to do it because the test
    //regarding to $onAction
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();
    render(JobFilterSideBarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  };

  it("render unique list of values", async () => {
    const props = createProps({
      uniqueValues: new Set(["Google", "Amazon"]),
    });
    renderJobFilterSideBarCheckboxGroup(props);

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
        uniqueValues: new Set(["Google", "Amazon"]),
        action,
      });
      renderJobFilterSideBarCheckboxGroup(props);

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
        uniqueValues: new Set(["Google"]),
      });
      renderJobFilterSideBarCheckboxGroup(props);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "JobResultsView" });
    });
  });

  describe("When user click on the clear filter button", () => {
    it("uncheck all the checked boxes", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const props = createProps({
        uniqueValues: new Set(["Full-time"]),
      });
      const { userStore } = renderJobFilterSideBarCheckboxGroup(props);

      const fullTimeCheckBoxBeforeAction = screen.getByRole<HTMLInputElement>(
        "checkbox",
        {
          name: /full-time/i,
        }
      );
      await userEvent.click(fullTimeCheckBoxBeforeAction);
      //valilate the checkbox has been checked
      expect(fullTimeCheckBoxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_JOB_FILTERS_SELECTION();
      //no checkbox should be checked at this state
      //we need real pinia implementation <no stubbed test> here
      const fullTimeCheckBoxAfterAction =
        await screen.findByRole<HTMLInputElement>(
          //not getByRole here , because the component hadsn't had the time yet to update itself or run through this logic
          //findByRole is async function,it returns a promise, pause about a second, and wait until that potential change occur and give actual checkbox

          "checkbox",
          {
            name: /full-time/i,
          }
        );
      expect(fullTimeCheckBoxAfterAction.checked).toBe(false);
      //now fullTimeCheckboxAfterAction is the promise
      //and promise itself doesn't have the checked property in it.
      //we need to add await before screen.findByRole
      //after await the promise return the HTML value
    });
  });
});
