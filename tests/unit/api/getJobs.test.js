import axios from "axios";

import getJobs from "@/api/getJobs";

vi.mock("axios");

describe("getJob", () => {
  it("fetches jobs that are available", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenNthCalledWith("http://myfakeapi.com/jobs");
  });
});
