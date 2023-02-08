import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("display the logo", () => {
    render(MainNav);
    const companyName = screen.getByText("Vue.com");
    expect(companyName).toBeInTheDocument();
  });
  it("display meny items for mainnav", () => {
    render(MainNav);

    const mainNavItems = screen.getAllByRole("listitem");
    const mainNavTexts = mainNavItems.map((item) => item.textContent);
    // console.log(mainNavTexts);
    expect(mainNavTexts).toEqual([
      "Teams",
      "Location",
      "About Us",
      "Career",
      "Students",
      "Jobs",
    ]);
  });
});
