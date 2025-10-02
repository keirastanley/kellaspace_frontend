import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { ListsPage } from "./pages/ListsPage";
import { ListPage } from "./pages/ListPage";
import { FavouritesPage } from "./pages/FavouritesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
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
    ],
  },
]);
