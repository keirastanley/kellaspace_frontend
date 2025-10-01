import { useCheckboxGroup } from "./CheckboxGroupProvider";
import { CheckboxGroup } from "./CheckboxGroup";

export const AllCheckbox = () => {
  const { checkboxLabels, selectedCheckboxes, setSelectedCheckboxes } =
    useCheckboxGroup();

  const handleSelectAll = () =>
    setSelectedCheckboxes((prevSelectedCheckboxes) =>
      prevSelectedCheckboxes.includes("All")
        ? []
        : [
            "All",
            ...prevSelectedCheckboxes,
            ...checkboxLabels.filter(
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
