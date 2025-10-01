/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useEffect, DialogHTMLAttributes } from "react";

export const Dialog = ({
  open,
  onClose,
  title,
  children,
}: DialogHTMLAttributes<HTMLDialogElement> & { onClose: () => void }) => {
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
    <dialog
      ref={dialogRef}
      css={css`
        ::backdrop {
          background: rgba(0, 0, 0, 0.5);
        }
        border: none;
        border-radius: 8px;
        padding: 0;
        width: 400px;
      `}
    >
      <form
        method="dialog"
        css={css`
          padding: 1rem;
          background: white;
          border-radius: 8px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <h3>{title}</h3>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div
          css={css`
            margin-top: 1rem;
          `}
        >
          {children}
        </div>
      </form>
    </dialog>
  );
};
