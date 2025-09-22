import { Meta, StoryObj } from "@storybook/react";
import { RecommendationMenu } from "../../components/RecommendationMenu/RecommendationMenu";
import { mockRecommendations } from "../../data/mockRecommendations";

const meta: Meta<typeof RecommendationMenu> = {
  title: "Components/RecommendationMenu",
  component: RecommendationMenu,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    recommendation: mockRecommendations[2],
  },
};
