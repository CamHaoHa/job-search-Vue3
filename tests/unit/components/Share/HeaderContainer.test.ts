import { screen, render } from "@testing-library/vue";
import HeaderContainer from "@/components/Share/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("allow parent component to provide title contents", () => {
    render(HeaderContainer, {
      slots: {
        title: "<h2>Title</h2>",
      },
    });

    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("allow parent component to probide subtitle contents", () => {
    render(HeaderContainer, {
      slots: {
        subtitle: "<h2>SubTitle</h2>",
      },
    });

    expect(screen.getByText("SubTitle")).toBeInTheDocument();
  });
});
