import { useCheckboxGroup } from "./CheckboxGroupContext";
import { CheckboxGroup } from "./CheckboxGroup";

export const AllCheckbox = () => {
  const { checkboxLabels, setSelectedCheckboxes } = useCheckboxGroup();

  const handleSelectAll = () =>
    setSelectedCheckboxes((prevSelectedCheckboxes) =>
      prevSelectedCheckboxes.includes("All")
        ? []
        : [
            "All",
            ...prevSelectedCheckboxes,
            ...checkboxLabels.filter(
              (label) => !prevSelectedCheckboxes.includes(label)
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
