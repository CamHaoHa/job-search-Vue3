// import { render, screen } from "@testing-library/vue";
// import MainNav from "@/components/MainNav.vue";
// import userEvent from "@testing-library/user-event";

// describe("MainNav", () => {
//   const renderMainNav = () => {
//     render(MainNav, {
//       global: {
//         stubs: {
//           FontAwesomeIcon: true,
//         },
//       },
//     });
//   };

//   it("display the logo", () => {
//     renderMainNav();
//     const companyName = screen.getByText("VueJobs.com");
//     expect(companyName).toBeInTheDocument();
//   });

//   it("display menu items for mainnav", () => {
//     renderMainNav();

//     const mainNavItems = screen.getAllByRole("listitem");
//     const mainNavTexts = mainNavItems.map((item) => item.textContent);
//     // console.log(mainNavTexts);
//     expect(mainNavTexts).toEqual([
//       "Teams",
//       "Location",
//       "Benefits",
//       "Jobs",
//       "Students",
//       "About Us",
//     ]);
//   });

//   describe("when the user logs in", () => {
//     it("display profile picture", async () => {
//       renderMainNav();

//       let profileImage = screen.queryByRole("img", {
//         name: /user profile image/i,
//       });
//       expect(profileImage).not.toBeInTheDocument();

//       const loginButton = screen.getByRole("button", {
//         name: /sign in/i,
//       });

//       await userEvent.click(loginButton);

//       profileImage = screen.getByRole("img", {
//         name: /user profile image/i,
//       });
//       expect(profileImage).toBeInTheDocument();
//     });
//   });
// });

import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import MainNav from "@/components/MainNav.vue";

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

  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("VueJobs.com");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Location",
      "Benefits",
      "Jobs",
      "Students",
      "About Us",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
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
