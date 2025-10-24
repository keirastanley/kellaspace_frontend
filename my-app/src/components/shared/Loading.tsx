/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PulseLoader } from "react-spinners";
import { MediaType } from "../../interfaces";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Loading = ({ mediaType }: { mediaType: MediaType }) => {
  const [index, setIndex] = useState(0);
  const interval = 3000;
  const mediaTypeText = mediaType.toLowerCase();
  const messages = [
    `Next, let's find the ${mediaTypeText} you're looking for...`,
    "Initialising search engine...",
    "We're almost there...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
      `}
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
    >
      <PulseLoader size={15} />
      <AnimatePresence mode="wait">
        <motion.p
          css={css`
            font-size: 14px;
          `}
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1.2, ease: "easeInOut" }, // slower fade in
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: "easeInOut" }, // quicker fade out
          }}
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};
