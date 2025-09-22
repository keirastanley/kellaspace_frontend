import { Meta, StoryObj } from "@storybook/react";
import { AddToListMenu } from "../../components/AddToListMenu/AddToListMenu";
import { mockRecommendations } from "../../data/mockRecommendations";
import { fn } from "@storybook/test";

const meta: Meta<typeof AddToListMenu> = {
  title: "Components/AddToListMenu",
  component: AddToListMenu,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    recommendationId: mockRecommendations[0].id,
    onCancel: fn(),
    addToNewList: fn(),
  },
};
