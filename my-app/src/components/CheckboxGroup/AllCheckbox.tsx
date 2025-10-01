import { useMemo } from "react";
import { useCheckboxGroup } from "./CheckboxGroupProvider";
import { CheckboxGroup } from "./CheckboxGroup";

export const AllCheckbox = () => {
  const { checkboxLabels, selectedCheckboxes, setSelectedCheckboxes } =
    useCheckboxGroup();

  const handleSelectAll = () =>
    setSelectedCheckboxes(
      isAllSelected
        ? []
        : [
            ...selectedCheckboxes,
            ...checkboxLabels.filter(
              (mediaType) => !selectedCheckboxes.includes(mediaType)
            ),
          ]
    );

  const isAllSelected = useMemo(
    () => selectedCheckboxes.length === checkboxLabels.length,
    [checkboxLabels, selectedCheckboxes]
  );

  const allCheckboxLabel = "All";

  return (
    <CheckboxGroup.Field checkboxName="All" onChange={handleSelectAll}>
      {allCheckboxLabel}
    </CheckboxGroup.Field>
  );
};
