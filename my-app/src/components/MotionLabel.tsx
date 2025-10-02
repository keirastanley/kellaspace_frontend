/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as motion from "motion/react-client";
import { ComponentProps } from "react";

export const MotionLabel = ({
  children,
  isSelected,
  fieldName,
}: {
  isSelected: boolean;
  fieldName: string;
} & ComponentProps<typeof motion.label>) => (
  <motion.label
    css={css`
      padding: 5px 15px;
      font-size: 12px;
      text-align: center;
      border-radius: 15px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${isSelected ? "grey" : "white"};
      color: ${isSelected ? "white" : "black"};
    `}
    htmlFor={fieldName}
    layout
    transition={{
      type: "spring",
      damping: 20,
      stiffness: 300,
    }}
  >
    {children}
  </motion.label>
);
