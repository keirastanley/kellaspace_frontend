/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { mockFavouritesList } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { PageWrapper } from "../components/PageWrapper";
import { ListPageContent } from "../components/ListPageContent";
import { Overlay } from "../components/Overlay";
import { FavouritesAction } from "../interfaces/actions";

export const FavouritesPage = () => {
  const { selectedRecommendation } = useRecommendations();

  return (
    <PageWrapper
      initialList={mockFavouritesList}
      isFavourites={true}
      actions={Object.values(FavouritesAction)}
    >
      <Overlay show={!!selectedRecommendation} />
      <ListPageContent />
    </PageWrapper>
  );
};
