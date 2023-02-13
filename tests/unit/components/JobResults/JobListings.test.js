import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import axios from "axios";
import { RouterLinkStub } from "@vue/test-utils";

vi.mock("axios");

describe("JobListings", () => {
  it("fetches the job data", () => {
    axios.get.mockResolvedValue({ data: [] });
    render(JobListings);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("create a job listing for every job", async () => {
    axios.get.mockResolvedValue({ data: Array(20).fill({}) });
    render(JobListings, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
    });
    const jobListings = await screen.findAllByRole("listitem");
    // expect(jobListings).toHaveLength(20);
    expect(jobListings.length).toBe(20);
  });
});
