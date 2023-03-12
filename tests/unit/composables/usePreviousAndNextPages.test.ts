import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
import { ref } from "vue";
describe("usePreviousAndNextPages", () => {
  it("calculate previous page", () => {
    const currentPage = ref(3);
    const maxPage = ref(5);
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(2);
  });
  describe("when the current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = ref(1);
      const maxPage = ref(5);
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBe(undefined);
    });
  });

  it("calculates next page", () => {
    const currentPage = ref(3);
    const maxPage = ref(5);
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(4);
  });
  describe("when the current page is max page", () => {
    it("does not provide the next page", () => {
      const currentPage = ref(5);
      const maxPage = ref(5);
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBe(undefined);
    });
  });
});
