import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function WhatsAppQRPage() {
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
    </main>
  );
}

export default WhatsAppQRPage;