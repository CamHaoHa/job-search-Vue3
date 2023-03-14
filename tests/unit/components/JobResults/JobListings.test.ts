import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useDegreesStore } from "@/stores/degrees";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    //@ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({});
    const degreesStore = useDegreesStore();

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
    });
    return { jobsStore, degreesStore };
  };

  it("fetches the job data", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { jobsStore } = renderJobListings();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("fetches the degree data", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { degreesStore } = renderJobListings();
    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it("display maximum of 10 jobs", async () => {
    useRouteMock.mockReturnValue({ query: { page: "1" } });
    const { jobsStore } = renderJobListings();
    //@ts-expect-error

    jobsStore.FILTERED_JOBS = Array(15).fill({});
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
    // expect(jobListings.length).toBe(10);
  });

  //adding test for page number
  describe("when there is NOT query params for page number", () => {
    it("display page number one", () => {
      useRouteMock.mockReturnValue({ query: {} });
      renderJobListings();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when query params include page number", () => {
    it("display page number one", () => {
      useRouteMock.mockReturnValue({ query: { page: "8" } });
      renderJobListings();
      expect(screen.getByText("Page 8")).toBeInTheDocument();
    });
  });

  //test the presence and absence of previos and next button
  describe("when the user at the first page ", () => {
    it("not display the previous button", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });
      const { jobsStore } = renderJobListings();
      //@ts-expect-error

      jobsStore.FILTERED_JOBS = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("display the next button", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });
      const { jobsStore } = renderJobListings();
      //@ts-expect-error

      jobsStore.FILTERED_JOBS = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      // screen.debug();
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when the user at the last page", () => {
    it("not display the next button", async () => {
      // axios.get.mockResolvedValue({ data: Array(25).fill({}) });
      useRouteMock.mockReturnValue({ query: { page: "3" } });
      const { jobsStore } = renderJobListings();
      //@ts-expect-error

      jobsStore.FILTERED_JOBS = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("display the previous button", async () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });
      const { jobsStore } = renderJobListings();
      //@ts-expect-error

      jobsStore.FILTERED_JOBS = Array(25).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
