/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { InputHTMLAttributes } from "react";
import { MotionLabel } from "../../shared";
import { useRadioGroup } from "./RadioGroupContext";

export interface RadioGroupFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  radioName: string;
}

export const RadioGroupField = ({
  children,
  radioName,
  ...props
}: RadioGroupFieldProps) => {
  const { selectedRadio } = useRadioGroup();
  const isSelected = selectedRadio === radioName;

  return (
    <MotionLabel isSelected={isSelected} fieldName={radioName}>
      <input
        id={radioName}
        type="radio"
        checked={isSelected}
        value={radioName}
        css={css`
          position: absolute;
          opacity: 0;
        `}
        {...props}
      />
      {children}
    </MotionLabel>
  );
};
