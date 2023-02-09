import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locate element in list and returns the next element in list", () => {
    const list = ["a", "b", "c", "d", "e"];
    const value = "d";
    const result = nextElementInList(list, value);
    expect(result).toBe("e");
  });

  describe("when the element is at the end of the list", () => {
    it("locate the next element is the element at[0] "),
      () => {
        const list = ["a", "b", "c", "d", "e"];
        const value = "e";
        const result = nextElementInList(list, value);
        expect(result).toBe("a");
      };
  });
});
