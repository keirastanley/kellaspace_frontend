import { Meta, StoryObj } from "@storybook/react";
import { FilterByTypeCheckboxGroup } from "../../components/FilterByTypeCheckboxGroup";
import { useState } from "react";
import { expect, userEvent, within } from "@storybook/test";
import { MediaType } from "../../interfaces/recommendations";

const meta: Meta<typeof FilterByTypeCheckboxGroup> = {
  title: "Components/FilterByTypeCheckboxGroup",
  component: FilterByTypeCheckboxGroup,
};
export default meta;
type Story = StoryObj<typeof meta>;

const mockFilters = Object.values(MediaType);

function FilterByTypeCheckboxGroupStory() {
  const [selectedFilters, setSelectedFilters] = useState<MediaType[]>([]);
  return (
    <FilterByTypeCheckboxGroup
      mediaTypes={mockFilters}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    />
  );
}

export const Primary: Story = {
  render: FilterByTypeCheckboxGroupStory,
};

export const PlayThrough: Story = {
  render: FilterByTypeCheckboxGroupStory,
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    const getCheckbox = (name: string) =>
      canvas.getByRole("checkbox", {
        name,
      });

    await step("Expected filters are displayed", async () => {
      for (const filter of mockFilters) {
        expect(
          canvas.getByRole("checkbox", { name: filter })
        ).toBeInTheDocument();
      }
      for (const filter of mockFilters) {
        expect(canvas.getByText(filter)).toBeVisible();
      }
    });

    await step("Select filters", async () => {
      for (const filter of mockFilters) {
        const checkbox = getCheckbox(filter);
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      }
    });

    await step("All filters are selected", async () => {
      for (const filter of mockFilters) {
        const checkbox = getCheckbox(filter);
        expect(checkbox).toBeChecked();
      }
    });

    await step("Deselect filters", async () => {
      for (const filter of mockFilters) {
        const checkbox = getCheckbox(filter);
        await userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
      }
    });

    await step("All filters are deselected", async () => {
      for (const filter of mockFilters) {
        const checkbox = getCheckbox(filter);
        expect(checkbox).not.toBeChecked();
      }
    });

    await step('Select "All"', async () => {
      const allCheckbox = getCheckbox("All");
      await userEvent.click(allCheckbox);
      expect(allCheckbox).toBeChecked();
    });

    await step("All filters are selected", async () => {
      for (const filter of mockFilters) {
        const checkbox = getCheckbox(filter);
        expect(checkbox).toBeChecked();
      }
    });

    await step('Deselect "Video" filter', async () => {
      await userEvent.click(getCheckbox(MediaType.Video));
    });

    await step('"All" filter and "Video" filters are deselected', async () => {
      expect(getCheckbox("All")).not.toBeChecked();
      expect(getCheckbox(MediaType.Video)).not.toBeChecked();
    });
  },
};
