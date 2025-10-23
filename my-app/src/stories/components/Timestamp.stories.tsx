import { Meta, StoryObj } from "@storybook/react";
import { Timestamp } from "../../components";

const meta: Meta<typeof Timestamp> = {
  title: "Components/Timestamp",
  component: Timestamp,
};
export default meta;
type Story = StoryObj<typeof meta>;

const TimestampStory = ({ dateAdded }: { dateAdded: string }) => {
  const dateToday = "2025-09-15T18:23:00.000Z";
  return (
    <div>
      <p>Date today: {dateToday}</p>
      <p>Date added: {dateAdded}</p>
      <Timestamp dateAdded={dateAdded} />
    </div>
  );
};
export const LessThanOneHourAgo: Story = {
  render: () => <TimestampStory dateAdded="2025-09-15T14:23:00.000Z" />,
};

export const FourHoursAgo: Story = {
  render: () => <TimestampStory dateAdded="2025-09-15T14:41:00.000Z" />,
};

export const TwoDaysAgo: Story = {
  render: () => <TimestampStory dateAdded="2025-09-15T14:23:00.000Z" />,
};

export const OneWeekAgo: Story = {
  render: () => <TimestampStory dateAdded="2025-09-10T14:23:00.000Z" />,
};
