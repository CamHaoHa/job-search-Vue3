import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";
import userEvent from "@testing-library/user-event";

describe("MainNav", () => {
  it("display the logo", () => {
    render(MainNav);
    const companyName = screen.getByText("VueJobs.com");
    expect(companyName).toBeInTheDocument();
  });
  it("display meny items for mainnav", () => {
    render(MainNav);

    const mainNavItems = screen.getAllByRole("listitem");
    const mainNavTexts = mainNavItems.map((item) => item.textContent);
    console.log(mainNavTexts);
    expect(mainNavTexts).toEqual([
      "Teams",
      "Location",
      "About Us",
      "Career",
      "Students",
      "Jobs",
    ]);
  });

  describe("when the user logs in", () => {
    it("displate profile picture", () => {
      render(MainNav);
      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      userEvent.click(loginButton);

      profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
