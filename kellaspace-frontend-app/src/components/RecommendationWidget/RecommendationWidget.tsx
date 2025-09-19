/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";
import { MediaTypeTag } from "./MediaTypeTag";
import { Image } from "./Image";
import { BORDER_RADIUS } from "../../constants/style";
import { Title } from "./Title";
import { Description } from "./Description";

export const RecommendationWidget = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        gap: 10px;
        border: 1px solid black;
        border-radius: ${BORDER_RADIUS};
        height: 100px;
        width: 250px;
      `}
    >
      <Image imageSrc={recommendation.image?.src} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          height: 100%;
        `}
      >
        <MediaTypeTag mediaType={recommendation.mediaType} />
        <div
          css={css`
            p {
              margin: 0;
            }
            max-width: 100px;
            font-size: 12px;
          `}
        >
          <Title
            title={recommendation.title}
            addedBy={recommendation.addedBy}
          />
          <Description description={recommendation.description} />
        </div>
      </div>
    </div>
  );
};
