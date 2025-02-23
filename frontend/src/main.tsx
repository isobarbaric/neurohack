import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ReactNode } from "react";
import './AppLayout.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
