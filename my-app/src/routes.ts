import { createBrowserRouter } from "react-router";
import { Layout } from "./components";
import {
  Home,
  ListPage,
  ListsPage,
  FavouritesPage,
  CreateRecommendationPage,
  RecommendationPage,
  ActivityPage,
  CreateListPage,
} from "./pages";

export enum PageRoutes {
  Lists = "lists",
  Favourites = "favourites",
  Activity = "activity",
  CreateRecommendation = "add-new-recommendation",
  CreateList = "add-new-list",
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: ":recommendation_id",
        Component: RecommendationPage,
      },
      {
        path: PageRoutes.Lists,
        Component: ListsPage,
      },
      {
        path: `${PageRoutes.Lists}/:list_id`,
        Component: ListPage,
      },
      {
        path: PageRoutes.Favourites,
        Component: FavouritesPage,
      },
      { path: PageRoutes.Activity, Component: ActivityPage },
      {
        path: PageRoutes.CreateRecommendation,
        Component: CreateRecommendationPage,
      },
      {
        path: PageRoutes.CreateList,
        Component: CreateListPage,
      },
    ],
  },
]);
