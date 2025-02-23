import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './AppLayout.css'
import { BrowserRouter as Router, Routes, Route, useNavigation } from 'react-router-dom';
import AudioPage from './pages/AudioPage'
import VideoPage from './pages/VideoPage'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
	  <App/>
    </GoogleOAuthProvider>
  </StrictMode>
);
