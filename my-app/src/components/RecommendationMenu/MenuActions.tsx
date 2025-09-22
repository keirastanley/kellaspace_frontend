import styled from "@emotion/styled";
import { IoMdOpen } from "react-icons/io";
import { IoHeartOutline, IoAddCircleOutline } from "react-icons/io5";
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

export const MenuActions = ({
  mediaType,
  onAddToListClick,
}: {
  mediaType: MediaType;
  onAddToListClick: () => void;
}) => (
  <>
    <ActionContainer>
      <IoMdOpen />
      <ActionButton>
        {actionsPresent[mediaType].slice(0, 1).toUpperCase()}
        {actionsPresent[mediaType].slice(1)}
      </ActionButton>
    </ActionContainer>
    <ActionContainer>
      <MediaIcon mediaType={mediaType} />
      <ActionButton>Mark as {actionsPast[mediaType]}</ActionButton>
    </ActionContainer>
    <ActionContainer>
      <IoHeartOutline />
      <ActionButton>Add to favourites</ActionButton>
    </ActionContainer>
    <ActionContainer>
      <IoAddCircleOutline />
      <ActionButton onClick={onAddToListClick}>Add to list</ActionButton>
    </ActionContainer>
  </>
);
