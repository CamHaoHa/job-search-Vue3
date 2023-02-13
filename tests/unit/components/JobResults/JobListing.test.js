import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  const createJobProps = (jobprops = {}) => ({
    title: "Vue Developer",
    organisation: " Microsoft Corporation",
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
});
