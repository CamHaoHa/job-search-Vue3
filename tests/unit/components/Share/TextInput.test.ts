import { screen, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import TextInput from "@/components/Share/TextInput.vue";

describe("TextInput", () => {
  it("updates what the user has typed in", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "HAO");
    // console.log(emitted());
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["H"], ["HA"], ["HAO"]]);
  });
});
