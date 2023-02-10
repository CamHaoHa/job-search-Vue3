import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/Navigation/MainNav.vue";
import userEvent from "@testing-library/user-event";

describe("MainNav", () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it("display the logo", () => {
    renderMainNav();
    const companyName = screen.getByText("VueJobs.com");
    expect(companyName).toBeInTheDocument();
  });

  it("display menu items for mainnav", () => {
    renderMainNav();

    const mainNavItems = screen.getAllByRole("listitem");
    const mainNavTexts = mainNavItems.map((item) => item.textContent);
    // console.log(mainNavTexts);
    expect(mainNavTexts).toEqual([
      "Teams",
      "Location",
      "Benefits",
      "Jobs",
      "Students",
      "About Us",
    ]);
  });

  describe("when the user logs in", () => {
    it("display profile picture", async () => {
      renderMainNav();

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });

      await userEvent.click(loginButton);

      profileImage = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
