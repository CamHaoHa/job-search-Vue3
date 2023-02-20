import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  it("render child content", async () => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "category",
      },
      slots: {
        default: "<p>nested child</p>",
      },
    });
    expect(screen.queryByText("nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /category/i });
    await userEvent.click(button);
    expect(screen.getByText("nested child")).toBeInTheDocument();
  });
});
