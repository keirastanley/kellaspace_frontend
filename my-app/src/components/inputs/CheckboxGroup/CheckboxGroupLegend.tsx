/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

export const CheckboxGroupLegend = ({
  children,
  ...props
}: HTMLAttributes<HTMLLegendElement>) => (
  <legend
    css={css`
      display: flex;
      align-items: center;
      order: 0;
      padding: 0 0.25rem;
      margin: 0;
      position: relative;
    `}
    {...props}
  >
    {children}
  </legend>
);
