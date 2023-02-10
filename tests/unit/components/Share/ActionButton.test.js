import { render, screen } from "@testing-library/vue";
import ActionButton from "@/components/Share/ActionButton.vue";

describe("ActionButton", () => {
  it("render text", () => {
    render(ActionButton, {
      props: {
        text: "sign in",
        type: "primary",
      },
    });
    const button = screen.getByRole("button", {
      name: /sign in/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("apply at least one css style", () => {
    render(ActionButton, {
      props: {
        text: "sign in",
        type: "primary",
      },
    });
    const button = screen.getByRole("button", {
      name: /sign in/i,
    });
    expect(button).toHaveClass("primary");
  });
});
