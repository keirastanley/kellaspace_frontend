/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import * as motion from "motion/react-client";

export const Overlay = ({ show = false }: { show?: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          css={css`
            background-color: rgba(0, 0, 0, 0.5);
            height: 100vh;
            width: 100vw;
            position: fixed;
            z-index: 2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.9,
            transition: {
              ease: "easeInOut" as const,
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
          }}
        />
      )}
    </AnimatePresence>
  );
};
