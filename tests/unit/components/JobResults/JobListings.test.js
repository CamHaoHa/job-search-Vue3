import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import axios from "axios";
import { RouterLinkStub } from "@vue/test-utils";

vi.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route: $route,
        },
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
    });
  };

  it("fetches the job data", () => {
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();
    renderJobListings($route);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("display maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    renderJobListings($route);
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
    // expect(jobListings.length).toBe(10);
  });
});
