/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { mockFavouritesList } from "../data/mockLists";
import { PageWrapper } from "../components/PageWrapper";
import { ListPageContent } from "../components/ListPageContent/ListPageContent";
import { FavouritesAction } from "../interfaces/actions";

export const FavouritesPage = () => {
  return (
    <PageWrapper
      initialList={mockFavouritesList}
      isFavourites={true}
      actions={Object.values(FavouritesAction)}
    >
      <ListPageContent />
    </PageWrapper>
  );
};
