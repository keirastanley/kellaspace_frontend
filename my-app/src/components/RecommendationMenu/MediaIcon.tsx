import { IconType, IconBaseProps } from "react-icons";
import {
  IoReaderOutline,
  IoGameControllerOutline,
  IoEyeOutline,
  IoEarOutline,
  IoReader,
  IoEye,
  IoEar,
  IoGameController,
} from "react-icons/io5";
import { PiBookFill } from "react-icons/pi";
import { SlBookOpen } from "react-icons/sl";
import { MediaType } from "../../interfaces/recommendations";

const icons: Record<MediaType, IconType> = {
  [MediaType.Article]: IoReaderOutline,
  [MediaType.Book]: SlBookOpen,
  [MediaType.Game]: IoGameControllerOutline,
  [MediaType.Movie]: IoEyeOutline,
  [MediaType.Music]: IoEarOutline,
  [MediaType.Podcast]: IoEarOutline,
  [MediaType.TVShow]: IoEyeOutline,
  [MediaType.Video]: IoEyeOutline,
};

const completedIcons: Record<MediaType, IconType> = {
  [MediaType.Article]: IoReader,
  [MediaType.Book]: PiBookFill,
  [MediaType.Game]: IoGameController,
  [MediaType.Movie]: IoEye,
  [MediaType.Music]: IoEar,
  [MediaType.Podcast]: IoEar,
  [MediaType.TVShow]: IoEye,
  [MediaType.Video]: IoEye,
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
