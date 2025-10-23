import { mockFavouritesList, mockRecommendations } from "../../data";
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
