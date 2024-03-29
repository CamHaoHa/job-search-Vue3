import type { Mock } from "vitest";
import { createJob } from "../../utils/createJob";
import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import axios from "axios";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores empty array before fetch data", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("action", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API requests and store received data", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Job1", "Job2"] });
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
        createJob({ organization: "Meta" }),
        createJob({ organization: "Alphabet" }),
        createJob({ organization: "Meta" }),
      ];
      const result = store.UNIQUE_ORGANIZATIONS;

      expect(result).toEqual(new Set(["Alphabet", "Meta"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("find unique job types in the list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Full-time" }),
      ];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected job organization filter", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const store = useJobsStore();
        const job = createJob({ organization: "Tesla" });
        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
        expect(result).toBe(true);
      });
    });

    it("includes job if job is associate with given organization", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Tesla"];
      const store = useJobsStore();
      const job = createJob({ organization: "Tesla" });
      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected job type filter", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const store = useJobsStore();
        const job = createJob({ jobType: "Full-time" });
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
        expect(result).toBe(true);
      });
    });

    it("includes job if job is associate with given jobType", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Full-time", "Part-time"];
      const store = useJobsStore();
      const job = createJob({ jobType: "Full-time" });
      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user has not chosen a degree for job filters", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedDegrees = [];
        const store = useJobsStore();
        const job = createJob();
        const result = store.INCLUDE_JOB_BY_DEGREE(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with a given degrees", () => {
      const userStore = useUserStore();
      userStore.selectedDegrees = ["data1", "data2"];
      const store = useJobsStore();
      const job = createJob({ degree: "data1" });
      const result = store.INCLUDE_JOB_BY_DEGREE(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_SKILL", () => {
    it("include job if job is associate with given skill search term", () => {
      const userStore = useUserStore();
      userStore.skillSearchTerms = "Vue Developer";
      const store = useJobsStore();
      const job = createJob({ title: "Vue Developer Master" });
      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });
    it("handle character casing", () => {
      const userStore = useUserStore();
      userStore.skillSearchTerms = "vue developer";
      const store = useJobsStore();
      const job = createJob({ title: "Vue Developer Master" });
      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });

    describe("when the user has not fill any skill terms for filtering", () => {
      it("include jobs", () => {
        const userStore = useUserStore();
        userStore.skillSearchTerms = "";
        const store = useJobsStore();
        const job = createJob({ title: "Vue Developer Master" });
        const result = store.INCLUDE_JOB_BY_SKILL(job);
        expect(result).toBe(true);
      });
    });
  });
});
