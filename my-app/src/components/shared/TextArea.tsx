/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { v4 as uuid } from "uuid";

interface TextAreaProps {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange: (val: string) => void;
}

export const TextArea = ({
  label,
  value,
  onChange,
  defaultValue,
}: TextAreaProps) => {
  const id = `text-area-${uuid()}`;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
      `}
    >
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        defaultValue={defaultValue}
      />
    </div>
  );
};
