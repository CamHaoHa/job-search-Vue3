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

  //adding test for page number
  describe("when there is NOT query params for page number", () => {
    it("display page number one", () => {
      const queryParams = { page: undefined }; //when this.$route.query.pate is undefined
      const $route = createRoute(queryParams);
      renderJobListings($route);
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when query params include page number", () => {
    it("display page number one", () => {
      const queryParams = { page: "8" };
      const $route = createRoute(queryParams);
      renderJobListings($route);
      expect(screen.getByText("Page 8")).toBeInTheDocument();
    });
  });
});
