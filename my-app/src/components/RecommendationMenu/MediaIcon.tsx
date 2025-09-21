import { IconType, IconBaseProps } from "react-icons";
import {
  IoReaderOutline,
  IoGameControllerOutline,
  IoEyeOutline,
  IoEarOutline,
} from "react-icons/io5";
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

export const MediaIcon = ({
  mediaType,
  ...props
}: IconBaseProps & { mediaType: MediaType }) => {
  const IconComponent = icons[mediaType];
  return <IconComponent {...props} />;
};
