import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import { RecommendationsProvider } from "./providers/RecommendationsProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecommendationsProvider>
      <RouterProvider router={router} />
    </RecommendationsProvider>
  </StrictMode>
);
