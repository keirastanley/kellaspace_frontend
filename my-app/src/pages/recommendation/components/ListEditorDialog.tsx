/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Checkmark } from "../../../components/shared/Checkmark";
import { Dialog } from "../../../components/dialogs/Dialog";
import { ListSummary } from "../../../components/summaries/ListSummary";
import { MotionButton } from "../../../components/shared";
import { ComponentProps } from "react";
import { Recommendation } from "../../../interfaces";
import { DialogVariant } from "../../../interfaces/dialog";
import { useRecommendationPageData } from "../useRecommendationData";

export const ListEditorDialog = ({
  recommendation,
  isFavourite,
  onFavouritesChange,
  onListChange,
  onSaveClick,
  ...props
}: ComponentProps<typeof Dialog> & {
  recommendation: Recommendation;
  isFavourite: boolean;
  onSaveClick: () => void;
  onFavouritesChange: () => void;
  onListChange: (id: string, checked: boolean) => void;
}) => {
  const { updatedLists, favouritesList } = useRecommendationPageData();
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
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <ListSummary list={favouritesList} />
          <Checkmark checked={isFavourite} onChange={onFavouritesChange} />
        </div>
        {updatedLists &&
          updatedLists.length > 0 &&
          updatedLists.map((list) => {
            const listIsSelected = !!list.contents?.includes(recommendation);
            return (
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                `}
              >
                <ListSummary list={list} />
                <Checkmark
                  checked={listIsSelected}
                  onChange={() => onListChange(list.id, listIsSelected)}
                />
              </div>
            );
          })}
        <MotionButton type="button" onClick={onSaveClick}>
          Save
        </MotionButton>
      </div>
    </Dialog>
  );
};
