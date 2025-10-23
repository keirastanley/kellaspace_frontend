/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../../interfaces";
import { Image } from "../../shared";
import {
  BORDER_RADIUS,
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT,
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_DIALOG,
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED,
  RECOMMENDATION_WIDGET_WIDTH_COMPACT,
} from "../../../constants";
import { RecommendationWidgetVariant } from "../../../interfaces";
import * as motion from "motion/react-client";
import styled from "@emotion/styled";
import { WidgetText } from "./WidgetText";
import { Metadata } from "./Metadata";
import { EditingSection } from "./EditingSection";
import { MainWrapper } from "./MainWrapper";
import { TextContentWrapper } from "./TextContentWrapper";
import { useUserData } from "../../../providers";

const MotionButton = styled(motion.button)`
  padding: 0;
  text-align: left;
  color: black;
  background-color: white;
  box-sizing: border-box;
  border: none;
  flex: 1 0 100px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;
  height: 100%;
  border-radius: ${BORDER_RADIUS};
`;

export const RecommendationWidget = ({
  recommendation,
  onClick,
  variant = RecommendationWidgetVariant.Compact,
  isEditing = false,
}: {
  recommendation: Recommendation;
  onClick: (recommendation: Recommendation) => void;
  variant?: RecommendationWidgetVariant;
  isEditing?: boolean;
}) => {
  const { selectedRecommendation } = useUserData();

  const maxDescriptionLength =
    variant === RecommendationWidgetVariant.Expand
      ? RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED
      : variant === RecommendationWidgetVariant.Dialog
      ? RECOMMENDATION_MAX_DESRIPTION_LENGTH_DIALOG
      : RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT;

  const width =
    variant === RecommendationWidgetVariant.Compact
      ? RECOMMENDATION_WIDGET_WIDTH_COMPACT
      : "100%";

  return (
    <MainWrapper
      isSelected={selectedRecommendation === recommendation}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      layout
    >
      <MotionButton
        css={css`
          width: ${width};
        `}
        onClick={() => onClick(recommendation)}
      >
        <Image src={recommendation.image?.src} />
        <TextContentWrapper width={width}>
          <Metadata
            mediaType={recommendation.mediaType}
            dateAdded={recommendation.dateAdded}
          />
          <div
            css={css`
              width: ${width ?? "100px"};
              max-width: ${width ?? "100px"};
              font-size: 12px;
            `}
          >
            <WidgetText
              title={recommendation.title}
              addedBy={recommendation.addedBy}
              description={recommendation.description}
              maxDescriptionLength={
                isEditing ? maxDescriptionLength - 40 : maxDescriptionLength
              }
            />
          </div>
        </TextContentWrapper>
      </MotionButton>
      {isEditing && <EditingSection recommendation={recommendation} />}
    </MainWrapper>
  );
};
