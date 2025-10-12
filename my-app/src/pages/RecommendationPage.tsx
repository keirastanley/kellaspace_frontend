/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { PageWrapper } from "../components/PageWrapper";
import { Image } from "../components/Image";
import {
  MediaTypeTag,
  MediaTypeTagVariant,
} from "../components/RecommendationWidget/MediaTypeTag";
import { MotionButton } from "../components/MotionButton";
import { Icons } from "../components/Icons";
import { MediaIcon } from "../components/RecommendationMenu/MediaIcon";
import { actionsPast } from "../interfaces/actions";

export const RecommendationPage = () => {
  const { recommendation_id } = useParams();
  const { recommendations, setRecommendations } = useRecommendations();

  const recommendation = useMemo(
    () => recommendations.find(({ id }) => id === recommendation_id),
    [recommendation_id, recommendations]
  );

  return recommendation ? (
    <PageWrapper paddingRight={10}>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <h1>{recommendation.title}</h1>
        <MediaTypeTag
          mediaType={recommendation.mediaType}
          variant={MediaTypeTagVariant.Large}
        />
      </div>
      <p>
        Added by {recommendation.addedBy} on{" "}
        {new Date(recommendation.dateAdded).toLocaleDateString()}
      </p>
      <Image
        src={recommendation.image?.src}
        style={{ width: "200px", borderRadius: "6px" }}
      />

      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        <MotionButton
          onClick={() =>
            setRecommendations((prevRecommendations) => {
              const indexOfRecommendation =
                prevRecommendations.indexOf(recommendation);
              return [
                ...prevRecommendations.slice(0, indexOfRecommendation),
                { ...recommendation, completed: !recommendation.completed },
                ...prevRecommendations.slice(indexOfRecommendation + 1),
              ];
            })
          }
        >
          <MediaIcon
            mediaType={recommendation.mediaType}
            completed={recommendation.completed}
          />
          {recommendation.completed
            ? `${actionsPast[recommendation.mediaType]
                .slice(0, 1)
                .toUpperCase()}${actionsPast[recommendation.mediaType].slice(
                1
              )}`
            : `Mark as ${actionsPast[recommendation.mediaType]}`}
        </MotionButton>
        <MotionButton
          onClick={() =>
            setRecommendations((prevRecommendations) => {
              const indexOfRecommendation =
                prevRecommendations.indexOf(recommendation);
              return [
                ...prevRecommendations.slice(0, indexOfRecommendation),
                { ...recommendation, favourite: !recommendation.favourite },
                ...prevRecommendations.slice(indexOfRecommendation + 1),
              ];
            })
          }
        >
          {recommendation.favourite ? (
            <>
              <Icons.HeartFill /> Remove from favourites
            </>
          ) : (
            <>
              <Icons.Heart /> Add to favourites
            </>
          )}
        </MotionButton>
      </div>
      <p>{recommendation?.description}</p>
      {recommendation?.message && (
        <p>
          From {recommendation.addedBy}: <i>"{recommendation?.message}"</i>
        </p>
      )}
    </PageWrapper>
  ) : null;
};
