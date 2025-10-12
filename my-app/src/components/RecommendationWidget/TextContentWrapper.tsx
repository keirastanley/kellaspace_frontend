/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { RECOMMENDATION_WIDGET_SPACING_COMPACT } from "../../constants/spacing";

export const TextContentWrapper = ({
  children,
  width,
}: PropsWithChildren & { width: string }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      gap: ${RECOMMENDATION_WIDGET_SPACING_COMPACT};
      height: 100%;
      width: 100%;
      padding-top: 4px;
      padding-right: 4px;
      box-sizing: border-box;
      width: ${width};
    `}
  >
    {children}
  </div>
);
