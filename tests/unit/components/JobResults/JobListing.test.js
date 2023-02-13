import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  const renderJobListing = () => {
    render(JobListing, {
      global: {
        "router-link": RouterLinkStub,
      },
      props: {
        job: {
          title: "Junior Developer",
        },
      },
    });
  };
  it("render the job title", () => {
    renderJobListing();
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
  });
});
