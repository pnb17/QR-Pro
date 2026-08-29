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
import UrlQRPage from "./UrlQRPage.jsx";
import EmailQRPage from "./EmailQRPage.jsx";
import PhoneQRPage from "./PhoneQRPage.jsx";
import SMSQRPage from "./SMSQRPage.jsx";
import LocationQRPage from "./LocationQRPage.jsx";
import ContactQRPage from "./ContactQRPage.jsx";
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
<Route
  path="/url-qr-code-generator"
  element={<UrlQRPage />}
/>
<Route
  path="/email-qr-code-generator"
  element={<EmailQRPage />}
/>
<Route
  path="/phone-qr-code-generator"
  element={<PhoneQRPage />}
/>
<Route
  path="/sms-qr-code-generator"
  element={<SMSQRPage />}
/>
<Route
  path="/location-qr-code-generator"
  element={<LocationQRPage />}
/>
<Route
  path="/contact-qr-code-generator"
  element={<ContactQRPage />}
/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);