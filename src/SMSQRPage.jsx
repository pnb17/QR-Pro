import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function SMSQRPage() {
  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title =
      "SMS QR Code Generator – Free Online | QRForge";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a free SMS QR code online with QRForge. Add a phone number and optional message, generate your QR code instantly, and download it as PNG."
      );
    }
    const canonical = document.querySelector(
  'link[rel="canonical"]'
);

if (canonical) {
  canonical.setAttribute(
    "href",
    "https://www.qrforge.in/sms-qr-code-generator"
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
      if (canonical) {
  canonical.setAttribute(
    "href",
    "https://www.qrforge.in/"
  );
}
    };
  }, []);

  const cleanPhone = phone.replace(/\D/g, "");

  const isValidPhone =
    countryCode === "91"
      ? cleanPhone.length === 10
      : cleanPhone.length >= 7 &&
        cleanPhone.length <= 15;

  const fullPhone = isValidPhone
    ? `+${countryCode}${cleanPhone}`
    : "";

  const qrValue = fullPhone
    ? `SMSTO:${fullPhone}:${message}`
    : "";

  const downloadSMSQR = () => {
    const canvas = document.getElementById("sms-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "sms-qr-code.png";
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
        <h1>SMS QR Code Generator</h1>

        <p>
          Create a free QR code for SMS. Add a phone number
          and an optional pre-filled message so users can
          quickly open their messaging app.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create SMS QR Code</h2>

          <label htmlFor="sms-phone">
            Phone Number
          </label>

          <div className="phone-input-row">
            <select
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                setPhone("");
              }}
              aria-label="Country code"
            >
              <option value="91">India (+91)</option>
              <option value="1">
                USA / Canada (+1)
              </option>
              <option value="44">UK (+44)</option>
              <option value="971">UAE (+971)</option>
              <option value="61">
                Australia (+61)
              </option>
              <option value="65">
                Singapore (+65)
              </option>
            </select>

            <input
              id="sms-phone"
              type="tel"
              inputMode="numeric"
              placeholder={
                countryCode === "91"
                  ? "9876543210"
                  : "Enter phone number"
              }
              value={phone}
              maxLength={
                countryCode === "91" ? 10 : 15
              }
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, "")
                )
              }
            />
          </div>

          {phone && !isValidPhone && (
            <p className="input-error">
              {countryCode === "91"
                ? "Please enter a valid 10-digit Indian phone number."
                : "Please enter a valid phone number."}
            </p>
          )}

          <label htmlFor="sms-message">
            Message (Optional)
          </label>

          <textarea
            id="sms-message"
            rows="5"
            placeholder="Enter your SMS message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {isValidPhone && (
            <p className="whatsapp-link-preview">
              SMS to: {fullPhone}
            </p>
          )}
        </section>

        <section className="card whatsapp-preview">
          <h2>SMS QR Preview</h2>

          {qrValue ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="sms-qr"
                  value={qrValue}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                type="button"
                className="primary-btn whatsapp-download-btn"
                onClick={downloadSMSQR}
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
                Enter a valid phone number to generate
                your SMS QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      {/* ================= SEO CONTENT ================= */}

<section className="seo-content">
  <h2>Free SMS QR Code Generator</h2>

  <p>
    Create a free SMS QR code with QRForge. Add a phone number
    and an optional pre-filled message so users can quickly
    open their messaging app after scanning the QR code.
  </p>

  <h2>How to Create an SMS QR Code</h2>

  <ol className="seo-steps">
    <li>
      <strong>Select your country.</strong> Choose the correct
      country code for the phone number.
    </li>

    <li>
      <strong>Enter the phone number.</strong> Add the number
      that should receive the SMS.
    </li>

    <li>
      <strong>Add a message.</strong> Optionally enter a
      pre-written SMS message.
    </li>

    <li>
      <strong>Generate your QR code.</strong> The SMS QR code
      is created automatically.
    </li>

    <li>
      <strong>Download and test.</strong> Save the QR code as
      PNG and scan it before sharing.
    </li>
  </ol>

  <h2>Why Use an SMS QR Code?</h2>

  <p>
    SMS QR codes make it easier for customers to send a text
    message without manually entering a phone number or typing
    a standard message. They can be useful for customer support,
    enquiries, feedback, promotions and printed marketing
    materials.
  </p>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is the SMS QR Code Generator free?</h3>
      <p>
        Yes. You can create and download SMS QR codes for free
        with QRForge.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I add a pre-filled SMS message?</h3>
      <p>
        Yes. The message is optional and can be included in
        the generated QR code.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>What happens when someone scans the QR code?</h3>
      <p>
        On compatible devices, the messaging app can open with
        the phone number and your pre-filled message.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I download my SMS QR code?</h3>
      <p>
        Yes. The generated SMS QR code can be downloaded as a
        PNG image.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

export default SMSQRPage;