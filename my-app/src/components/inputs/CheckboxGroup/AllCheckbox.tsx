import { CheckboxGroup } from "./CheckboxGroup";
import { Dispatch, SetStateAction } from "react";

export const AllCheckbox = ({
  setSelectedCheckboxes,
  checkboxLabels,
}: {
  setSelectedCheckboxes: Dispatch<SetStateAction<string[] | undefined>>;
  checkboxLabels: string[];
}) => {
  const allCheckboxLabel = "All";

  const handleSelectAll = () => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      return (prevSelectedCheckboxes ?? []).includes(allCheckboxLabel)
        ? []
        : [
            allCheckboxLabel,
            ...(prevSelectedCheckboxes ?? []),
            ...checkboxLabels.filter(
              (label) => !(prevSelectedCheckboxes ?? []).includes(label)
            ),
          ];
    });
  };

  return (
    <CheckboxGroup.Field
      checkboxName={allCheckboxLabel}
      onChange={handleSelectAll}
    >
      {allCheckboxLabel}
    </CheckboxGroup.Field>
  );
};
