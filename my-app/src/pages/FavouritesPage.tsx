/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { mockFavouritesList } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { PageWrapper } from "../components/PageWrapper";
import { ListPageContent } from "../components/ListPageContent";

export const FavouritesPage = () => {
  const { recommendations } = useRecommendations();

  const favouritesListContents = recommendations.filter(
    ({ favourite }) => favourite
  );

  return (
    <PageWrapper>
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
