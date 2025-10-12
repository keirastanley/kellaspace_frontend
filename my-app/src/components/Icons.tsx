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
import { TbCancel, TbArrowsSort } from "react-icons/tb";
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
} from "react-icons/ti";

export const Icons = {
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
  Sort: TbArrowsSort,
  SortAlphaUp: LiaSortAlphaUpSolid,
  SortAlphaDown: LiaSortAlphaDownSolid,
  Filter: BiFilterAlt,
  Delete: TiTrash,
  Save: TiTick,
  Cancel: TbCancel,
};
