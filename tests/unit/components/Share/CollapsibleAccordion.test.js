import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/Share/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
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
      ...config,
    });
  };

  it("render child content", async () => {
    const props = { header: "category" };
    const slots = { default: "<p>nested child</p>" };
    const config = { props, slots };
    renderCollapsibleAccordion(config);
    expect(screen.queryByText("nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /category/i });
    await userEvent.click(button);
    expect(screen.getByText("nested child")).toBeInTheDocument();
  });

  describe("when parent does not custom child content", () => {
    it("render fallback slot content", async () => {
      const props = { header: "category" };
      const slots = {};
      const config = { props, slots };
      renderCollapsibleAccordion(config);
      const button = screen.getByRole("button", { name: /category/i });
      await userEvent.click(button);
      expect(screen.getByText("Default Slot")).toBeInTheDocument();
    });
  });
});
