import * as motion from "motion/react-client";
import { PropsWithChildren } from "react";

export const ConditionalFieldWrapper = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          scale: { ease: "easeInOut", duration: 0.2 },
          y: { type: "spring", damping: 20, stiffness: 300 },
        },
      }}
      exit={{
        opacity: 0,
        y: -10,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        overflow: "hidden",
        transition: {
          opacity: { duration: 0.2 },
          y: { duration: 0.2 },
          height: { duration: 0.3 },
        },
      }}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {children}
    </motion.div>
  );
};
