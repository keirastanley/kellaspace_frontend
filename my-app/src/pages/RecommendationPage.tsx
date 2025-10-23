/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  AddButton,
  Dialog,
  Icons,
  MediaIcon,
  Image,
  MediaTypeTag,
  MediaTypeTagVariant,
  MotionButton,
  PageWrapper,
  ListSummary,
  ListEditorDialog,
} from "../components";
import { actionsPast, Recommendation } from "../interfaces";
import { mockFavouritesList } from "../data";
import styled from "@emotion/styled";
// import {  } from "../components/CreateForm/AddButton";
// import {  } from "../components/Dialog";
// import { EditListDialog } from "../components/ListPageContent/EditListDialog";
// import { Checkmark } from "../components/AddToListMenu/Checkmark";
import { useUserData } from "../providers";
import { parseHtmlToReact } from "../utils";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const RecommendationPage = () => {
  const { recommendation_id } = useParams();
  const [updatedRecommendation, setUpdatedRecommendation] =
    useState<Recommendation>();
  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();
  const [showListEditor, setShowListEditor] = useState(false);
  const recommendation = useMemo(() => {
    if (!userData.recommendations) {
      return undefined;
    }
    return userData.recommendations.find(({ id }) => id === recommendation_id);
  }, [recommendation_id, userData]);

  const listsContainingRecommendation = useMemo(() => {
    if (!userData.lists) {
      return undefined;
    }
    return recommendation
      ? userData.lists.filter((list) =>
          list.contents?.includes(recommendation.id)
        )
      : [];
  }, [recommendation]);

  return recommendation ? (
    <PageWrapper paddingRight={10}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 30px;
        `}
      >
        <ListEditorDialog
          open={showListEditor}
          onClose={() => setShowListEditor(false)}
          recommendation={recommendation}
          isFavourite={(updatedRecommendation ?? recommendation).favourite}
          onFavouritesChange={() =>
            setUpdatedRecommendation((prevUpdatedRecommendation) => {
              const baseRecommendation =
                prevUpdatedRecommendation ?? recommendation;
              return {
                ...baseRecommendation,
                favourite: !baseRecommendation.favourite,
              };
            })
          }
          onSaveClick={() => {
            setUserData((prevUserData) => {
              const { recommendations } = prevUserData;
              if (!recommendations || recommendations.length < 0) {
                return prevUserData;
              }
              if (updatedRecommendation) {
                const indexOfRecommendation =
                  recommendations.indexOf(recommendation);
                return {
                  ...prevUserData,
                  recommendations: [
                    ...recommendations.slice(0, indexOfRecommendation),
                    updatedRecommendation,
                    ...recommendations.slice(indexOfRecommendation + 1),
                  ],
                };
              }
              return prevUserData;
            });
            setShowListEditor(false);
          }}
        />
        <MotionButton onClick={() => navigate(-1)}>
          <Icons.Back />
          Back
        </MotionButton>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2px;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 5px;
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
          </div>
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
                setUserData((prevUserData) => {
                  const prevRecommendations = prevUserData.recommendations;
                  if (!prevRecommendations || prevRecommendations.length < 0) {
                    return prevUserData;
                  }
                  const indexOfRecommendation =
                    prevRecommendations.indexOf(recommendation);
                  return {
                    ...prevUserData,
                    recommendations: [
                      ...prevRecommendations.slice(0, indexOfRecommendation),
                      {
                        ...recommendation,
                        completed: !recommendation.completed,
                      },
                      ...prevRecommendations.slice(indexOfRecommendation + 1),
                    ],
                  };
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
                    .toUpperCase()}${actionsPast[
                    recommendation.mediaType
                  ].slice(1)}`
                : `Mark as ${actionsPast[recommendation.mediaType]}`}
            </MotionButton>
            <MotionButton
              onClick={() =>
                setUserData((prevUserData) => {
                  const prevRecommendations = prevUserData.recommendations;
                  if (!prevRecommendations || prevRecommendations.length < 0) {
                    return prevUserData;
                  }
                  const indexOfRecommendation =
                    prevRecommendations.indexOf(recommendation);
                  return {
                    ...prevUserData,
                    recommendations: [
                      ...prevRecommendations.slice(0, indexOfRecommendation),
                      {
                        ...recommendation,
                        favourite: !recommendation.favourite,
                      },
                      ...prevRecommendations.slice(indexOfRecommendation + 1),
                    ],
                  };
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
          {recommendation?.description && (
            <p>{parseHtmlToReact(recommendation?.description)}</p>
          )}
        </div>
        {recommendation?.message && (
          <p>
            From {recommendation.addedBy}: <i>"{recommendation?.message}"</i>
          </p>
        )}
        {recommendation.favourite ||
        (listsContainingRecommendation &&
          listsContainingRecommendation.length > 0) ? (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 5px;
            `}
          >
            <p
              css={css`
                font-size: 14px;
              `}
            >
              Lists containing <i>{recommendation.title}</i>
            </p>
            {/* <MotionButton>
              <Icons.Edit /> Edit lists
            </MotionButton> */}

            {recommendation.favourite && (
              <StyledLink to={"favourites_id"} key={"favourites_id" + "-list"}>
                <ListSummary list={mockFavouritesList} />
              </StyledLink>
            )}
            {listsContainingRecommendation &&
              listsContainingRecommendation.slice(0, 3).map((mockList) => (
                <StyledLink to={mockList.id} key={mockList.id + "-list"}>
                  <ListSummary list={mockList} />
                </StyledLink>
              ))}
            <div
              css={css`
                display: flex;
                gap: 10px;
                align-items: center;
              `}
            >
              <MotionButton>
                <Icons.Open /> See all
              </MotionButton>
              <MotionButton onClick={() => setShowListEditor(true)}>
                <Icons.Edit /> Edit lists
              </MotionButton>
            </div>
          </div>
        ) : (
          <div>
            <MotionButton onClick={() => setShowListEditor(true)}>
              <Icons.Add /> Add to list
            </MotionButton>
          </div>
        )}
      </div>
    </PageWrapper>
  ) : null;
};
