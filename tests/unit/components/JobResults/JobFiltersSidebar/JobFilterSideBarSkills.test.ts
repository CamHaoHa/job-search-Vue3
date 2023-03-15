import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";
import JobFilterSideBarSkills from "@/components/JobResults/JobFiltersSideBar/JobFilterSideBarSkills.vue";

describe("JobFilterSideBarSkills", () => {
  const renderJobFilterSideBarSkill = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    render(JobFilterSideBarSkills, {
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  };

  it("copy search input form store", async () => {
    const { userStore } = renderJobFilterSideBarSkill();
    userStore.skillSearchTerms = "Vue Programmer";
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    expect(input.value).toBe("Vue Programmer");
  });

  it("write user search term to store", async () => {
    const { userStore } = renderJobFilterSideBarSkill();
    userStore.skillSearchTerms = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "Vue Programmer");
    await userEvent.click(document.body);

    expect(userStore.ADD_SKILL_SEARCH_TERMS).toHaveBeenCalledWith(
      "Vue Programmer"
    );
  });

  it("remove the white space from user input", async () => {
    const { userStore } = renderJobFilterSideBarSkill();
    userStore.skillSearchTerms = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "   Vue Programmer   ");
    await userEvent.click(document.body);

    expect(userStore.ADD_SKILL_SEARCH_TERMS).toHaveBeenCalledWith(
      "Vue Programmer"
    );
  });
});
