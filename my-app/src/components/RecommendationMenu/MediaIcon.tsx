import { IconType, IconBaseProps } from "react-icons";
import { MediaType } from "../../interfaces/recommendations";
import { Icons } from "../Icons";

const icons: Record<MediaType, IconType> = {
  [MediaType.Article]: Icons.Document,
  [MediaType.Book]: Icons.Book,
  [MediaType.Game]: Icons.GameController,
  [MediaType.Movie]: Icons.Eye,
  [MediaType.Music]: Icons.Ear,
  [MediaType.Podcast]: Icons.Ear,
  [MediaType.TVShow]: Icons.Eye,
  [MediaType.Video]: Icons.Eye,
};

const completedIcons: Record<MediaType, IconType> = {
  [MediaType.Article]: Icons.DocumentFill,
  [MediaType.Book]: Icons.BookFill,
  [MediaType.Game]: Icons.GameControllerFill,
  [MediaType.Movie]: Icons.EyeFill,
  [MediaType.Music]: Icons.EarFill,
  [MediaType.Podcast]: Icons.EarFill,
  [MediaType.TVShow]: Icons.EyeFill,
  [MediaType.Video]: Icons.EyeFill,
};

export const MediaIcon = ({
  mediaType,
  completed,
  ...props
}: IconBaseProps & { mediaType: MediaType; completed: boolean }) => {
  const IconComponent = completed
    ? completedIcons[mediaType]
    : icons[mediaType];
  return <IconComponent {...props} />;
};
