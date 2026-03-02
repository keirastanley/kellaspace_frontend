import { useParams } from "react-router";
import { BackButton } from "./components/BackButton";
import { css } from "@emotion/react";
import { useUserData } from "../../providers";

export const RecommendationPage = () => {
  const { recommendation_id } = useParams();
  const { userData } = useUserData();
  const recommendation = userData?.recommendations?.find(
    ({ id }) => id === recommendation_id,
  );

  if (!recommendation) {
    return null;
  }

  return (
    <div
      css={css`
        padding: 10px;
      `}
    >
      <BackButton />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        `}
      >
        <h1>{recommendation.title}</h1>
        <p
          css={css`
            font-size: 14px;
          `}
        >
          Added by {recommendation.addedBy} on{" "}
          {new Date(recommendation.dateAdded).toLocaleDateString()}
        </p>
        <img
          src={recommendation.image?.src}
          alt={recommendation.title}
          css={css`
            width: 250px;
          `}
        />
        <p>{recommendation.description}</p>
      </div>
    </div>
  );
};
