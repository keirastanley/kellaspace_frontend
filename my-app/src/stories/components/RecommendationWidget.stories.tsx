import { Meta, StoryObj } from "@storybook/react";
import { RecommendationWidget } from "../../components/RecommendationWidget/RecommendationWidget";
import { mockRecommendations } from "../../data/mockRecommendations";
import { RecommendationWidgetVariant } from "../../interfaces/recommendationWidget";

const meta: Meta<typeof RecommendationWidget> = {
  title: "Components/RecommendationWidget",
  component: RecommendationWidget,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  args: {
    recommendation: mockRecommendations[0],
  },
};

export const Expand: Story = {
  args: {
    recommendation: mockRecommendations[0],
    variant: RecommendationWidgetVariant.Expand,
  },
};
