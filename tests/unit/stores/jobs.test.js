import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
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

describe("action", () => {
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

  describe("UNIQUE_JOB_TYPES", () => {
    it("find unique job types in the list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "Full-time" },
        { jobType: "Part-time" },
        { jobType: "Full-time" },
      ];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("FILTER_JOBS_BY_ORGANIZATIONS", () => {
    it("find jobs by organizations given by filter", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Meta" },
        { organization: "Amazon" },
        { organization: "Tesla" },
      ];

      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Amazon", "Tesla2"];

      const result = jobsStore.FILTER_JOBS_BY_ORGANIZATIONS;

      expect(result).toEqual([{ organization: "Amazon" }]);
    });

    describe("when the user has not chosen any organizations for filtering", () => {
      it("return all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: "Meta" },
          { organization: "Amazon" },
          { organization: "Tesla" },
        ];

        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const result = jobsStore.FILTER_JOBS_BY_ORGANIZATIONS;

        expect(result).toEqual([
          { organization: "Meta" },
          { organization: "Amazon" },
          { organization: "Tesla" },
        ]);
      });
    });
  });

  describe("FILTER_JOBS_BY_JOB_TYPES", () => {
    it("find jobs with jobtypes filter", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { jobType: "Full-time" },
        { jobType: "Part-time" },
        { jobType: "Intern" },
      ];
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time"];
      const result = jobsStore.FILTER_JOBS_BY_JOB_TYPES;
      expect(result).toEqual([{ jobType: "Full-time" }]);
    });
    describe("when the user has not selected any jobtypes for job filters", () => {
      it("return all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { jobType: "Full-time" },
          { jobType: "Part-time" },
          { jobType: "Intern" },
        ];
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const result = jobsStore.FILTER_JOBS_BY_JOB_TYPES;
        expect(result).toEqual([
          { jobType: "Full-time" },
          { jobType: "Part-time" },
          { jobType: "Intern" },
        ]);
      });
    });
  });
});
