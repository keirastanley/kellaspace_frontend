import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const MotionButton = styled(motion.button)`
  padding: 5px 15px;
  width: max-content;
  font-size: 12px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  gap: 4px;
  span {
    font-size: 12px;
  }
  svg {
    font-size: 18px;
  }
`;
