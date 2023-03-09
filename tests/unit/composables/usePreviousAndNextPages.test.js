import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
describe("usePreviousAndNextPages", () => {
  it("calculate previous page", () => {
    const currentPage = { value: 3 };
    const maxPage = { value: 5 };
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(2);
  });
  describe("when the current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 5 };
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBe(undefined);
    });
  });

  it("calculates next page", () => {
    const currentPage = { value: 3 };
    const maxPage = { value: 5 };
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(4);
  });
  describe("when the current page is max page", () => {
    it("does not provide the next page", () => {
      const currentPage = { value: 5 };
      const maxPage = { value: 5 };
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBe(undefined);
    });
  });
});
