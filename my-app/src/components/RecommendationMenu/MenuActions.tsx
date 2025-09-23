import styled from "@emotion/styled";
import { IoMdOpen } from "react-icons/io";
import { IoHeartOutline, IoAddCircleOutline, IoHeart } from "react-icons/io5";
import { MediaType } from "../../interfaces/recommendations";
import { MediaIcon } from "./MediaIcon";

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
  onFavouriteClick,
  onAddToListClick,
}: {
  mediaType: MediaType;
  completed: boolean;
  favourite: boolean;
  onMarkAsCompletedClick: (completed: boolean) => void;
  onFavouriteClick: (favourite: boolean) => void;
  onAddToListClick: () => void;
}) => (
  <>
    <ActionButton>
      <IoMdOpen />
      {/* {actionsPresent[mediaType].slice(0, 1).toUpperCase()}
        {actionsPresent[mediaType].slice(1)} */}
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
      {favourite ? <IoHeart /> : <IoHeartOutline />}
      {favourite ? "Remove from favourites" : "Add to favourites"}
    </ActionButton>
    <ActionButton onClick={onAddToListClick}>
      <IoAddCircleOutline />
      Add to list
    </ActionButton>
  </>
);
