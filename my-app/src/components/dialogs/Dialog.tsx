/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useRef, useEffect, DialogHTMLAttributes } from "react";
import { Overlay } from "../shared";
import { DialogVariant } from "../../interfaces";

export const Dialog = ({
  open,
  onClose,
  variant = DialogVariant.Compact,
  children,
}: DialogHTMLAttributes<HTMLDialogElement> & {
  onClose: () => void;
  variant?: DialogVariant;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      if (onClose) {
        onClose();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      <Overlay show={open} />
      {open && (
        <motion.dialog
          key="dialog"
          ref={dialogRef}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeInOut" as const,
              duration: 0.1,
            },
          }}
          exit={{
            opacity: 0,
          }}
          css={css`
            border: none;
            border-radius: 8px;
            padding: 10px;
            width: 400px;
            overflow: hidden;
            height: ${variant === DialogVariant.Expand ? "70%" : "30%"};
          `}
        >
          <form
            method="dialog"
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
              background: white;
              border-radius: 8px;
              height: 100%;
              box-sizing: border-box;
            `}
          >
            <div
              css={css`
                height: 100%;
                box-sizing: border-box;
                padding-left: 10px;
                padding-right: 10px;
              `}
            >
              {children}
            </div>
          </form>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};
