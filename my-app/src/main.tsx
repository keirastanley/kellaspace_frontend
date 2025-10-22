import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import { UserDataProvider } from "./providers";
import { LoaderProvider } from "./providers/LoaderProvider";

const domain = import.meta.env.VITE_DOMAIN_NAME;
const client_id = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={client_id}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <UserDataProvider>
        <LoaderProvider>
          <RouterProvider router={router} />
        </LoaderProvider>
      </UserDataProvider>
    </Auth0Provider>
  </StrictMode>
);
