/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnimatePresence } from "motion/react";
import { useRef, useEffect, DialogHTMLAttributes } from "react";
import { Overlay } from "../shared";
import { DialogVariant } from "../../interfaces";
import { animations, transitions } from "../../animations";
import { DialogForm, DialogMain } from "./styles";

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

  const fadeInAndOut = animations.getFade();
  const growLarger = animations.getChangeSize();

  const dialogMotion = {
    initial: {
      ...fadeInAndOut.initial,
      ...growLarger.initial,
    },
    animate: {
      ...fadeInAndOut.animate,
      ...growLarger.animate,
      ...transitions.getEaseInOut(),
    },
    exit: fadeInAndOut.exit,
  };

  return (
    <AnimatePresence>
      <Overlay show={open} />
      {open && (
        <DialogMain
          key="dialog"
          ref={dialogRef}
          {...dialogMotion}
          css={css`
            height: ${variant === DialogVariant.Expand ? "70%" : "30%"};
          `}
        >
          <DialogForm method="dialog">{children}</DialogForm>
        </DialogMain>
      )}
    </AnimatePresence>
  );
};
