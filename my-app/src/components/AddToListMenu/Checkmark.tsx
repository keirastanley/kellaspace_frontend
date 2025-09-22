/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IoCheckmarkOutline } from "react-icons/io5";

const CheckmarkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
`;

const CheckmarkIcon = styled(IoCheckmarkOutline)`
  color: white;
  font-size: 14px;
`;

export const Checkmark = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <CheckmarkContainer
      css={css`
        background-color: ${checked ? "black" : "white"};
      `}
    >
      <input type="checkbox" onChange={onChange} checked={checked} />
      <CheckmarkIcon />
    </CheckmarkContainer>
  );
};
