import type { Mock } from "vitest";
import axios from "axios";
import { createPinia, setActivePinia } from "pinia";
import { useDegreesStore } from "@/stores/degrees";
import { useUserStore } from "@/stores/user";
import { createDegree } from "../../utils/createDegree";
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("store empty array state before fetching the data", () => {
    const store = useDegreesStore();
    expect(store.degrees).toEqual([]);
  });
});

describe("action", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe("FETCH_DEGREES", () => {
    it("make API requests and store the returned data", async () => {
      axiosGetMock.mockResolvedValue({ data: ["data1", "data2"] });
      const store = useDegreesStore();
      await store.FETCH_DEGREES();
      expect(store.degrees).toEqual(["data1", "data2"]);
    });
  });
});

describe("getter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe("UNIQUE_DEGREES", () => {
    it("find unique values of degree from the degree data", () => {
      const store = useDegreesStore();
      store.degrees = [
        createDegree({ degree: "data1" }),
        createDegree({ degree: "data2" }),
        createDegree({ degree: "data1" }),
      ];
      const result = store.UNIQUE_DEGREEES;
      expect(result).toEqual(new Set(["data1", "data2"]));
    });
  });
});
