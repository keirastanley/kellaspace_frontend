/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { mockFavouritesList } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { PageWrapper } from "../components/PageWrapper";
import { ListPageContent } from "../components/ListPageContent";
import { Overlay } from "../components/Overlay";

export const FavouritesPage = () => {
  const { recommendations, selectedRecommendation } = useRecommendations();

  const favouritesListContents = recommendations.filter(
    ({ favourite }) => favourite
  );

  return (
    <PageWrapper>
      <Overlay show={!!selectedRecommendation} />
      <ListPageContent
        isFavourites={true}
        list={{
          ...mockFavouritesList,
          contents: favouritesListContents,
        }}
      />
    </PageWrapper>
  );
};
