import {
  IoGameControllerOutline,
  IoEarOutline,
  IoReader,
  IoEar,
  IoGameController,
} from "react-icons/io5";

import { BsChevronCompactDown } from "react-icons/bs";

import { PiBookFill } from "react-icons/pi";
import { BiFilterAlt } from "react-icons/bi";

import { AiOutlineRead } from "react-icons/ai";

import { LiaSortAlphaUpSolid, LiaSortAlphaDownSolid } from "react-icons/lia";
import { TbCancel } from "react-icons/tb";
import {
  TiTick,
  TiEye,
  TiEyeOutline,
  TiHeartOutline,
  TiHeart,
  TiEdit,
  TiPencil,
  TiTrash,
  TiDocument,
  TiExport,
  TiPlus,
  TiDocumentAdd,
  TiBookmark,
  TiFlashOutline,
  TiHomeOutline,
  TiArrowBackOutline,
} from "react-icons/ti";
import { IconBaseProps } from "react-icons";

const SortIcon = (props: IconBaseProps) => (
  <svg
    stroke="currentColor"
    fill="transparent"
    strokeWidth="1.8"
    version="1.2"
    baseProfile="tiny"
    viewBox="0 0 24 24"
    height="0.9em"
    width="0.9em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"></path>
  </svg>
);

export const Icons = {
  Back: TiArrowBackOutline,
  Checkmark: TiTick,
  ChevronDown: BsChevronCompactDown,
  Document: TiDocument,
  GameController: IoGameControllerOutline,
  Eye: TiEyeOutline,
  Ear: IoEarOutline,
  DocumentFill: IoReader,
  EyeFill: TiEye,
  EarFill: IoEar,
  GameControllerFill: IoGameController,
  Book: AiOutlineRead,
  BookFill: PiBookFill,
  Home: TiHomeOutline,
  Bookmark: TiBookmark,
  Activity: TiFlashOutline,
  Create: TiDocumentAdd,
  Add: TiPlus,
  Heart: TiHeartOutline,
  HeartFill: TiHeart,
  Open: TiExport,
  Edit: TiEdit,
  EditSimple: TiPencil,
  Sort: SortIcon,
  SortAlphaUp: LiaSortAlphaUpSolid,
  SortAlphaDown: LiaSortAlphaDownSolid,
  Filter: BiFilterAlt,
  Delete: TiTrash,
  Save: TiTick,
  Cancel: TbCancel,
};
