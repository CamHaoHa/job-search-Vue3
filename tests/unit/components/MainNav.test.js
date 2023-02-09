import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";
import userEvent from "@testing-library/user-event";

describe("MainNav", () => {
  it("display the logo", () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    const companyName = screen.getByText("VueJobs.com");
    expect(companyName).toBeInTheDocument();
  });
  it("display menu items for mainnav", () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const mainNavItems = screen.getAllByRole("listitem");
    const mainNavTexts = mainNavItems.map((item) => item.textContent);
    console.log(mainNavTexts);
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
    it("displate profile picture", async () => {
      render(MainNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
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
