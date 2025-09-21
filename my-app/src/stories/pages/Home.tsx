import { Meta, StoryObj } from "@storybook/react-vite";
import { Home } from "../../pages/Home";
import { useState } from "react";
import { RecommendationFilter } from "../../interfaces/recommendationFilters";
import { expect, userEvent, within } from "@storybook/test";
import { MediaType } from "../../interfaces/recommendations";

const meta: Meta<typeof Home> = {
  title: "Components/Home",
  component: Home,
};
export default meta;
type Story = StoryObj<typeof meta>;

const mockFilters = Object.values(MediaType);

export const Primary: Story = {};

export const PlayThrough: Story = {
  render: Home,
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
