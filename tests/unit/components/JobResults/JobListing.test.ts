import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createJob } from "../../../utils/createJob";
import type { Job } from "@/api/types";

describe("JobListing", () => {
  const renderJobListing = (jobprops: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobprops,
        },
      },
    });
  };

  it("render the job title", () => {
    const jobTitle = createJob({ title: "Junior Developer" });
    renderJobListing(jobTitle);
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
  });

  it("render the job organisation", () => {
    const jobOrganisation = createJob({ organization: "Apple" });
    renderJobListing(jobOrganisation);
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("render the job locations", () => {
    const jobLocations = createJob({ location: ["Sydney", "Melbourne"] });
    renderJobListing(jobLocations);
    expect(screen.getByText("Sydney")).toBeInTheDocument();
    expect(screen.getByText("Melbourne")).toBeInTheDocument();
  });

  it("render the job requirement", () => {
    const jobRequirement = createJob({
      minimumQualifications: ["Vue foundation", "JS foundation"],
    });
    renderJobListing(jobRequirement);
    expect(screen.getByText("Vue foundation")).toBeInTheDocument();
    expect(screen.getByText("JS foundation")).toBeInTheDocument();
  });
});
