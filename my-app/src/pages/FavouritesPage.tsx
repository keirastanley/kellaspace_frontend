/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { mockFavouritesList } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { PageWrapper } from "../components/PageWrapper";
import { ListPageContent } from "../components/ListPageContent";
import { Overlay } from "../components/Overlay";
import { ActionsProvider } from "../providers/ActionsProvider";
import { FavouritesAction } from "../interfaces/actions";
import { useMemo } from "react";

export const FavouritesPage = () => {
  const { recommendations, selectedRecommendation } = useRecommendations();

  const favouritesListContents = recommendations.filter(
    ({ favourite }) => favourite
  );

  const mediaTypes = useMemo(
    () => favouritesListContents?.map(({ mediaType }) => mediaType),
    [favouritesListContents]
  );

  return (
    <ActionsProvider
      actions={Object.values(FavouritesAction).filter((action) =>
        mediaTypes && mediaTypes.length <= 1
          ? action !== FavouritesAction.Filter
          : true
      )}
    >
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
    </ActionsProvider>
  );
};
