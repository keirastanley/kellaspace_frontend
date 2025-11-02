/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

const TITLE_ID = "form-title";

export const Form = ({
  handleSubmit,
  children,
}: PropsWithChildren & { handleSubmit: () => void }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      aria-labelledby={TITLE_ID}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {children}
    </form>
  );
};

Form.Title = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 id={TITLE_ID} {...props} />
);
