/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType, Recommendation } from "../../interfaces/recommendations";
import { Image } from "../Image";
import * as motion from "motion/react-client";
import "../../index.css";
import styled from "@emotion/styled";
import { IconType, IconBaseProps } from "react-icons";
import { IoMdOpen } from "react-icons/io";
import { SlBookOpen } from "react-icons/sl";
import {
  IoReaderOutline,
  IoEyeOutline,
  IoEarOutline,
  IoGameControllerOutline,
  IoHeartOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import { RECOMMENDATION_MENU_MAX_DESCRIPTION_LENGTH } from "../../constants/length";
import { forwardRef } from "react";
import { AnimatePresence } from "motion/react";

const actionsPresent: Record<MediaType, string> = {
  [MediaType.Article]: "read",
  [MediaType.Book]: "read",
  [MediaType.Game]: "play",
  [MediaType.Movie]: "watch",
  [MediaType.Music]: "listen",
  [MediaType.Podcast]: "listen",
  [MediaType.TVShow]: "watch",
  [MediaType.Video]: "watch",
};

const actionsPast: Record<MediaType, string> = {
  [MediaType.Article]: actionsPresent.Article,
  [MediaType.Book]: actionsPresent.Article,
  [MediaType.Game]: `${actionsPresent.Game}ed`,
  [MediaType.Movie]: `${actionsPresent.Movie}ed`,
  [MediaType.Music]: `${actionsPresent.Music}ed`,
  [MediaType.Podcast]: `${actionsPresent.Podcast}ed`,
  [MediaType.TVShow]: `${actionsPresent["TV show"]}ed`,
  [MediaType.Video]: `${actionsPresent.Video}ed`,
};

const icons: Record<MediaType, IconType> = {
  [MediaType.Article]: IoReaderOutline,
  [MediaType.Book]: SlBookOpen,
  [MediaType.Game]: IoGameControllerOutline,
  [MediaType.Movie]: IoEyeOutline,
  [MediaType.Music]: IoEarOutline,
  [MediaType.Podcast]: IoEarOutline,
  [MediaType.TVShow]: IoEyeOutline,
  [MediaType.Video]: IoEyeOutline,
};

const MediaIcon = ({
  mediaType,
  ...props
}: IconBaseProps & { mediaType: MediaType }) => {
  const IconComponent = icons[mediaType];
  return <IconComponent {...props} />;
};

const ActionContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  border-top: 1px solid grey;
  padding: 15px;
`;
const ActionButton = styled.div`
  width: 100%;
  background-color: white;
  border: 0;
  text-align: left;
`;

export const RecommendationMenu = forwardRef<
  HTMLDivElement,
  { recommendation?: Recommendation }
>(({ recommendation }, ref) => {
  return (
    <AnimatePresence>
      {recommendation && (
        <motion.div
          ref={ref}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          css={css`
            position: fixed;
            border: 1px solid black;
            height: 100px;
            border-radius: 10px 10px 0px 0px;
            bottom: 0;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            height: max-content;
            background-color: white;
            z-index: 3;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 10px;
                margin: 10px;
              `}
            >
              <Image
                imageSrc={recommendation.image?.src}
                width="50px"
                borderRadius="8px"
              />
              <p>{recommendation.title}</p>
            </div>
            <div
              css={css`
                margin: 0px 10px 10px 10px;
              `}
            >
              <p>
                {recommendation.description.length >
                RECOMMENDATION_MENU_MAX_DESCRIPTION_LENGTH
                  ? `${recommendation.description.slice(
                      0,
                      RECOMMENDATION_MENU_MAX_DESCRIPTION_LENGTH
                    )}...`
                  : recommendation.description}
              </p>
            </div>
            <ActionContainer>
              <IoMdOpen />
              <ActionButton>
                {actionsPresent[recommendation.mediaType]
                  .slice(0, 1)
                  .toUpperCase()}
                {actionsPresent[recommendation.mediaType].slice(1)}
              </ActionButton>
            </ActionContainer>
            <ActionContainer>
              <MediaIcon mediaType={recommendation.mediaType} />
              <ActionButton>
                Mark as {actionsPast[recommendation.mediaType]}
              </ActionButton>
            </ActionContainer>
            <ActionContainer>
              <IoHeartOutline />
              <ActionButton>Add to favourites</ActionButton>
            </ActionContainer>
            <ActionContainer>
              <IoAddCircleOutline />
              <ActionButton>Add to list</ActionButton>
            </ActionContainer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
