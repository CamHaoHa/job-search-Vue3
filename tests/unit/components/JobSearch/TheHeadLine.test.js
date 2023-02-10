import { nextTick } from "vue";
import { render, screen } from "@testing-library/vue";

import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
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
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("display the headline action verbs", () => {
    render(TheHeadline);
    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  it("change action verb with interval function, and the interval function will be called", () => {
    const mockFunction = vi.fn();
    vi.stubGlobal("setInterval", mockFunction);
    render(TheHeadline);
    expect(mockFunction).toHaveBeenCalled();
  });

  it("swap action verb after the interval function", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer(); //move the interval to next interval
    await nextTick(); //nextTick ask the test to wait for the next change of stages
    const actionPhrase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("clear interval when DOM is unmounted", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);
    const { unmount } = render(TheHeadline);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
