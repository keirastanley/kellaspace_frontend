import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import { UserDataProvider } from "./providers";
import { LoaderProvider } from "./providers/LoaderProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserDataProvider>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </UserDataProvider>
  </StrictMode>
);
