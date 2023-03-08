import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  const createJobProps = (jobprops = {}) => ({
    title: "Vue Developer",
    organization: " Microsoft Corporation",
    ...jobprops,
  });

  const renderJobListing = (jobprops) => {
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
    const jobTitle = createJobProps({ title: "Junior Developer" });
    renderJobListing(jobTitle);
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
  });

  it("render the job organisation", () => {
    const jobOrganisation = createJobProps({ organization: "Apple" });
    renderJobListing(jobOrganisation);
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("render the job locations", () => {
    const jobLocations = createJobProps({ locations: ["Sydney", "Melbourne"] });
    renderJobListing(jobLocations);
    expect(screen.getByText("Sydney")).toBeInTheDocument();
    expect(screen.getByText("Melbourne")).toBeInTheDocument();
  });

  it("render the job requirement", () => {
    const jobRequirement = createJobProps({
      minimumQualifications: ["Vue foundation", "JS foundation"],
    });
    renderJobListing(jobRequirement);
    expect(screen.getByText("Vue foundation")).toBeInTheDocument();
    expect(screen.getByText("JS foundation")).toBeInTheDocument();
  });
});
