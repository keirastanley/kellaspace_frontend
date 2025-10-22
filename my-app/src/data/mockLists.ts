import { List } from "../interfaces/lists";
import { mockRecommendations } from "./mockRecommendations";

export const mockLists: List[] = [
  {
    id: "list-0",
    title: "Movies to watch",
    createdBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    dateCreated: "2025-09-15T14:23:00.000Z",
    contents: [
      mockRecommendations[0].id,
      mockRecommendations[6].id,
      mockRecommendations[7].id,
      mockRecommendations[8].id,
    ],
    image: mockRecommendations[0].image,
  },
  {
    id: "list-1",
    title: "Things to watch together",
    createdBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    dateCreated: "2025-09-11T14:23:00.000Z",
  },
];

export const mockFavouritesList: List = {
  id: "favourites_list",
  image: {
    src: "/growing-heart-android-chrome-512x512.png",
    alt: "Heart shape",
  },
  title: "Favourites",
  createdBy: "kellaspace",
  dateCreated: new Date().toISOString(),
};
