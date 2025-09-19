import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      { index: true, Component: Home },
      // { path: "about", Component: About },
      // {
      //   path: "auth",
      //   Component: AuthLayout,
      //   children: [
      //     { path: "login", Component: Login },
      //     { path: "register", Component: Register },
      //   ],
      // },
      // {
      //   path: "concerts",
      //   children: [
      //     { index: true, Component: ConcertsHome },
      //     { path: ":city", Component: ConcertsCity },
      //     { path: "trending", Component: ConcertsTrending },
      //   ],
      // },
    ],
  },
]);
