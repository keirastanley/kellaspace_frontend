import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import { UserDataProvider } from "./providers/UserDataProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
  </StrictMode>
);
