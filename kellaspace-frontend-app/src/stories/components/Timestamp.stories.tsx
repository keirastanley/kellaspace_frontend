import { Meta, StoryObj } from "@storybook/react-vite";
import { Timestamp } from "../../components/RecommendationWidget/Timestamp";

const meta: Meta<typeof Timestamp> = {
  title: "Components/Timestamp",
  component: Timestamp,
};
export default meta;
type Story = StoryObj<typeof meta>;

const TimestampStory = ({
  dateToday,
  dateAdded,
}: {
  dateToday: string;
  dateAdded: string;
}) => (
  <div>
    <p>Date today: {dateToday}</p>
    <p>Date added: {dateAdded}</p>
    <Timestamp dateAdded={dateAdded} dateToday={dateToday} />
  </div>
);

export const LessThanOneHourAgo: Story = {
  render: () => (
    <TimestampStory
      dateToday="2025-09-15T14:23:00.000Z"
      dateAdded="2025-09-15T14:23:00.000Z"
    />
  ),
};

export const FourHoursAgo: Story = {
  render: () => (
    <TimestampStory
      dateToday="2025-09-15T18:23:00.000Z"
      dateAdded="2025-09-15T14:41:00.000Z"
    />
  ),
};

export const TwoDaysAgo: Story = {
  render: () => (
    <TimestampStory
      dateToday="2025-09-17T18:23:00.000Z"
      dateAdded="2025-09-15T14:23:00.000Z"
    />
  ),
};

export const OneWeekAgo: Story = {
  render: () => (
    <TimestampStory
      dateToday="2025-09-17T18:23:00.000Z"
      dateAdded="2025-09-10T14:23:00.000Z"
    />
  ),
};
