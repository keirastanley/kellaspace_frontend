import { mockFavouritesList, mockRecommendations } from "../../data";
import { ListSummary, ListSummaryVariant } from "./ListSummary";

export const FavouritesListSummary = ({
  variant,
}: {
  variant?: ListSummaryVariant;
}) => {
  const favouritesIds = mockRecommendations
    .filter((recommendation) => recommendation.favourite)
    .map(({ id }) => id);

  return (
    <ListSummary
      list={{
        ...mockFavouritesList,
        contents: favouritesIds,
      }}
      variant={variant}
    />
  );
};
