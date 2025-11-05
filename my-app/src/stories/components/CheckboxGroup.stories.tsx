import { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "../../components";
import { useEffect, useState } from "react";
import { CheckboxGroupVariant } from "../../components/inputs/CheckboxGroup/CheckboxGroup";
import { toggleValuePresentInArr } from "../../utils";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
};
export default meta;

export const Primary: StoryObj = {
  render: function MediaTypeCheckboxGroup() {
    const [selectedValues, setSelectedValues] = useState<string[]>();
    const [order, setOrder] = useState<string[]>([
      "Checkbox 1",
      "Checkbox 2",
      "Checkbox 3",
      "Checkbox 4",
      "Checkbox 5",
      "Checkbox 6",
    ]);

    useEffect(() => {
      setOrder((prevOrder) => [
        ...prevOrder.filter((el) => selectedValues?.includes(el)),
        ...prevOrder.filter((el) => !selectedValues?.includes(el)),
      ]);
    }, [selectedValues]);

    return (
      <CheckboxGroup values={selectedValues}>
        <CheckboxGroup.Legend>I'm the legend</CheckboxGroup.Legend>
        {order.map((checkboxLabel) => (
          <CheckboxGroup.Field
            checkboxName={checkboxLabel}
            key={checkboxLabel}
            onChange={() => {
              setSelectedValues((prevSelectedValues) => [
                ...(prevSelectedValues ?? []),
                checkboxLabel,
              ]);
            }}
          >
            {checkboxLabel}
          </CheckboxGroup.Field>
        ))}
      </CheckboxGroup>
    );
  },
};

export const WithAll: StoryObj = {
  render: function MediaTypeCheckboxGroup() {
    const [selectedValues, setSelectedValues] = useState<string[]>();
    const [order, setOrder] = useState<string[]>([
      "Checkbox 1",
      "Checkbox 2",
      "Checkbox 3",
      "Checkbox 4",
      "Checkbox 5",
      "Checkbox 6",
    ]);

    useEffect(() => {
      setOrder((prevOrder) => [
        ...prevOrder.filter((el) => selectedValues?.includes(el)),
        ...prevOrder.filter((el) => !selectedValues?.includes(el)),
      ]);
    }, [selectedValues]);

    return (
      <CheckboxGroup
        values={selectedValues}
        setValues={setSelectedValues}
        variant={CheckboxGroupVariant.WithAll}
      >
        <CheckboxGroup.Legend>I'm the legend</CheckboxGroup.Legend>
        {order.map((checkboxLabel) => (
          <CheckboxGroup.Field
            checkboxName={checkboxLabel}
            key={checkboxLabel}
            onChange={() => {
              setSelectedValues((prevSelectedValues) =>
                toggleValuePresentInArr(checkboxLabel, prevSelectedValues)
              );
            }}
          >
            {checkboxLabel}
          </CheckboxGroup.Field>
        ))}
      </CheckboxGroup>
    );
  },
};
