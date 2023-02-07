import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("display the logo", () => {
    render(MainNav);
    screen.debug();
  });
});
