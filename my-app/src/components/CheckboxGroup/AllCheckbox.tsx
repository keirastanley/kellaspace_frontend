/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Transition } from "motion/react";
import * as motion from "motion/react-client";
import { useMemo } from "react";
import styled from "@emotion/styled";

const MotionLabel = styled(motion.label)`
  padding: 5px 15px;
  font-size: 12px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export function AllCheckbox<CheckboxType extends string>({
  checkboxLabels,
  selectedCheckboxes,
  setSelectedCheckboxes,
}: {
  checkboxLabels: CheckboxType[];
  selectedCheckboxes: CheckboxType[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<CheckboxType[]>>;
}) {
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
    <MotionLabel
      layout
      transition={spring}
      css={selectedStyle(selectedCheckboxes.length === checkboxLabels.length)}
      htmlFor={allCheckboxLabel}
    >
      <input
        type="checkbox"
        id={allCheckboxLabel}
        checked={isAllSelected}
        onChange={handleSelectAll}
      />
      {allCheckboxLabel}
    </MotionLabel>
  );
}

const spring: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const selectedStyle = (isSelected: boolean) =>
  css`
    background-color: ${isSelected ? "grey" : "white"};
    color: ${isSelected ? "white" : "black"};
  `;
