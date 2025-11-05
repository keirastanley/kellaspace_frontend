import { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "../../components";
import { MediaType } from "../../interfaces";
import { useEffect, useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
};
export default meta;

export const Primary: StoryObj = {
  render: function MediaTypeRadioGroup() {
    const [selectedMediaType, setSelectedMediaType] = useState<MediaType>();
    const [order, setOrder] = useState<MediaType[]>(Object.values(MediaType));

    useEffect(() => {
      setOrder((prevOrder) => [
        ...prevOrder.filter((el) => el === selectedMediaType),
        ...prevOrder.filter((el) => el !== selectedMediaType),
      ]);
    }, [selectedMediaType]);

    return (
      <RadioGroup value={selectedMediaType}>
        <RadioGroup.Legend>I'm the legend</RadioGroup.Legend>
        {order.map((mediaType) => (
          <RadioGroup.Field
            radioName={mediaType}
            key={mediaType}
            onChange={() => {
              setSelectedMediaType(mediaType);
            }}
          >
            {mediaType}
          </RadioGroup.Field>
        ))}
      </RadioGroup>
    );
  },
};
