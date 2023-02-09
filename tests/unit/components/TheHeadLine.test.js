import { nextTick } from "vue";
import { render, screen } from "@testing-library/vue";

import TheHeadline from "@/components/TheHeadline.vue";
//UNDERSTAND ABOUT MOCK FUNCTION
// describe("TheHeadline", () => {
// describe("Vitest playground", () => {
//   it("tracks whether it has been called", () => {
//     const mockFunction = vi.fn();
//     mockFunction(1, 2);
//     expect(mockFunction).toHaveBeenCalledWith(1, 2);
//   });
// });

describe("TheHeadline", () => {
  it("display the headline action verbs", () => {
    vi.useFakeTimers();
    render(TheHeadline);
    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("change action verb with interval function, and the interval function will be called", () => {
    vi.useFakeTimers();
    const mockFunction = vi.fn();
    vi.stubGlobal("setInterval", mockFunction);
    render(TheHeadline);
    expect(mockFunction).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("swap action verb after the interval function", async () => {
    vi.useFakeTimers();
    render(TheHeadline);
    vi.advanceTimersToNextTimer(); //move the interval to next interval
    await nextTick(); //nextTick ask the test to wait for the next change of stages
    const actionPhrase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("clear interval when DOM is unmounted", () => {
    vi.useFakeTimers();
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);
    const { unmount } = render(TheHeadline);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
