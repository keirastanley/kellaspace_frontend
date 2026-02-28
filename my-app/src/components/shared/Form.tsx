/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormHTMLAttributes } from "react";

const TITLE_ID = "form-title";

export const Form = ({
  children,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      aria-labelledby={TITLE_ID}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
      {...props}
    >
      {children}
    </form>
  );
};

Form.Title = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 id={TITLE_ID} {...props} />
);
