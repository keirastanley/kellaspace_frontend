/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { BORDER_RADIUS } from "../../constants/style";

export const MainWrapper = ({
  isSelected,
  children,
  ...props
}: { isSelected: boolean } & ComponentProps<typeof motion.div>) => (
  <motion.div
    css={css`
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 6px;
      border: 1px solid black;
      border-radius: ${BORDER_RADIUS};
      height: 100px;
      scale: ${isSelected ? 0.95 : 1};
    `}
    {...props}
  >
    {children}
  </motion.div>
);
