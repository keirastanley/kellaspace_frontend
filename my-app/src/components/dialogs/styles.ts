import * as motion from "motion/react-client";
import styled from "@emotion/styled";

export const DialogMain = styled(motion.dialog)`
  border: none;
  border-radius: 8px;
  padding: 10px;
  width: 400px;
  overflow: hidden;
`;

export const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  border-radius: 8px;
  height: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
`;
