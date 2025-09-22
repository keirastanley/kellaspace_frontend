import { Meta, StoryObj } from "@storybook/react";
import { AddToListMenu } from "../../components/AddToListMenu/AddToListMenu";
import { mockRecommendations } from "../../data/mockRecommendations";
import { expect, fn, userEvent, within } from "@storybook/test";
import { mockLists } from "../../data/mockLists";

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
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    await step("Expected list is selected", async () => {
      expect(
        canvas.getByRole("checkbox", {
          name: `${mockLists[0].title} ${mockLists[0].contents?.length} items`,
        })
      ).toBeChecked();
    });

    await step("Select list", async () => {
      await userEvent.click(
        canvas.getByRole("checkbox", {
          name: `${mockLists[1].title} Empty`,
        })
      );

      expect(
        canvas.getByRole("checkbox", {
          name: `${mockLists[1].title} Empty`,
        })
      ).toBeChecked();
    });
  },
};
