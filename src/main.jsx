import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App.jsx";
import WhatsAppQRPage from "./WhatsAppQRPage.jsx";
import WifiQRPage from "./WifiQRPage.jsx";
import "./App.css";

ReactDOM.createRoot(
  document.getElementById("app")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route
          path="/whatsapp-qr-code-generator"
          element={<WhatsAppQRPage />}
          
        />
        <Route
  path="/wifi-qr-code-generator"
  element={<WifiQRPage />}
/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);