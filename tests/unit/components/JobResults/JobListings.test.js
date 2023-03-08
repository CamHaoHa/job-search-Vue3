import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
vi.mock("vue-router");

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
    });
  };

  it("fetches the job data", () => {
    useRoute.mockReturnValue({ query: {} });
    renderJobListings();
    const jobsStore = useJobsStore();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("display maximum of 10 jobs", async () => {
    useRoute.mockReturnValue({ query: { page: "1" } });
    renderJobListings();
    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
    // expect(jobListings.length).toBe(10);
  });

  //adding test for page number
  describe("when there is NOT query params for page number", () => {
    it("display page number one", () => {
      useRoute.mockReturnValue({ query: {} });
      renderJobListings();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when query params include page number", () => {
    it("display page number one", () => {
      useRoute.mockReturnValue({ query: { page: "8" } });
      renderJobListings();
      expect(screen.getByText("Page 8")).toBeInTheDocument();
    });
  });

  //test the presence and absence of previos and next button
  describe("when the user at the first page ", () => {
    it("not display the previous button", async () => {
      useRoute.mockReturnValue({ query: { page: "1" } });
      renderJobListings();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("display the next button", async () => {
      useRoute.mockReturnValue({ query: { page: "1" } });
      renderJobListings();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      // screen.debug();
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when the user at the last page", () => {
    it("not display the next button", async () => {
      // axios.get.mockResolvedValue({ data: Array(25).fill({}) });
      useRoute.mockReturnValue({ query: { page: "3" } });
      renderJobListings();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("display the previous button", async () => {
      useRoute.mockReturnValue({ query: { page: "3" } });
      renderJobListings();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
