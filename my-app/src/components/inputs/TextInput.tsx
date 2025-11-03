/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { v4 as uuid } from "uuid";

const StyledInput = styled.input`
  font-size: 16px;
  height: 25px;
`;

export const TextInput = ({
  label,
  placeholder,
  onChange,
  type,
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  onChange: (val: string) => void;
  type?: string;
  defaultValue?: string;
}) => {
  const id = `text-input-${uuid()}`;
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
      <StyledInput
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
        type={type}
        defaultValue={defaultValue}
        aria-required="true"
      />
    </div>
  );
};
