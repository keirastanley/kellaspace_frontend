import { useCheckboxGroup } from "./CheckboxGroupContext";
import { CheckboxGroup } from "./CheckboxGroup";

export const AllCheckbox = () => {
  const { order, selectedCheckboxes, setSelectedCheckboxes } =
    useCheckboxGroup();

  const handleSelectAll = () =>
    setSelectedCheckboxes((prevSelectedCheckboxes) =>
      prevSelectedCheckboxes.includes("All")
        ? []
        : [
            "All",
            ...prevSelectedCheckboxes,
            ...order.filter(
              (mediaType) => !selectedCheckboxes.includes(mediaType)
            ),
          ]
    );

  const allCheckboxLabel = "All";

  return (
    <CheckboxGroup.Field checkboxName="All" onChange={handleSelectAll}>
      {allCheckboxLabel}
    </CheckboxGroup.Field>
  );
};
