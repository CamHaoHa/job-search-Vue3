import axios from "axios";

import getJobs from "@/api/getJobs";

vi.mock("axios");

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Junior WebDeveloper",
        },
      ],
    });
  });
  it("fetches jobs that are available", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("deliver data from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      {
        id: 1,
        title: "Junior WebDeveloper",
      },
    ]);
  });
});
