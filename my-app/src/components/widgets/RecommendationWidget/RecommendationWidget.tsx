import { css } from "@emotion/react";
import { Recommendation } from "../../../interfaces";
import { BORDER_RADIUS } from "../../../constants";
import { motion } from "motion/react";
import { Metadata } from "./Metadata";
import { useUserData } from "../../../providers";

export const RecommendationWidget = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  const { selectedRecommendation, setSelectedRecommendation } = useUserData();
  const isSelected = selectedRecommendation === recommendation;

  return (
    <motion.button
      onClick={() => setSelectedRecommendation(recommendation)}
      layout
      animate={{ scale: isSelected ? 0.95 : 1 }}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      css={css`
        display: flex;
        gap: 6px;
        height: 100px;
        padding: 0;
        border: 1px solid black;
        border-radius: ${BORDER_RADIUS};
        background: transparent;
        text-align: left;
        align-items: stretch;
      `}
    >
      <div
        css={css`
          width: 100px;
          flex-shrink: 0;
          border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
          background: pink url(${recommendation.image?.src ?? ""}) center /
            cover no-repeat;
        `}
      />
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 4px 4px 0 0;
          box-sizing: border-box;
          overflow: hidden;
        `}
      >
        <Metadata
          mediaType={recommendation.mediaType}
          dateAdded={recommendation.dateAdded}
        />
        <div
          css={css`
            font-size: 12px;
            overflow: hidden;
          `}
        >
          <p>
            <b>
              <i>{recommendation.title}</i> added by {recommendation.addedBy}
            </b>
          </p>
          <div
            css={css`
              font-size: 12px;
              display: -webkit-box;
              -webkit-line-clamp: 3; /* show 3 lines max */
              -webkit-box-orient: vertical;
              overflow: hidden;
            `}
          >
            <p>{recommendation.description}</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
};
