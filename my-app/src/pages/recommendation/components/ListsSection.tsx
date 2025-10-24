/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRecommendationData } from "../useRecommendationData";
import styled from "@emotion/styled";
import { Link } from "react-router";
import {
  ListSummary,
  MotionButton,
  Icons,
  ListEditorDialog,
  FavouritesListSummary,
} from "../../../components";
import { useState } from "react";
import { useUserData } from "../../../providers";
import { addNewRecommendationToUserData } from "../../../utils";
import { ListSummaryVariant } from "../../../components/summaries/ListSummary";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const ListsSection = () => {
  const [showListEditor, setShowListEditor] = useState(false);
  const { setUserData } = useUserData();
  const {
    updatedRecommendation,
    setUpdatedRecommendation,
    recommendation,
    listsContainingRecommendation,
  } = useRecommendationData();
  return recommendation!.favourite ||
    (listsContainingRecommendation &&
      listsContainingRecommendation.length > 0) ? (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 5px;
        background-color: lightgrey;
        padding: 10px;
        width: 100%;
        border-radius: 5px;
        box-sizing: border-box;
      `}
    >
      <ListEditorDialog
        open={showListEditor}
        onClose={() => setShowListEditor(false)}
        recommendation={recommendation!}
        isFavourite={(updatedRecommendation ?? recommendation!).favourite}
        onFavouritesChange={() =>
          setUpdatedRecommendation((prevUpdatedRecommendation) => {
            const baseRecommendation =
              prevUpdatedRecommendation ?? recommendation!;
            return {
              ...baseRecommendation,
              favourite: !baseRecommendation.favourite,
            };
          })
        }
        onSaveClick={() => {
          setUserData((prevUserData) =>
            addNewRecommendationToUserData(
              prevUserData,
              recommendation!,
              updatedRecommendation
            )
          );
          setShowListEditor(false);
        }}
      />
      <h2
        css={css`
          font-size: 14px;
        `}
      >
        Lists containing <i>{recommendation!.title}</i>
      </h2>
      {recommendation!.favourite && (
        <StyledLink to={"favourites_id"} key={"favourites_id" + "-list"}>
          <FavouritesListSummary variant={ListSummaryVariant.WithBorder} />
        </StyledLink>
      )}
      {listsContainingRecommendation &&
        listsContainingRecommendation.slice(0, 3).map((mockList) => (
          <StyledLink to={mockList.id} key={mockList.id + "-list"}>
            <ListSummary
              list={mockList}
              variant={ListSummaryVariant.WithBorder}
            />
          </StyledLink>
        ))}
      <div
        css={css`
          display: flex;
          gap: 10px;
          align-items: center;
        `}
      >
        {listsContainingRecommendation &&
          listsContainingRecommendation?.length > 3 && (
            <MotionButton>
              <Icons.Open /> See all
            </MotionButton>
          )}
        <MotionButton onClick={() => setShowListEditor(true)}>
          <Icons.Edit /> Edit lists
        </MotionButton>
      </div>
    </div>
  ) : null;
};
