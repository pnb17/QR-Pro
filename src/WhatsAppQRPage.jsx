import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function WhatsAppQRPage() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const cleanPhone = phone.replace(/\D/g, "");

  const whatsappUrl = cleanPhone
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

          <input
            id="wa-phone"
            type="tel"
            placeholder="919876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

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