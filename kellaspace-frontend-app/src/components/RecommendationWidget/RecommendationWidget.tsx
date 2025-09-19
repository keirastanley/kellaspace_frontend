/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";
import { MediaTypeTag } from "./MediaTypeTag";
import { Image } from "./Image";
import { BORDER_RADIUS } from "../../constants/style";
import { Title } from "./Title";
import { Description } from "./Description";
import {
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT,
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED,
  RECOMMENDATION_WIDGET_WIDTH_COMPACT,
} from "../../constants/length";
import { RecommendationWidgetVariant } from "../../interfaces/recommendationWidget";

export const RecommendationWidget = ({
  recommendation,
  variant = RecommendationWidgetVariant.Compact,
}: {
  recommendation: Recommendation;
  variant?: RecommendationWidgetVariant;
}) => {
  const maxDescriptionLength =
    variant === RecommendationWidgetVariant.Expand
      ? RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED
      : RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT;
  const descriptionLength =
    recommendation.title.length + recommendation.description.length;
  const descriptionExceedsMax = descriptionLength > maxDescriptionLength;

  const description = descriptionExceedsMax
    ? `${recommendation.description
        .slice(0, maxDescriptionLength - recommendation.title.length)
        .trimEnd()}...`
    : recommendation.description;
  const width =
    variant === RecommendationWidgetVariant.Compact
      ? RECOMMENDATION_WIDGET_WIDTH_COMPACT
      : "100%";

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        gap: 10px;
        border: 1px solid black;
        border-radius: ${BORDER_RADIUS};
        height: 100px;
        width: ${width};
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
            max-width: ${width ?? "100px"};
            font-size: 12px;
          `}
        >
          <Title
            title={recommendation.title}
            addedBy={recommendation.addedBy}
          />
          <Description description={description} />
        </div>
      </div>
    </div>
  );
};
