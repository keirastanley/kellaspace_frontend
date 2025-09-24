/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";
import { MediaTypeTag } from "./MediaTypeTag";
import { Image } from "../Image";
import { BORDER_RADIUS } from "../../constants/style";
import {
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT,
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED,
  RECOMMENDATION_WIDGET_WIDTH_COMPACT,
} from "../../constants/length";
import { RecommendationWidgetVariant } from "../../interfaces/recommendationWidget";
import { RECOMMENDATION_WIDGET_SPACING_COMPACT } from "../../constants/spacing";
import { Timestamp } from "./Timestamp";
import * as motion from "motion/react-client";
import styled from "@emotion/styled";
import { WidgetText } from "./WidgetText";

const MotionButton = styled(motion.button)`
  padding: 0;
  text-align: left;
  color: black;
  background-color: white;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  border: 1px solid black;
  border-radius: ${BORDER_RADIUS};
  box-sizing: border-box;
  height: 100px;
  flex: 0 0 100px;
`;

export const RecommendationWidget = ({
  recommendation,
  onClick,
  variant = RecommendationWidgetVariant.Compact,
}: {
  recommendation: Recommendation;
  onClick: (recommendation: Recommendation) => void;
  variant?: RecommendationWidgetVariant;
}) => {
  const maxDescriptionLength =
    variant === RecommendationWidgetVariant.Expand
      ? RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED
      : RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT;

  const width =
    variant === RecommendationWidgetVariant.Compact
      ? RECOMMENDATION_WIDGET_WIDTH_COMPACT
      : "100%";

  return (
    <MotionButton
      whileTap={{ scale: 0.95 }}
      css={css`
        width: ${width};
      `}
      onClick={() => onClick(recommendation)}
    >
      <Image imageSrc={recommendation.image?.src} />
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
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            width: 100%;
          `}
        >
          <MediaTypeTag mediaType={recommendation.mediaType} />
          <Timestamp
            dateAdded={recommendation.dateAdded}
            dateToday={new Date().toISOString()}
          />
        </div>
        <div
          css={css`
            max-width: ${width ?? "100px"};
            font-size: 12px;
          `}
        >
          <WidgetText
            title={recommendation.title}
            addedBy={recommendation.addedBy}
            description={recommendation.description}
            maxDescriptionLength={maxDescriptionLength}
          />
        </div>
      </div>
    </MotionButton>
  );
};
