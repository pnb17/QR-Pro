import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App.jsx";
import WhatsAppQRPage from "./WhatsAppQRPage.jsx";
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);