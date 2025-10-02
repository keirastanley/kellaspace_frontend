import { mockFavouritesList } from "../data/mockLists";
import { mockRecommendations } from "../data/mockRecommendations";
import { ListSummary } from "./ListSummary";

export const FavouritesListSummary = () => {
  const favouritesIds = mockRecommendations
    .filter((recommendation) => recommendation.favourite)
    .map(({ id }) => id);

  return (
    <ListSummary
      list={{
        ...mockFavouritesList,
        contents: favouritesIds,
      }}
    />
  );
};
