import { Meta, StoryObj } from "@storybook/react-vite";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { mockRecommendations } from "../data/mockRecommendations";

const meta: Meta<typeof RecommendationWidget> = {
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
    width: "100%",
  },
};
