import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function WhatsAppQRPage() {
  useEffect(() => {
  document.title =
    "WhatsApp QR Code Generator – Free Online | QRForge";

  const metaDescription = document.querySelector(
    'meta[name="description"]'
  );

  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      "Create a free WhatsApp QR code online with QRForge. Add your phone number and optional message, generate your QR code instantly, and download it as PNG."
    );
  }

  return () => {
    document.title =
      "Free QR Code Generator Online | QRForge";

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create free QR codes online with QRForge. Generate QR codes for URLs, WhatsApp, WiFi, email, phone, SMS, locations and contacts. Fast, easy and free."
      );
    }
  };
}, []);
  const [countryCode, setCountryCode] = useState("91");
const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const cleanPhone =
  countryCode.replace(/\D/g, "") +
  phone.replace(/\D/g, "");const localPhone = phone.replace(/\D/g, "");

const isValidPhone =
  countryCode === "91"
    ? localPhone.length === 10
    : localPhone.length >= 7 &&
      localPhone.length <= 15;
 const whatsappUrl = isValidPhone && cleanPhone
    ? `https://wa.me/${cleanPhone}${
        message.trim()
          ? `?text=${encodeURIComponent(message.trim())}`
          : ""
      }`
    : "";

  const downloadWhatsAppQR = () => {
    const canvas = document.getElementById("whatsapp-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "whatsapp-qr-code.png";
    link.click();
  };

  return (
    <main className="container">
    <header className="tool-page-header">
  <a href="/" className="tool-page-home-link">
    ← Back to QRForge
  </a>
</header>
      <section className="hero">
        <h1>WhatsApp QR Code Generator</h1>

        <p>
          Create a free WhatsApp QR code online and let people start a
          WhatsApp chat by simply scanning your QR code.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create WhatsApp QR Code</h2>

          <label htmlFor="wa-phone">
  WhatsApp Phone Number
</label>

<div className="phone-input-row">
  <select
    aria-label="Country code"
    value={countryCode}
    onChange={(e) => setCountryCode(e.target.value)}
  >
    <option value="91">🇮🇳 +91 India</option>
    <option value="1">🇺🇸 +1 USA / Canada</option>
    <option value="44">🇬🇧 +44 UK</option>
    <option value="971">🇦🇪 +971 UAE</option>
    <option value="61">🇦🇺 +61 Australia</option>
    <option value="65">🇸🇬 +65 Singapore</option>
  </select>

  <input
  id="wa-phone"
  type="tel"
  inputMode="numeric"
  placeholder="9876543210"
  value={phone}
  maxLength={countryCode === "91" ? 10 : 15}
  onChange={(e) =>
    setPhone(e.target.value.replace(/\D/g, ""))
  }
/>
</div>
          <label htmlFor="wa-message">
            Message (Optional)
          </label>

          <textarea
            id="wa-message"
            placeholder="Type your WhatsApp message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          />
        </section>

        <section className="card whatsapp-preview">
          <h2>WhatsApp QR Preview</h2>

          {whatsappUrl ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="whatsapp-qr"
                  value={whatsappUrl}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <p className="whatsapp-link-preview">
                {whatsappUrl}
              </p>
              <button
  type="button"
  className="primary-btn whatsapp-download-btn"
  onClick={downloadWhatsAppQR}
>
  Download PNG
</button>
            </>
          ) : (
            <div className="qr-empty">
              <div className="qr-placeholder-icon">
                QR
              </div>

              <p>
                Enter a WhatsApp phone number to generate
                your QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      <section className="seo-content whatsapp-seo">
  <h2>Free WhatsApp QR Code Generator</h2>
  <p>
    Create a WhatsApp QR code for free with QRForge. Add your WhatsApp
    phone number and an optional pre-filled message, then generate a QR
    code that people can scan to start a WhatsApp chat instantly.
  </p>

  <h2>How to Create a WhatsApp QR Code</h2>
  <ol className="seo-steps">
    <li>Select your country code.</li>
    <li>Enter your WhatsApp phone number.</li>
    <li>Add an optional pre-filled message.</li>
    <li>Your WhatsApp QR code will be generated automatically.</li>
    <li>Download the QR code as a PNG image.</li>
  </ol>

  <h2>Why Use a WhatsApp QR Code?</h2>
  <p>
    A WhatsApp QR code makes it easier for customers, friends or visitors
    to contact you without manually typing your phone number. You can use
    it on business cards, posters, menus, product packaging, websites and
    marketing materials.
  </p>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is the WhatsApp QR Code Generator free?</h3>
      <p>
        Yes. You can create and download WhatsApp QR codes with QRForge
        for free.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I add a message to my WhatsApp QR code?</h3>
      <p>
        Yes. You can add an optional message that will appear in WhatsApp
        when someone scans your QR code.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Do users need to save my phone number first?</h3>
      <p>
        No. Scanning the QR code can open a WhatsApp chat without requiring
        the user to manually save your number first.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Where can I use my WhatsApp QR code?</h3>
      <p>
        You can use it on business cards, flyers, posters, menus, websites,
        packaging and other promotional materials.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

export default WhatsAppQRPage;