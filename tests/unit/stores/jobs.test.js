import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import axios from "axios";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores empty array before fetch data", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API requests and store received data", async () => {
      axios.get.mockResolvedValue({ data: ["Job1", "Job2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job1", "Job2"]);
    });
  });
});

describe("getter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATION", () => {
    it("find unique organizations in the list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Meta" },
        { organization: "Alphabet" },
        { organization: "Meta" },
      ];
      const result = store.UNIQUE_ORGANIZATIONS;

      expect(result).toEqual(new Set(["Alphabet", "Meta"]));
    });
  });
});
