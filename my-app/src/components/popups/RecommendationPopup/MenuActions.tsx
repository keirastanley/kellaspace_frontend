import styled from "@emotion/styled";
import { MediaType, actionsPast } from "../../../interfaces";
import { MediaIcon, Icons } from "../../shared";

const ActionButton = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  border: none;
  border-top: 1px solid grey;
  padding: 15px;
  font-size: 16px;
  width: 100%;
  background-color: white;
  text-align: left;
`;

export const MenuActions = ({
  mediaType,
  completed,
  favourite,
  onMarkAsCompletedClick,
  onOpenClick,
  onFavouriteClick,
  onAddToListClick,
}: {
  mediaType: MediaType;
  completed: boolean;
  favourite: boolean;
  onMarkAsCompletedClick: (completed: boolean) => void;
  onOpenClick: () => void;
  onFavouriteClick: (favourite: boolean) => void;
  onAddToListClick: () => void;
}) => (
  <>
    <ActionButton onClick={() => onOpenClick()}>
      <Icons.Open />
      Open
    </ActionButton>
    <ActionButton onClick={() => onMarkAsCompletedClick(!completed)}>
      <MediaIcon mediaType={mediaType} completed={completed} />
      {completed
        ? `${actionsPast[mediaType].slice(0, 1).toUpperCase()}${actionsPast[
            mediaType
          ].slice(1)}`
        : `Mark as ${actionsPast[mediaType]}`}
    </ActionButton>
    <ActionButton onClick={() => onFavouriteClick(!favourite)}>
      {favourite ? <Icons.HeartFill /> : <Icons.Heart />}
      {favourite ? "Remove from favourites" : "Add to favourites"}
    </ActionButton>
    <ActionButton onClick={onAddToListClick}>
      <Icons.Add />
      Add to list
    </ActionButton>
  </>
);
