/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";
import { Image } from "../Image";
import { BORDER_RADIUS } from "../../constants/style";
import {
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT,
  RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED,
  RECOMMENDATION_WIDGET_WIDTH_COMPACT,
} from "../../constants/length";
import { RecommendationWidgetVariant } from "../../interfaces/recommendationWidget";
import { RECOMMENDATION_WIDGET_SPACING_COMPACT } from "../../constants/spacing";
import * as motion from "motion/react-client";
import styled from "@emotion/styled";
import { WidgetText } from "./WidgetText";
import { Checkmark } from "../AddToListMenu/Checkmark";
import { Metadata } from "./Metadata";
import { useList } from "../../providers/ListProvider";
import { useRecommendations } from "../../providers/RecommendationsProvider";

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
  const { selectedRecommendation } = useRecommendations();
  const { setList, list } = useList();
  const maxDescriptionLength =
    variant === RecommendationWidgetVariant.Expand
      ? RECOMMENDATION_MAX_DESRIPTION_LENGTH_EXPANDED
      : RECOMMENDATION_MAX_DESRIPTION_LENGTH_COMPACT;

  const width =
    variant === RecommendationWidgetVariant.Compact
      ? RECOMMENDATION_WIDGET_WIDTH_COMPACT
      : "100%";

  return (
    <motion.div
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      layout
      css={css`
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 6px;
        border: 1px solid black;
        border-radius: ${BORDER_RADIUS};
        height: 100px;
        scale: ${selectedRecommendation === recommendation ? 0.95 : 1};
      `}
    >
      <MotionButton
        css={css`
          width: ${width};
        `}
        onClick={() => onClick(recommendation)}
      >
        <Image src={recommendation.image?.src} />
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
        </div>
      </MotionButton>
      {isEditing && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            margin-right: 10px;
          `}
        >
          <Checkmark
            checked={!!list?.contents?.includes(recommendation)}
            onChange={() =>
              setList((prevList) => {
                if (prevList && prevList?.contents) {
                  const indexOfList = prevList.contents.indexOf(recommendation);

                  return {
                    ...prevList,
                    contents: [
                      ...prevList.contents.slice(0, indexOfList),
                      ...prevList.contents.slice(indexOfList + 1),
                    ],
                  };
                }
              })
            }
          />
        </div>
      )}
    </motion.div>
  );
};
