// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import * as motion from "motion/react-client";
import { PropsWithChildren } from "react";

export const ConditionalFieldWrapper = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      layout
      initial={{
        opacity: 1,
        scale: 0.5,
        transform: "translateY(-20px)",
        position: "relative",
        transition: {
          scale: { ease: "easeInOut", duration: 0.5 },
          // opacity: { duration: 0.5, ease: "easeOut" },
          transform: { type: "spring", damping: 20, stiffness: 300 },
        },
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transform: "translateY(0)",
        position: "relative",
        transition: {
          scale: { ease: "easeInOut", duration: 0.2 },
          // opacity: { duration: 0.5, ease: "easeOut" },
          transform: { type: "spring", damping: 20, stiffness: 300 },
        },
      }}
      exit={{
        opacity: 0,
        transform: "translateY(-40px)",
        position: "relative",
        transition: {
          // scale: { ease: "easeInOut", duration: 0.5 },
          // opacity: { duration: 0.8, ease: "easeIn" },
          transform: { type: "spring", damping: 20, stiffness: 100 },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
