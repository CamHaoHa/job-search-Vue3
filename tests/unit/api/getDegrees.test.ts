import axios from "axios";
import type { Mock } from "vitest";
import getDegrees from "@/api/getDegrees";
vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockReturnValue({
      data: [
        {
          id: 1,
          degree: "Associate",
        },
      ],
    });
  });

  it("fetches data that is available", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
  });
  it("deliver data from the response", async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([
      {
        id: 1,
        degree: "Associate",
      },
    ]);
  });
});
