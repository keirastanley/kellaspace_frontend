/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mockFavouritesList, mockLists } from "../data/mockLists";
import { Checkmark } from "./AddToListMenu/Checkmark";
import { Dialog } from "./Dialog";
import { ListSummary } from "./ListSummary";
import { MotionButton } from "./MotionButton";
import { ComponentProps } from "react";
import { Recommendation } from "../interfaces";
import { DialogVariant } from "../interfaces/dialog";

export const ListEditorDialog = ({
  recommendation,
  isFavourite,
  onFavouritesChange,
  onSaveClick,
  ...props
}: ComponentProps<typeof Dialog> & {
  recommendation: Recommendation;
  isFavourite: boolean;
  onSaveClick: () => void;
  onFavouritesChange: () => void;
}) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      variant={DialogVariant.Expand}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <h1>
          Edit lists for <i>{recommendation.title}</i>
        </h1>
        {recommendation.favourite && (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <ListSummary list={mockFavouritesList} />
            <Checkmark checked={isFavourite} onChange={onFavouritesChange} />
          </div>
        )}
        {mockLists.map((list) => (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <ListSummary list={list} />
            <Checkmark
              checked={!!list.contents?.includes(recommendation.id)}
              onChange={
                () => {}
                // setUpdatedRecommendation((prevUpdatedRecommendation) => {
                //   const baseRecommendation =
                //     prevUpdatedRecommendation ?? recommendation;
                //   return {
                //     ...baseRecommendation,
                //     favourite: !baseRecommendation.favourite,
                //   };
                // })
              }
            />
          </div>
        ))}
        <MotionButton type="button" onClick={onSaveClick}>
          Save
        </MotionButton>
      </div>
    </Dialog>
  );
};
