/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { mockFavouritesList } from "../../data";
import { PageWrapper } from "../../components";
import { ListPageContent } from "./components/ListPageContent/ListPageContent";
import { FavouritesAction } from "../../interfaces";

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
