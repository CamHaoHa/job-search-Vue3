import { render, screen } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");

describe("SpotLight", () => {
  const mockSpotLightsResponse = (spotlight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "some image url",
          title: "some title",
          description: "some description",
          ...spotlight,
        },
      ],
    });
  };

  it("provides image to parent component", async () => {
    const spotlight = { img: "An image url" };
    mockSpotLightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{slotProps.img}}</h1>
        </template>`,
      },
    });

    const test = await screen.findByText("An image url");
    expect(test).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlight = { title: "some title" };
    mockSpotLightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h2>{{slotProps.title}}</h2>
        </template>`,
      },
    });

    const titleText = await screen.findByText("some title");
    expect(titleText).toBeInTheDocument();
  });

  it("provide description to parent component", async () => {
    const spotlight = { description: "some description" };
    mockSpotLightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h2>{{slotProps.description}}</h2>
        </template>`,
      },
    });

    const descriptionText = await screen.findByText("some description");
    expect(descriptionText).toBeInTheDocument();
  });
});
