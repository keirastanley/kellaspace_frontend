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
} from "./pages";

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
        path: "lists",
        Component: ListsPage,
      },
      {
        path: "lists/:list_id",
        Component: ListPage,
      },
      {
        path: "lists/favourites",
        Component: FavouritesPage,
      },
      { path: "activity", Component: ActivityPage },
      {
        path: "add-new",
        Component: CreateRecommendationPage,
      },
    ],
  },
]);
